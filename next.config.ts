import type { NextConfig } from "next";
import posts from "./src/content/blog/posts.json";

/** Old WordPress URLs (https://www.abimbolaolumuyiwa.com/<slug>/) → new blog URLs, so links and search rankings carry over. */
const legacyPostRedirects = (posts as { slug: string }[]).map((p) => ({
  source: `/${p.slug}`,
  destination: `/blog/${p.slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  images: {
    // YouTube thumbnails for the "Watch & Connect" section.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
  async redirects() {
    return [
      ...legacyPostRedirects,
      { source: "/posts", destination: "/blog", permanent: true },
      { source: "/posts/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/category/blog-posts", destination: "/blog", permanent: true },
      { source: "/category/book-reviews", destination: "/book-reviews", permanent: true },
      { source: "/welcome", destination: "/", permanent: true },
      // The series page moved to the dedicated product landing page.
      { source: "/kiddies-daily-devotional", destination: "/books/kiddies-daily-devotional", permanent: true },
    ];
  },
};

export default nextConfig;
