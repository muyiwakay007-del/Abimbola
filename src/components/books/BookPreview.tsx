import Image from "next/image";
import { type Book, sampleLink } from "@/lib/books";
import { SectionHeading } from "@/components/SectionHeading";
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { DevNote } from "@/components/ui/DevNote";
import styles from "./BookPreview.module.css";

/**
 * "Take a Peek Inside": interior spreads from `previewImages` in
 * src/content/books.ts. Until those exist, tasteful frames hold their place
 * (no mock pages are invented).
 */
export function BookPreview({
  books,
  id = "preview",
  title = "Take a Peek Inside",
  intro = "Each page pairs a topic, memory verse, narration, illustration and prayer, made to be read together or independently.",
  eyebrow = "Book Preview",
  step,
  nextHref,
}: {
  books: Book[];
  id?: string;
  title?: string;
  intro?: string;
  eyebrow?: string;
  /** Journey step this section belongs to (sticky step indicator). */
  step?: string;
  /** Optional "Choose your volume" link shown beside the sample button. */
  nextHref?: string;
}) {
  const images = books.flatMap((b) => b.previewImages.map((img) => ({ ...img, book: b })));
  const primary = books[0];
  const sample = sampleLink(primary);

  return (
    <section className={`section ${styles.section}`} id={id} data-step={step} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          title={title}
          intro={intro}
        />

        {images.length > 0 ? (
          <div className={styles.gallery}>
            {images.map((img, i) => (
              <figure key={img.src} className={styles.frame} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 700px) 90vw, 33vw" className={styles.img} />
                <figcaption className={styles.caption}>{img.caption ?? img.book.shortTitle}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className={styles.placeholderLayout}>
            <div className={styles.coverStack} data-reveal>
              {books.slice(0, 2).map((b, i) => (
                <div key={b.slug} className={i === 0 ? styles.stackBack : styles.stackFront}>
                  <BookCover book={b} sizes="260px" />
                </div>
              ))}
            </div>
            <div className={styles.frames}>
              {["A daily topic & memory verse", "Narration & illustration", "Prayer of the day"].map((label, i) => (
                <div key={label} className={styles.placeholderFrame} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
                  <Icon name="book-open" size={30} />
                  <span className={styles.placeholderLabel}>{label}</span>
                  <span className={styles.placeholderNote}>Interior preview coming soon</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DevNote>add interior page images to `previewImages` (and a `sample` link) in src/content/books.ts</DevNote>

        {(sample || nextHref) && (
          <div className={styles.cta} data-reveal>
            <div className={styles.ctaRow}>
              {sample && (
                <Button href={sample.url} external={sample.external} variant="accent" size="lg" pill>
                  <Icon name="eye" size={20} /> Read a Sample
                </Button>
              )}
              {nextHref && (
                <Button href={nextHref} variant="secondary" size="lg" pill>
                  Choose your volume <Icon name="arrow-right" size={18} />
                </Button>
              )}
            </div>
            {sample?.note && <p className={styles.ctaNote}>{sample.note}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
