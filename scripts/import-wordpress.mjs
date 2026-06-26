/**
 * One-time importer: pulls all posts from the existing WordPress site
 * (abimbolaolumuyiwa.com) and writes them into the Supabase `posts` table.
 *
 * Run with:  npm run import:wp
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (the service-role key is needed because it bypasses Row Level Security to write).
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

// --- tiny .env.local loader (no extra dependency needed) ---
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const WP = "https://www.abimbolaolumuyiwa.com/wp-json/wp/v2";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("\n❌ Missing Supabase credentials in .env.local.");
  console.error("   Fill in NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.\n");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

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
    .replace(/&amp;/g, "&"); // do &amp; last so it doesn't double-decode

const stripHtml = (html = "") => decodeEntities(html.replace(/<[^>]+>/g, "")).trim();

async function fetchAllPosts() {
  const posts = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${WP}/posts?per_page=100&page=${page}&_embed=1`);
    if (res.status === 400) break; // ran past the last page
    if (!res.ok) throw new Error(`WordPress fetch failed: ${res.status}`);
    const batch = await res.json();
    if (!batch.length) break;
    posts.push(...batch);
    page++;
  }
  return posts;
}

function mapCategory(post) {
  const names = (post._embedded?.["wp:term"]?.[0] ?? []).map((t) => t.name.toLowerCase());
  return names.some((n) => n.includes("book")) ? "book-review" : "blog";
}

const rows = (await fetchAllPosts()).map((p) => ({
  id: p.id,
  slug: p.slug,
  title: stripHtml(p.title?.rendered),
  content: p.content?.rendered ?? "",
  excerpt: stripHtml(p.excerpt?.rendered).slice(0, 300),
  category: mapCategory(p),
  cover_image_url: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null,
  published_at: p.date_gmt ? `${p.date_gmt}Z` : null,
}));

console.log(`Fetched ${rows.length} posts from WordPress. Upserting into Supabase…`);

const { error } = await supabase.from("posts").upsert(rows, { onConflict: "id" });
if (error) {
  console.error("❌ Supabase upsert failed:", error.message);
  process.exit(1);
}

const blog = rows.filter((r) => r.category === "blog").length;
const reviews = rows.filter((r) => r.category === "book-review").length;
console.log(`✅ Imported ${rows.length} posts (${blog} blog, ${reviews} book reviews).`);
