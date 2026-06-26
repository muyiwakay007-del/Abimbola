import Link from "next/link";
import { type Post, formatDate } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover_image_url}
          alt=""
          className="h-44 w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wide text-teal-600">
          {formatDate(post.published_at)}
        </p>
        <h3 className="mt-1 text-lg font-bold text-gray-900 group-hover:text-teal-700">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt}</p>
        )}
        <span className="mt-4 text-sm font-semibold text-teal-600">Read more →</span>
      </div>
    </Link>
  );
}
