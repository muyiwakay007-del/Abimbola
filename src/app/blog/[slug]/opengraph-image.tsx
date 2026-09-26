import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { postCard, postCardAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateImageMetadata({ params }: Params) {
  const post = await getPostBySlug((await params).slug);
  return post ? [{ id: "card", alt: postCardAlt(post), size: OG_SIZE, contentType: OG_CONTENT_TYPE }] : [];
}

export default async function Image({ params }: Params) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();
  return postCard(post);
}
