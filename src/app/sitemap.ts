import type { MetadataRoute } from "next";
import { publishedBooks } from "@/lib/books";
import { kddSeries } from "@/content/kiddies-daily-devotional";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";
import { youtubeChannelUrl } from "@/lib/youtube";

export const revalidate = 3600;

/** Every public page, with book covers and post images for image search. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const covers = publishedBooks.flatMap((b) => (b.cover ? [absoluteUrl(b.cover.src)] : []));

  const pages: { path: string; priority: number; freq: "weekly" | "monthly"; images?: string[] }[] = [
    { path: "/", priority: 1, freq: "weekly", images: covers },
    { path: kddSeries.path, priority: 0.95, freq: "monthly", images: covers.filter((c) => c.includes("kiddies")) },
    { path: "/books", priority: 0.8, freq: "monthly", images: covers },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/music", priority: 0.6, freq: "monthly" },
    { path: "/music/upcoming", priority: 0.4, freq: "monthly" },
    { path: "/blog", priority: 0.6, freq: "weekly" },
    { path: "/book-reviews", priority: 0.5, freq: "monthly" },
    ...(youtubeChannelUrl ? [{ path: "/youtube", priority: 0.4, freq: "weekly" as const }] : []),
    { path: "/contact", priority: 0.4, freq: "monthly" },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), changeFrequency: p.freq, priority: p.priority, ...(p.images?.length && { images: p.images }) })),
    ...publishedBooks.map((b) => ({
      url: absoluteUrl(`/books/${b.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      ...(b.cover && { images: [absoluteUrl(b.cover.src)] }),
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      ...(p.date && { lastModified: p.date }),
      changeFrequency: "yearly" as const,
      priority: 0.5,
      ...(p.image && { images: [absoluteUrl(p.image.src)] }),
    })),
  ];
}
