import { notFound } from "next/navigation";
import { getBook, publishedBooks } from "@/lib/books";
import { bookCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedBooks.map((b) => ({ slug: b.slug }));
}

// Static export can't serve per-item image metadata ids, so size and alt are fixed.
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "A book by Abimbola Olumuyiwa";

export default async function Image({ params }: Params) {
  const book = getBook((await params).slug);
  if (!book) notFound();
  return bookCard(book);
}

export const dynamic = "force-static";
