import Link from "next/link";
import { kddVolumes, purchaseLinks, formatsLabel, retailerNames, type Book, type PurchaseLink } from "@/lib/books";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { DevNote } from "@/components/ui/DevNote";
import styles from "./landing.module.css";

/**
 * "Where to Get the Book": one card per retailer that has at least one
 * link under `retailers` in src/content/books.ts. Retailers without links
 * are not shown, so there are never empty or broken buttons.
 */
export function WhereToBuy({ id = "where-to-buy", volumes = kddVolumes }: { id?: string; volumes?: Book[] }) {
  const groups = new Map<string, (PurchaseLink & { book: Book })[]>();
  volumes.forEach((book) =>
    purchaseLinks(book).forEach((l) => {
      groups.set(l.name, [...(groups.get(l.name) ?? []), { ...l, book }]);
    })
  );
  const missing = (Object.keys(retailerNames) as (keyof typeof retailerNames)[])
    .filter((k) => !volumes.some((b) => b.retailers[k]))
    .map((k) => retailerNames[k]);

  return (
    <section id={id} className={`section ${styles.whereSection}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          id={`${id}-title`}
          eyebrow="Purchase"
          title="Where to Get the Book"
          intro={
            groups.size
              ? "Choose a retailer and volume to continue to the retailer's page."
              : "Retail links will be listed here soon. In the meantime, get in touch about orders."
          }
        />
        <div className={styles.retailers}>
          {[...groups.entries()].map(([name, links]) => (
            <article key={name} className={styles.retailer} data-reveal>
              <h3 className={styles.retailerName}>{name}</h3>
              <ul className={styles.retailerLinks}>
                {links.map((l) => {
                  const volume = l.book.series?.volume;
                  return (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className={`${styles.retailerLink} ${volume === 2 ? styles.linkPlum : ""}`}>
                        <span>
                          <strong>{volume ? `Volume ${volume}` : l.book.title}</strong>
                          {l.book.formats.length > 0 && <span className={styles.retailerFormat}>{formatsLabel(l.book)}</span>}
                        </span>
                        <span className={styles.retailerGo}>
                          Buy <Icon name="external" size={16} />
                        </span>
                        <span className="visually-hidden"> (opens {name} in a new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}

          <article className={`${styles.retailer} ${styles.retailerGroup}`} data-reveal>
            <h3 className={styles.retailerName}>Schools, churches &amp; ministries</h3>
            <p className={styles.groupText}>Ordering for a group of children? Get in touch about bulk orders.</p>
            <Link href="/contact?topic=Book%20order%20or%20bulk%20purchase" className={styles.groupLink}>
              Ask about group orders <Icon name="arrow-right" size={16} />
            </Link>
          </article>
        </div>
        {missing.length > 0 && <DevNote>add {missing.join(", ")} links under `retailers` in src/content/books.ts and they appear here automatically</DevNote>}
      </div>
    </section>
  );
}
