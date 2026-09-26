/**
 * Loads the blog posts into the Supabase `posts` table.
 *
 *   npm run snapshot:wp   # 1. pull the latest posts + images from WordPress
 *   npm run import:wp     # 2. upsert them into Supabase
 *
 * Posts come from src/content/blog/posts.json (written by snapshot:wp), whose image
 * paths point at files in /public: so nothing depends on the old WordPress host.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * (the service-role key bypasses Row Level Security to write).
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

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("\n❌ Missing Supabase credentials in .env.local.");
  console.error("   Fill in NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.\n");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

const posts = JSON.parse(readFileSync(new URL("../src/content/blog/posts.json", import.meta.url), "utf8"));

// BlogPost (src/content/types.ts) → Supabase `posts` row. Posts without an id get a stable one from their slug.
const idFromSlug = (slug) => [...slug].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 2147483647, 7);
const rows = posts.map((p) => ({
  id: p.id ?? idFromSlug(p.slug),
  slug: p.slug,
  title: p.title,
  content: p.content,
  excerpt: p.excerpt,
  category: p.category,
  cover_image_url: p.image?.src ?? null,
  cover_image_alt: p.image?.alt ?? null,
  published_at: p.date,
}));
console.log(`Upserting ${posts.length} posts into Supabase…`);

let { error } = await supabase.from("posts").upsert(rows, { onConflict: "id" });
if (error?.message?.includes("cover_image_alt")) {
  // Older schema without the alt-text column (see supabase/migrations/0002_forms.sql).
  ({ error } = await supabase.from("posts").upsert(rows.map((r) => { const row = { ...r }; delete row.cover_image_alt; return row; }), { onConflict: "id" }));
}
if (error) {
  console.error("❌ Supabase upsert failed:", error.message);
  process.exit(1);
}

const blog = posts.filter((r) => r.category === "blog").length;
console.log(`✅ Imported ${posts.length} posts (${blog} blog, ${posts.length - blog} book reviews).`);
