import { notFound } from "next/navigation";
import { getBook, publishedBooks } from "@/lib/books";
import { bookCard, bookCardAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedBooks.map((b) => ({ slug: b.slug }));
}

/** One card per book, with alt text written from the book's data. */
export async function generateImageMetadata({ params }: Params) {
  const book = getBook((await params).slug);
  return book ? [{ id: "card", alt: bookCardAlt(book), size: OG_SIZE, contentType: OG_CONTENT_TYPE }] : [];
}

export default async function Image({ params }: Params) {
  const book = getBook((await params).slug);
  if (!book) notFound();
  return bookCard(book);
}
