import { getRecentPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default async function HomePage() {
  const recent = await getRecentPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-72 items-center justify-center bg-gradient-to-r from-teal-500 to-purple-400 sm:h-96">
        <div className="px-6 text-center text-white">
          <h2 className="font-script text-4xl sm:text-5xl">Welcome!</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base">
            Evolving and impacting — reflections, blog posts, and book reviews.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h3 className="text-2xl font-bold text-teal-700">Did you know?</h3>
        <p className="mt-4 text-gray-700">
          This is the home of Abimbola Olumuyiwa — a space for honest reflections,
          thoughts on faith and growth, and reviews of the books shaping the journey.
          Explore the latest writing below.
        </p>
      </section>

      {/* Recent posts */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h3 className="mb-6 text-xl font-bold text-gray-900">Latest</h3>
        {recent.length === 0 ? (
          <p className="rounded-md bg-amber-50 p-4 text-sm text-amber-800">
            No posts yet. Once your Supabase keys are set and the content import has
            run, your posts will appear here.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
