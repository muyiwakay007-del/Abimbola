import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, formatDate } from "@/lib/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const backHref = post.category === "book-review" ? "/book-reviews" : "/blog";
  const backLabel = post.category === "book-review" ? "Book Reviews" : "Blog Posts";

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link href={backHref} className="text-sm font-semibold text-teal-600 hover:underline">
        ← Back to {backLabel}
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">{post.title}</h1>
      <p className="mt-2 text-sm text-gray-500">{formatDate(post.published_at)}</p>

      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt=""
          className="mt-6 w-full rounded-lg object-cover"
        />
      )}

      <div
        className="post-body mt-8 text-gray-800"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />
    </article>
  );
}
