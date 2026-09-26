import { cache } from "react";
import { publicClient } from "@/lib/supabase";
import snapshot from "@/content/posts.json";

/**
 * Blog data.
 * Source of truth is the Supabase `posts` table. If Supabase is not
 * configured or unreachable, the site falls back to the snapshot of the
 * real WordPress posts in src/content/posts.json (refresh it with
 * `npm run snapshot:wp`).
 */

export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  category: "blog" | "book-review";
  cover_image_url: string | null;
  cover_image_alt?: string | null;
  published_at: string | null;
};

const byNewest = (a: Post, b: Post) => (b.published_at ?? "").localeCompare(a.published_at ?? "");

// After a failure, skip Supabase for a few minutes instead of waiting on it for every page.
let retrySupabaseAt = 0;

const loadPosts = cache(async (): Promise<Post[]> => {
  const supabase = publicClient();
  if (supabase && Date.now() >= retrySupabaseAt) {
    try {
      const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false });
      if (error) throw new Error(error.message);
      if (data && data.length) return data as Post[];
    } catch (e) {
      retrySupabaseAt = Date.now() + 5 * 60 * 1000;
      console.warn(`[posts] Supabase unavailable, using local snapshot for 5 min (${(e as Error).message})`);
    }
  }
  return [...(snapshot as Post[])].sort(byNewest);
});

export async function getAllPosts(): Promise<Post[]> {
  return loadPosts();
}

export async function getPostsByCategory(category: Post["category"]): Promise<Post[]> {
  return (await loadPosts()).filter((p) => p.category === category);
}

export async function getRecentPosts(limit = 3, category?: Post["category"]): Promise<Post[]> {
  const posts = await loadPosts();
  return (category ? posts.filter((p) => p.category === category) : posts).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return (await loadPosts()).find((p) => p.slug === slug) ?? null;
}

export const categoryLabel = (c: Post["category"]) => (c === "book-review" ? "Book Review" : "Blog Post");

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function readingMinutes(html: string | null): number {
  const words = (html ?? "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Plain-text excerpt trimmed to a sentence-ish boundary. */
export function excerptOf(post: Post, max = 180): string {
  const text = (post.excerpt || (post.content ?? "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}
