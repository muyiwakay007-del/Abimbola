import Link from "next/link";
import { kddSeries, kddVolumes, bookHref, primaryPurchase, sampleLink } from "@/content/books";
import { BookCover } from "@/components/books/BookCover";
import { BookPurchaseButton } from "@/components/books/BookPurchaseButton";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DevNote } from "@/components/ui/DevNote";
import styles from "./VolumeSet.module.css";

/**
 * Kiddies Daily Devotional as ONE collection in two volumes:
 * a shared timeline (183 + 182 = 365 days) and two related cards,
 * teal for Volume 1 and plum for Volume 2.
 */
export function VolumeSet({
  id = "buy",
  eyebrow = "The Collection",
  headingLevel = "h2",
  step,
}: {
  id?: string;
  eyebrow?: string;
  headingLevel?: "h1" | "h2";
  step?: string;
}) {
  const total = kddVolumes.reduce((n, b) => n + (kddSeries.volumeRoles[b.volume ?? 0]?.days ?? 0), 0);

  return (
    <section id={id} data-step={step} className={`section ${styles.section}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          id={`${id}-title`}
          as={headingLevel}
          eyebrow={eyebrow}
          title="Two Volumes. One Complete Year."
          intro="Kiddies Daily Devotional is one devotional collection published in two volumes. Begin with Volume 1, then continue with Volume 2 to complete all 365 days."
        />

        {/* One year, two parts */}
        <div className={styles.timeline} data-reveal aria-label={`Volume 1 has 183 devotionals and Volume 2 has 182, for ${total} in total`}>
          {kddVolumes.map((b) => {
            const role = kddSeries.volumeRoles[b.volume ?? 0];
            return (
              <div key={b.slug} className={`${styles.segment} ${role.accent === "plum" ? styles.plum : styles.teal}`} style={{ flexGrow: role.days }}>
                <span>
                  Volume {b.volume} · {role.days} days
                </span>
              </div>
            );
          })}
        </div>
        <p className={styles.total} data-reveal>
          = <strong>{total} daily devotionals</strong> in the complete collection
        </p>

        <div className={styles.cards}>
          {kddVolumes.map((book, i) => {
            const role = kddSeries.volumeRoles[book.volume ?? 0];
            const plum = role.accent === "plum";
            const buy = primaryPurchase(book);
            const sample = sampleLink(book);
            return (
              <article
                key={book.slug}
                className={`${styles.card} ${plum ? styles.cardPlum : styles.cardTeal}`}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 120}ms` }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.volTag}>
                    Volume {book.volume} <span className={styles.of}>of {kddVolumes.length}</span>
                  </span>
                  <span className={styles.role}>
                    {i === 0 ? <Icon name="sprout" size={16} /> : <Icon name="check" size={16} strokeWidth={2.2} />}
                    {role.label}
                  </span>
                </div>

                <Link href={bookHref(book)} className={styles.cover} tabIndex={-1} aria-hidden="true">
                  <BookCover book={book} sizes="(max-width: 700px) 80vw, 340px" />
                </Link>

                <div className={styles.body}>
                  <h3 className={styles.title}>
                    <Link href={bookHref(book)}>{book.title}</Link>
                  </h3>
                  <p className={styles.days}>
                    <Icon name="calendar" size={16} /> {role.days} daily devotionals
                    {book.tag && <span className={styles.tag}>{book.tag}</span>}
                  </p>
                  <p className={styles.text}>{book.shortDescription}</p>

                  <ul className={styles.formats} aria-label="Formats">
                    {book.formats.map((f) => (
                      <li key={f.format}>
                        {f.format}
                        <strong>{f.price ?? "See Amazon"}</strong>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.actions}>
                    {buy && <BookPurchaseButton retailer={buy.retailer} url={buy.url} label="Buy Now" variant={plum ? "accent" : "primary"} size="lg" block />}
                    <div className={styles.secondary}>
                      {sample && (
                        <Button href={sample.url} external={sample.external} variant="secondary" pill>
                          Read a Sample
                        </Button>
                      )}
                      <Link href={bookHref(book)} className={styles.learn}>
                        Learn More <Icon name="arrow-right" size={15} />
                      </Link>
                    </div>
                  </div>
                  {!book.price && <DevNote>add the confirmed {book.shortTitle} price in src/content/books.ts</DevNote>}
                </div>
              </article>
            );
          })}
          <span className={styles.plus} aria-hidden="true">
            +
          </span>
        </div>

        <p className={styles.note} data-reveal>
          “Read a Sample” opens Amazon&apos;s Look Inside preview. Ordering for a school, church or ministry?{" "}
          <Link href="/contact?topic=Book%20order%20or%20bulk%20purchase">Ask about group orders</Link>.
        </p>
      </div>
    </section>
  );
}
