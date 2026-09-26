import { bookOrder, kddVolumes } from "@/content/books";
import { pageMetadata, bookSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BookCard } from "@/components/books/BookCard";
import { FeaturedBook } from "@/components/books/FeaturedBook";
import { Newsletter } from "@/components/forms/Newsletter";
import bookStyles from "@/components/books/books.module.css";

export const metadata = pageMetadata({
  title: "Books",
  description:
    "Books by Abimbola Olumuyiwa: Kiddies Daily Devotional Volumes 1 and 2, daily Christian devotionals for children, and Built for More, a guide to living a life of purpose.",
  path: "/books",
});

export default function BooksPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Books", path: "/books" }]), ...kddVolumes.map(bookSchema)]} />
      <PageHeader
        eyebrow="The Bookshop"
        title="Books by Abimbola Olumuyiwa"
        intro="Faith-filled books for children, families, and anyone searching for purpose, from daily devotionals for kids to a guide to living a life of purpose."
      />

      <section className="section" id="collection" aria-label="All books">
        <div className="container">
          <div className={bookStyles.grid}>
            {bookOrder.map((b) => (
              <BookCard key={b.slug} book={b} headingLevel="h2" />
            ))}
          </div>
        </div>
      </section>

      <FeaturedBook id="kdd" />
      <Newsletter />
    </>
  );
}
