import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBook, publishedBooks, visibleBooks, kddSeries, kddVolumes, sampleLink, purchaseLinks, bookDetails, displayPrice } from "@/lib/books";
import { pageMetadata, bookSchema, breadcrumbSchema, bookSeo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { BookCover } from "@/components/books/BookCover";
import { BookPurchaseButton } from "@/components/books/BookPurchaseButton";
import { BookCard } from "@/components/books/BookCard";
import { BookPreview } from "@/components/books/BookPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { PerfectFor } from "@/components/kdd/PerfectFor";
import { DailyParts } from "@/components/DailyParts";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { DevNote } from "@/components/ui/DevNote";
import bookStyles from "@/components/books/books.module.css";
import styles from "./book.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedBooks.map((b) => ({ slug: b.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = getBook((await params).slug);
  if (!book) return {};
  // The share image comes from ./opengraph-image.tsx (branded card with this book's cover).
  return pageMetadata({ ...bookSeo(book), path: `/books/${book.slug}`, book, ownImage: true });
}

export default async function BookPage({ params }: Props) {
  const book = getBook((await params).slug);
  if (!book) notFound();

  const isKdd = book.series?.name === kddSeries.name;
  const links = purchaseLinks(book);
  const sample = sampleLink(book);
  const related = visibleBooks.filter((b) => b.slug !== book.slug);

  return (
    <>
      <JsonLd
        data={[
          bookSchema(book),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Books", path: "/books" },
            { name: book.title, path: `/books/${book.slug}` },
          ]),
        ]}
      />

      {/* Product hero */}
      <section className={styles.hero}>
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/books">Books</Link></li>
              <li aria-current="page">{book.shortTitle}</li>
            </ol>
          </nav>

          <div className={styles.product}>
            <div className={styles.coverCol}>
              <BookCover book={book} sizes="(max-width: 900px) 80vw, 460px" preload />
            </div>

            <div className={styles.info}>
              <div className={styles.badges}>
                <Badge tone="brand">{book.category}</Badge>
                {book.tag && <Badge tone="accent" solid>{book.tag}</Badge>}
              </div>
              <h1 className={styles.title}>{book.title}</h1>
              {book.subtitle && <p className={styles.subtitle}>{book.subtitle}</p>}
              <p className={styles.author}>
                by <Link href="/about">{book.author}</Link>
              </p>
              {isKdd && (
                <nav className={styles.switcher} aria-label="Volumes in the Kiddies Daily Devotional collection">
                  <span className={styles.switcherLabel}>
                    Part of the <Link href="/books/kiddies-daily-devotional">Kiddies Daily Devotional</Link> collection
                  </span>
                  <ul>
                    {kddVolumes.map((v) => (
                      <li key={v.slug}>
                        <Link
                          href={`/books/${v.slug}`}
                          aria-current={v.slug === book.slug ? "page" : undefined}
                          className={`${styles.switchItem} ${v.series?.volume === 2 ? styles.switchPlum : ""}`}
                        >
                          Volume {v.series?.volume}
                          {v.devotionalCount ? ` · ${v.devotionalCount} days` : ""}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className={styles.priceBox}>
                {book.formats.length > 0 && (
                  <ul className={styles.formats} aria-label="Formats and prices">
                    {book.formats.map((f) => (
                      <li key={f.format}>
                        <span>{f.format}</span>
                        <strong>{f.price ?? (links[0] ? `See ${links[0].name}` : "Coming soon")}</strong>
                      </li>
                    ))}
                  </ul>
                )}
                <div className={styles.buy}>
                  {links.map((l, i) => (
                    <BookPurchaseButton key={l.url} retailer={l.retailer} url={l.url} label={l.label} size="lg" variant={i === 0 ? "primary" : "secondary"} />
                  ))}
                  {sample && (
                    <Button href={sample.url} external={sample.external} variant="secondary" size="lg" pill>
                      <Icon name="eye" size={20} /> Read a Sample
                    </Button>
                  )}
                </div>
                {sample?.note && <p className={styles.note}>“Read a Sample”: {sample.note}</p>}
                {!links.length && <p className={styles.note}>Retail links coming soon.</p>}
                {!displayPrice(book) && <DevNote>add a price under formats in src/content/books.ts</DevNote>}
              </div>

              <p className={styles.lede}>{book.shortDescription}</p>
              <ul className={styles.quickFacts}>
                {isKdd && (
                  <>
                    {book.devotionalCount && <li><Icon name="calendar" size={18} /> {book.devotionalCount} daily devotionals</li>}
                    <li><Icon name="verse" size={18} /> Memory verse every day</li>
                    <li><Icon name="prayer" size={18} /> Daily prayer</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Description + details */}
      <section className="section" aria-labelledby="about-book">
        <div className={`container ${styles.descGrid}`}>
          <div data-reveal>
            <span className="eyebrow">About the book</span>
            <h2 id="about-book" className={styles.h2}>
              {isKdd ? "A year-long guide to discovering identity in Christ" : "About this book"}
            </h2>
            <div className="prose">
              {book.description.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {isKdd && (
              <blockquote className="blockquote">
                {kddSeries.story}
                <cite style={{ display: "block", marginTop: "var(--space-3)", fontFamily: "var(--font-script)", fontStyle: "normal", fontSize: "1.6rem", color: "var(--accent)" }}>
                  Abimbola
                </cite>
              </blockquote>
            )}
          </div>
          <aside className={styles.detailsCard} data-reveal aria-labelledby="book-details">
            <h2 id="book-details" className={styles.detailsTitle}>Book details</h2>
            <dl className={styles.details}>
              {bookDetails(book).map((d) => (
                <div key={d.label}><dt>{d.label}</dt><dd>{d.value}</dd></div>
              ))}
            </dl>
            {!book.isbn && <DevNote>add publisher, publicationDate, pages and isbn for this book in src/content/books.ts</DevNote>}
          </aside>
        </div>
      </section>

      {isKdd && (
        <>
          {/* What's inside */}
          <section className={`section ${styles.inside}`} aria-labelledby="inside-title">
            <div className="container">
              <SectionHeading id="inside-title" eyebrow="What's Inside" title="Every devotional includes" />
              <DailyParts />
            </div>
          </section>

          <PerfectFor id="for" eyebrow="Who It's For" title="For every home, classroom and ministry" />

          {/* Book features */}
          <section className="section" aria-label="Book features">
            <div className="container">

              <div className={styles.features} data-reveal style={{ marginTop: 0 }}>
                <h3 className={styles.featuresTitle}>Book features</h3>
                <ul>
                  <li><Icon name="check" size={18} strokeWidth={2.4} /> Short, easy-to-understand daily lessons</li>
                  <li><Icon name="check" size={18} strokeWidth={2.4} /> A Bible memory verse for every day</li>
                  <li><Icon name="check" size={18} strokeWidth={2.4} /> Vibrant illustrations</li>
                  <li><Icon name="check" size={18} strokeWidth={2.4} /> Heartfelt prayers children can make their own</li>
                  <li><Icon name="check" size={18} strokeWidth={2.4} /> Builds faith, love, confidence, diligence and obedience</li>
                  <li><Icon name="check" size={18} strokeWidth={2.4} /> Read together as a family or independently</li>
                </ul>
              </div>
            </div>
          </section>
        </>
      )}

      {(isKdd || book.previewImages.length > 0) && (
        <BookPreview
          books={[book]}
          title={`Take a Peek Inside ${book.shortTitle}`}
          intro={isKdd ? undefined : `A closer look at ${book.title}.`}
        />
      )}
      <Testimonials bookSlug={book.slug} bookTitle={book.series?.name ?? book.title} />

      {/* Final CTA */}
      {links[0] && (
        <section className="section-tight" aria-label={`Buy ${book.title}`}>
          <div className="container">
            <div className={styles.finalCta} data-reveal>
              <div>
                <h2 className={styles.finalTitle}>Ready to begin?</h2>
                <p className={styles.finalText}>
                  {isKdd ? `Order ${book.title} and start a daily faith journey together.` : `Get your copy of ${book.title}${book.subtitle ? `: ${book.subtitle}` : ""}.`}
                </p>
              </div>
              <div className={styles.buy}>
                <BookPurchaseButton retailer={links[0].retailer} url={links[0].url} label={links[0].label} variant="light" size="lg" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="section" aria-labelledby="related-title" style={{ background: "var(--surface-soft)" }}>
        <div className="container">
          <SectionHeading id="related-title" eyebrow="Keep reading" title="Related books" />
          <div className={bookStyles.grid}>
            {related.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
