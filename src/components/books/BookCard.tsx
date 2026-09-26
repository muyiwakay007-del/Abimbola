import Link from "next/link";
import { type Book, bookHref, primaryPurchase, sampleLink } from "@/content/books";
import { BookCover } from "@/components/books/BookCover";
import { BookPurchaseButton } from "@/components/books/BookPurchaseButton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DevNote } from "@/components/ui/DevNote";
import styles from "./books.module.css";

/** Buy / sample / details actions: shared by every book presentation. */
export function BookActions({
  book,
  size = "md",
  short = true,
  showDetails = true,
}: {
  book: Book;
  size?: "sm" | "md" | "lg";
  /** Short labels ("Buy Now", "Read Sample") vs. full ("Buy on Amazon", "Look Inside on Amazon"). */
  short?: boolean;
  showDetails?: boolean;
}) {
  const buy = primaryPurchase(book);
  const sample = sampleLink(book);

  if (book.status === "coming-soon") {
    return (
      <div className={styles.actions}>
        <Button href="/#newsletter" variant="secondary" size={size} pill>
          Get notified when it&apos;s out
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      {buy && <BookPurchaseButton retailer={buy.retailer} url={buy.url} label={short ? "Buy Now" : buy.label} size={size} />}
      {sample && (
        <Button href={sample.url} external={sample.external} variant="secondary" size={size} pill>
          {short ? "Read Sample" : sample.label}
        </Button>
      )}
      {showDetails && (
        <Button href={bookHref(book)} variant="ghost" size={size}>
          View Book →
        </Button>
      )}
    </div>
  );
}

/** Bookstore-style card for any book in src/content/books.ts. */
export function BookCard({ book, headingLevel = "h3" }: { book: Book; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const href = bookHref(book);
  return (
    <article className={styles.card} data-reveal>
      <Link href={href} className={styles.cardCover} tabIndex={-1} aria-hidden="true">
        <BookCover book={book} sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px" />
        {book.tag && (
          <span className={styles.ribbon}>
            <Badge tone="accent" solid>
              {book.tag}
            </Badge>
          </span>
        )}
      </Link>
      <div className={styles.cardBody}>
        <span className="eyebrow">{book.category}</span>
        <Heading className={styles.cardTitle}>
          <Link href={href}>{book.title}</Link>
        </Heading>
        <p className={styles.cardAuthor}>by {book.author}</p>
        <p className={styles.cardText}>{book.shortDescription}</p>
        {book.status === "available" && (
          <p className={styles.price}>
            {book.price ? (
              <>
                {book.price}
                {book.formats.length > 1 && <span className={styles.priceNote}> · {book.formats.map((f) => f.format).join(" & ")}</span>}
              </>
            ) : (
              <span className={styles.priceNote}>See price on Amazon</span>
            )}
          </p>
        )}
        <BookActions book={book} size="sm" />
        {book.placeholder && <DevNote>fill in this book&apos;s details in src/content/books.ts</DevNote>}
        {!book.placeholder && !book.price && <DevNote>add the confirmed price for {book.shortTitle} in src/content/books.ts</DevNote>}
      </div>
    </article>
  );
}
