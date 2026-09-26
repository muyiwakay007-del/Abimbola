import type { MetadataRoute } from "next";
import { publishedBooks } from "@/content/books";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", "/kiddies-daily-devotional", "/books", "/about", "/blog", "/book-reviews", "/youtube", "/contact"];
  const posts = await getAllPosts();
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : p.includes("devotional") || p === "/books" ? 0.9 : 0.7 })),
    ...publishedBooks.map((b) => ({ url: absoluteUrl(`/books/${b.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: absoluteUrl(`/blog/${p.slug}`), lastModified: p.published_at ?? undefined, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
