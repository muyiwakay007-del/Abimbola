import Link from "next/link";
import { kddSeries, kddVolumes, bookHref } from "@/content/books";
import { BookCover } from "@/components/books/BookCover";
import { BookActions } from "@/components/books/BookCard";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { DevNote } from "@/components/ui/DevNote";
import styles from "./FeaturedBook.module.css";

/** The home page's primary conversion section: Kiddies Daily Devotional, both volumes. */
export function FeaturedBook({ id = "featured-book" }: { id?: string }) {
  return (
    <section className={`section ${styles.section}`} aria-labelledby={`${id}-title`} id={id}>
      <div className="container">
        <div className={styles.intro}>
          <div data-reveal>
            <span className="eyebrow">Featured Book</span>
            <h2 id={`${id}-title`} className={styles.title}>
              Kiddies Daily Devotional
            </h2>
            <p className={styles.coverLine}>{kddSeries.coverLine}</p>
            <p className="lead">{kddSeries.summary}</p>
            <p className={styles.audience}>
              For parents, children, Christian families, schools, churches and children&apos;s ministries.
            </p>
          </div>

          <div className={styles.includes} data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <h3 className={styles.includesTitle}>Each devotional includes</h3>
            <ul className={styles.checklist}>
              {kddSeries.dailyParts.map((p) => (
                <li key={p.key}>
                  <span className={styles.check} aria-hidden="true">
                    <Icon name="check" size={16} strokeWidth={2.4} />
                  </span>
                  {p.title}
                </li>
              ))}
            </ul>
            <Link href="/kiddies-daily-devotional" className={styles.more}>
              Discover the series <Icon name="arrow-right" size={16} />
            </Link>
          </div>
        </div>

        <div className={styles.volumes}>
          {kddVolumes.map((book, i) => (
            <article key={book.slug} className={styles.volume} data-reveal style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}>
              <Link href={bookHref(book)} className={styles.volumeCover} tabIndex={-1} aria-hidden="true">
                <BookCover book={book} sizes="(max-width: 640px) 60vw, 260px" />
              </Link>
              <div className={styles.volumeBody}>
                <div className={styles.volumeMeta}>
                  <Badge tone={i === 0 ? "brand" : "accent"}>{book.shortTitle}</Badge>
                  {book.tag && <Badge tone="accent" solid>{book.tag}</Badge>}
                </div>
                <h3 className={styles.volumeTitle}>
                  <Link href={bookHref(book)}>{book.title}</Link>
                </h3>
                <p className={styles.volumeText}>{book.shortDescription}</p>
                <p className={styles.price}>
                  {book.price ?? <span className={styles.priceNote}>See current price on Amazon</span>}
                  {book.price && book.formats.length > 1 && (
                    <span className={styles.priceNote}>
                      {" "}
                      · {book.formats.map((f) => `${f.format}${f.price ? ` ${f.price}` : ""}`).join(" · ")}
                    </span>
                  )}
                </p>
                <BookActions book={book} />
                {!book.price && <DevNote>add the confirmed {book.shortTitle} price in src/content/books.ts</DevNote>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
