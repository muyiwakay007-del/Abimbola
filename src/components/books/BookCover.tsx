import Image from "next/image";
import type { Book } from "@/content/books";
import styles from "./books.module.css";

/**
 * The book's real cover image, or: only when no cover exists yet: * an elegant typographic placeholder.
 */
export function BookCover({
  book,
  sizes = "(max-width: 640px) 70vw, 320px",
  preload = false,
  className,
}: {
  book: Book;
  sizes?: string;
  preload?: boolean;
  className?: string;
}) {
  if (book.cover) {
    return (
      <div className={`${styles.cover} ${className ?? ""}`} style={{ aspectRatio: `${book.cover.width} / ${book.cover.height}` }}>
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
    );
  }
  return (
    <div className={`${styles.cover} ${styles.coverPlaceholder} ${className ?? ""}`} role="img" aria-label={`${book.title}: cover coming soon`}>
      <span className={styles.placeholderTitle}>{book.placeholder ? "New Book" : book.title}</span>
      <span className={styles.placeholderAuthor}>{book.author}</span>
      <span className={styles.placeholderNote}>Cover coming soon</span>
    </div>
  );
}
