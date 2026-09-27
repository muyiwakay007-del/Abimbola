// Old WordPress URLs and moved pages. scripts/write-htaccess.mjs turns these
// into Apache rules, because Bluehost serves the static export without Next.js.
import { readFileSync } from "node:fs";

const posts = JSON.parse(readFileSync(new URL("./src/content/blog/posts.json", import.meta.url), "utf8"));

/** Old WordPress URLs (https://www.abimbolaolumuyiwa.com/<slug>/) → new blog URLs, so links and search rankings carry over. */
const legacyPostRedirects = posts.map((p) => ({
  source: `/${p.slug}`,
  destination: `/blog/${p.slug}`,
  permanent: true,
}));

export const siteRedirects = [
  ...legacyPostRedirects,
  { source: "/posts", destination: "/blog", permanent: true },
  { source: "/posts/:slug", destination: "/blog/:slug", permanent: true },
  { source: "/category/blog-posts", destination: "/blog", permanent: true },
  { source: "/category/book-reviews", destination: "/book-reviews", permanent: true },
  { source: "/welcome", destination: "/", permanent: true },
  // The series page moved to the dedicated product landing page.
  { source: "/kiddies-daily-devotional", destination: "/books/kiddies-daily-devotional", permanent: true },
];

