/**
 * ============================================================
 *  BLOG: posts and book reviews.
 * ============================================================
 *  Posts come from three places, merged by slug:
 *    1. Supabase `posts` table (when connected and reachable)
 *    2. src/content/blog/posts.json (your WordPress posts, saved locally)
 *    3. `newPosts` below (add posts by hand here)
 *
 *  A post in `newPosts` with the same slug as an imported one replaces it,
 *  so you can also use this list to correct an old post.
 *
 *  Fields (see BlogPost in src/content/types.ts):
 *    slug      "my-new-post"  → the post lives at /blog/my-new-post
 *    title     "My New Post"
 *    date      "2026-10-01"
 *    category  "blog" | "book-review"
 *    image     { src: "/images/posts/my-new-post.jpg", alt: "…" } or null
 *    excerpt   short summary, or null to use the first lines of content
 *    content   the body as HTML: "<p>First paragraph.</p><p>Second.</p>"
 */
import type { BlogPost } from "./types";
import imported from "./blog/posts.json";

export const newPosts: BlogPost[] = [
  // {
  //   slug: "my-new-post",
  //   title: "My New Post",
  //   date: "2026-10-01",
  //   category: "blog",
  //   image: null,
  //   excerpt: null,
  //   content: "<p>…</p>",
  // },
];

/** Posts saved from the original WordPress site (refresh with `npm run snapshot:wp`). */
export const importedPosts = imported as BlogPost[];

export const blogCategories: Record<BlogPost["category"], { label: string; plural: string }> = {
  blog: { label: "Blog Post", plural: "Blog Posts" },
  "book-review": { label: "Book Review", plural: "Book Reviews" },
};
