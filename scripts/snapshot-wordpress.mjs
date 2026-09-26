/**
 * Snapshot the real posts from the existing WordPress site into the repo so the
 * blog works even when Supabase is unavailable (and after WordPress is retired).
 *
 *   npm run snapshot:wp
 *
 * Writes:
 *   src/content/blog/posts.json     : posts in the BlogPost shape (see src/content/types.ts)
 *   public/images/posts/<slug>.<ext>: each post's featured image, served locally
 *
 * Images inside post bodies that live on wp-content are also downloaded and
 * rewritten to /images/posts/inline/… so nothing depends on the old host.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const WP = "https://www.abimbolaolumuyiwa.com/wp-json/wp/v2";
const ROOT = new URL("..", import.meta.url).pathname;
const IMG_DIR = path.join(ROOT, "public/images/posts");
const INLINE_DIR = path.join(IMG_DIR, "inline");

const decodeEntities = (s = "") =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const stripHtml = (html = "") =>
  decodeEntities(html.replace(/<[^>]+>/g, "")).replace(/\s*\u2014\s*/g, ", ").replace(/\s+/g, " ").trim();

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

const extOf = (url) => (path.extname(new URL(url).pathname) || ".jpg").toLowerCase();

async function fetchAllPosts() {
  const posts = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${WP}/posts?per_page=100&page=${page}&_embed=1`);
    if (res.status === 400) break;
    if (!res.ok) throw new Error(`WordPress fetch failed: ${res.status}`);
    const batch = await res.json();
    if (!batch.length) break;
    posts.push(...batch);
  }
  return posts;
}

/** Download wp-content images referenced in the body and point them at local copies. */
async function localiseInlineImages(html) {
  const urls = new Set(
    [...html.matchAll(/https?:\/\/(?:www\.)?abimbolaolumuyiwa\.com\/wp-content\/uploads\/[^"'\s)]+?\.(?:jpe?g|png|gif|webp)/gi)].map((m) => m[0])
  );
  let out = html;
  for (const url of urls) {
    const name = createHash("sha1").update(url).digest("hex").slice(0, 12) + extOf(url);
    try {
      await download(url, path.join(INLINE_DIR, name));
      out = out.split(url).join(`/images/posts/inline/${name}`);
    } catch (e) {
      console.warn("  ! inline image skipped:", e.message);
    }
  }
  // Links between posts on the old domains → the new /blog/<slug> pages.
  out = out.replace(/https?:\/\/(?:www\.)?(?:theearthsalt|abimbolaolumuyiwa)\.com\/([a-z0-9-]+)\/?(?=["'#])/gi, (m, slug) =>
    SLUGS.has(slug) ? `/blog/${slug}` : m
  );
  // House style: no em dashes.
  out = out.replace(/\s*(?:\u2014|&#8212;|&mdash;)\s*/g, ", ");
  // srcset lists point at many sizes; the local copy is enough.
  return out.replace(/\s(?:srcset|sizes)="[^"]*"/g, "");
}

await mkdir(INLINE_DIR, { recursive: true });
await mkdir(path.join(ROOT, "src/content/blog"), { recursive: true });

const raw = await fetchAllPosts();
const SLUGS = new Set(raw.map((p) => p.slug));
// Resolve category ids -> names (the embedded terms aren't always present).
const cats = await (await fetch(`${WP}/categories?per_page=100&_fields=id,name`)).json();
const catName = Object.fromEntries(cats.map((c) => [c.id, c.name.toLowerCase()]));
const rows = [];
for (const p of raw) {
  const terms = (p.categories ?? []).map((id) => catName[id] ?? "");
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  let cover = null;
  if (media?.source_url) {
    const file = `${p.slug}${extOf(media.source_url)}`;
    try {
      await download(media.source_url, path.join(IMG_DIR, file));
      cover = `/images/posts/${file}`;
    } catch (e) {
      console.warn("  ! cover skipped:", e.message);
    }
  }
  rows.push({
    id: p.id,
    slug: p.slug,
    title: stripHtml(p.title?.rendered),
    date: p.date_gmt ? `${p.date_gmt}Z` : null,
    category: terms.some((n) => n.includes("book")) ? "book-review" : "blog",
    image: cover ? { src: cover, alt: stripHtml(media?.alt_text || "") } : null,
    excerpt: stripHtml(p.excerpt?.rendered).slice(0, 300) || null,
    content: await localiseInlineImages(p.content?.rendered ?? ""),
  });
  console.log("✓", p.slug);
}

rows.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
await writeFile(path.join(ROOT, "src/content/blog/posts.json"), JSON.stringify(rows, null, 2) + "\n");
console.log(`\nSaved ${rows.length} posts to src/content/blog/posts.json`);
