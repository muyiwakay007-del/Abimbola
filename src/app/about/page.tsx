export const metadata = { title: "About — Abimbola Olumuyiwa" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="text-3xl font-bold text-teal-700">About</h2>
      <div className="post-body mt-6 text-gray-700">
        <p>
          Hi, and welcome to my blog! I&apos;m Abimbola Olumuyiwa — this is a space
          for honest reflections on faith, growth, and the everyday journey of
          evolving and impacting.
        </p>
        <p>
          {/* Edit this page anytime in src/app/about/page.tsx */}
          Here you&apos;ll find my blog posts and reviews of the books that have
          shaped my thinking. Thank you for stopping by.
        </p>
      </div>
    </div>
  );
}
