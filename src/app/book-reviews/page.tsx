import { getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata = { title: "Book Reviews — Abimbola Olumuyiwa" };

export default async function BookReviewsPage() {
  const posts = await getPostsByCategory("book-review");

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h2 className="text-3xl font-bold text-teal-700">Book Reviews</h2>
      <p className="mt-2 text-gray-600">The books shaping the journey.</p>

      {posts.length === 0 ? (
        <p className="mt-8 rounded-md bg-amber-50 p-4 text-sm text-amber-800">
          No reviews yet — run the WordPress import once your Supabase keys are set.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
