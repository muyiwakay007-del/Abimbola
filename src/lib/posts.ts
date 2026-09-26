import { cache } from "react";
import { publicClient } from "@/lib/supabase";
import { importedPosts, newPosts, blogCategories } from "@/content/blog";
import type { BlogPost } from "@/content/types";
import { formatDate } from "@/lib/books";

/**
 * Blog data, merged from Supabase (if connected), the saved WordPress posts
 * and hand-written `newPosts` in src/content/blog.ts. Later sources win
 * when slugs match.
 */

export type Post = BlogPost;
export { formatDate };

/** Supabase `posts` row → BlogPost. */
type PostRow = {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  category: BlogPost["category"];
  cover_image_url: string | null;
  cover_image_alt?: string | null;
  published_at: string | null;
};
const fromRow = (r: PostRow): BlogPost => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  date: r.published_at,
  category: r.category,
  image: r.cover_image_url ? { src: r.cover_image_url, alt: r.cover_image_alt ?? "" } : null,
  excerpt: r.excerpt,
  content: r.content ?? "",
});

const byNewest = (a: BlogPost, b: BlogPost) => (b.date ?? "").localeCompare(a.date ?? "");

// After a failure, skip Supabase for a few minutes instead of waiting on it for every page.
let retrySupabaseAt = 0;

async function fromSupabase(): Promise<BlogPost[] | null> {
  const supabase = publicClient();
  if (!supabase || Date.now() < retrySupabaseAt) return null;
  try {
    const { data, error } = await supabase.from("posts").select("*").order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data?.length ? (data as PostRow[]).map(fromRow) : null;
  } catch (e) {
    retrySupabaseAt = Date.now() + 5 * 60 * 1000;
    console.warn(`[posts] Supabase unavailable, using local posts for 5 min (${(e as Error).message})`);
    return null;
  }
}

const loadPosts = cache(async (): Promise<BlogPost[]> => {
  const base = (await fromSupabase()) ?? importedPosts;
  const bySlug = new Map(base.map((p) => [p.slug, p]));
  newPosts.forEach((p) => bySlug.set(p.slug, p));
  return [...bySlug.values()].sort(byNewest);
});

export async function getAllPosts(): Promise<BlogPost[]> {
  return loadPosts();
}

export async function getPostsByCategory(category: BlogPost["category"]): Promise<BlogPost[]> {
  return (await loadPosts()).filter((p) => p.category === category);
}

export async function getRecentPosts(limit = 3, category?: BlogPost["category"]): Promise<BlogPost[]> {
  const posts = await loadPosts();
  return (category ? posts.filter((p) => p.category === category) : posts).slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return (await loadPosts()).find((p) => p.slug === slug) ?? null;
}

export const categoryLabel = (c: BlogPost["category"]) => blogCategories[c].label;

export function readingMinutes(html: string | null): number {
  const words = (html ?? "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Plain-text excerpt trimmed to a word boundary. */
export function excerptOf(post: BlogPost, max = 180): string {
  const text = (post.excerpt || post.content.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}
