import { createClient } from "@/lib/supabase/server";

/** True only when both Supabase env vars are present. */
function isConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export type Post = {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  excerpt: string | null;
  category: "blog" | "book-review";
  cover_image_url: string | null;
  published_at: string | null;
};

/** All posts in a category, newest first. */
export async function getPostsByCategory(category: Post["category"]): Promise<Post[]> {
  if (!isConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("category", category)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("getPostsByCategory:", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

/** A single post by its slug, or null if not found. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getPostBySlug:", error.message);
    return null;
  }
  return (data as Post) ?? null;
}

/** A few most-recent posts across all categories, for the home page. */
export async function getRecentPosts(limit = 3): Promise<Post[]> {
  if (!isConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("getRecentPosts:", error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
