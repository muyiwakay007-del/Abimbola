import { pageSeo } from "@/content/site";
import { getPostsByCategory } from "@/lib/posts";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { Testimonials } from "@/components/Testimonials";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogCard } from "@/components/BlogCard";
import { BookCta } from "@/components/BookCta";
import blogStyles from "@/components/BlogCard.module.css";

export const revalidate = 3600;

export const metadata = pageMetadata({ ...pageSeo.bookReviews, path: "/book-reviews", absoluteTitle: true });

export default async function BookReviewsPage() {
  const reviews = await getPostsByCategory("book-review");
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Book Reviews", path: "/book-reviews" }])} />
      <PageHeader
        eyebrow="Reviews"
        title="Book Reviews & Testimonials"
        intro="What readers are saying about Kiddies Daily Devotional, and my own honest reflections on the books I've been reading."
      />

      <Testimonials id="reader-testimonials" title="Kiddies Daily Devotional: reader testimonials" />

      {reviews.length > 0 && (
        <section className="section" aria-labelledby="my-reviews">
          <div className="container">
            <SectionHeading
              id="my-reviews"
              eyebrow="From my bookshelf"
              title="Books I've reviewed"
              intro="Books that met me where I was: on prayer, faith, purpose and becoming."
            />
            <div className={blogStyles.grid}>
              {reviews.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BookCta />
    </>
  );
}
