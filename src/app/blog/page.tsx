import { pageSeo } from "@/content/site";
import { getAllPosts } from "@/lib/posts";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BlogCard } from "@/components/BlogCard";
import { BlogListing } from "@/components/BlogListing";
import { Newsletter } from "@/components/forms/Newsletter";

export const revalidate = 3600;

export const metadata = pageMetadata({ ...pageSeo.blog, path: "/blog", absoluteTitle: true });

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <PageHeader eyebrow="The Journal" title="From My Journal" intro="Reflections on faith and growth, and honest thoughts on the books I'm reading." />
      <section className="section" aria-label="Posts">
        <div className="container">
          {posts.length ? (
            <BlogListing
              items={posts.map((p, i) => ({ key: p.slug, category: p.category, card: <BlogCard post={p} index={i} headingLevel="h2" /> }))}
            />
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-muted)" }}>New posts are coming soon.</p>
          )}
        </div>
      </section>
      <Newsletter />
    </>
  );
}
