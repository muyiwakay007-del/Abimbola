import { type Book, displayPrice, formatsLabel, primaryPurchase } from "@/lib/books";
import styles from "./books.module.css";

/**
 * Headline price from `formats` in src/content/books.ts.
 * No price yet → "See price on <retailer>". No retailer either → nothing.
 */
export function BookPrice({ book, className }: { book: Book; className?: string }) {
  if (book.status !== "available") return null;
  const price = displayPrice(book);
  const buy = primaryPurchase(book);
  if (!price && !buy) return null;
  return (
    <p className={`${styles.price} ${className ?? ""}`}>
      {price ? (
        <>
          {price}
          {book.formats.length > 1 && <span className={styles.priceNote}> · {formatsLabel(book)}</span>}
        </>
      ) : (
        <span className={styles.priceNote}>See price on {buy!.name}</span>
      )}
    </p>
  );
}
