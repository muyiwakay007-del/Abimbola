import Image from "next/image";
import type { Book } from "@/lib/books";
import styles from "./books.module.css";

/**
 * A book presented as a physical object: the real cover artwork (never
 * altered), a sliver of page edges, a spine highlight and a soft contact
 * shadow. Only when no cover exists does it fall back to a typographic
 * placeholder.
 */
export function BookCover({
  book,
  sizes = "(max-width: 640px) 70vw, 320px",
  preload = false,
  tilt = false,
  className,
}: {
  book: Book;
  sizes?: string;
  preload?: boolean;
  /** Adds a subtle 3D perspective (use for large, featured presentations). */
  tilt?: boolean;
  className?: string;
}) {
  const ratio = book.cover ? `${book.cover.width} / ${book.cover.height}` : "1 / 1";
  return (
    <div className={`${styles.book} ${tilt ? styles.tilt : ""} ${className ?? ""}`} style={{ aspectRatio: ratio }}>
      <span className={styles.pages} aria-hidden="true" />
      {book.cover ? (
        <div className={styles.cover}>
          <Image
            src={book.cover.src}
            alt={book.cover.alt}
            width={book.cover.width}
            height={book.cover.height}
            sizes={sizes}
            preload={preload}
            className={styles.coverImg}
          />
        </div>
      ) : (
        <div className={`${styles.cover} ${styles.coverPlaceholder}`} role="img" aria-label={`${book.title}: cover coming soon`}>
          <span className={styles.placeholderTitle}>{book.title}</span>
          <span className={styles.placeholderAuthor}>{book.author}</span>
          <span className={styles.placeholderNote}>Cover coming soon</span>
        </div>
      )}
    </div>
  );
}
