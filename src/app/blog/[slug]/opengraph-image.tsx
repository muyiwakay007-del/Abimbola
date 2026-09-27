import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { postCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

// Static export can't serve per-item image metadata ids, so size and alt are fixed.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "A blog post by Abimbola Olumuyiwa";

export default async function Image({ params }: Params) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  return postCard(post);
}

export const dynamic = "force-static";
