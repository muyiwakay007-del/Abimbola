import type { Metadata } from "next";
import { site, author } from "@/content/site";
import type { Book } from "@/content/books";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Consistent per-page metadata: title, description, canonical, Open Graph, Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article" | "book" | "profile";
}): Metadata {
  const images = image ? [image] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: type === "book" || type === "profile" ? "website" : type,
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images: images.map((i) => i.url) }),
    },
  };
}

const sameAs = () => Object.values(site.social).filter((v): v is string => Boolean(v));

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#author"),
    name: author.name,
    url: site.url,
    jobTitle: "Author",
    description: site.shortBio,
    ...(author.photo && { image: absoluteUrl(author.photo.src) }),
    sameAs: sameAs(),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: site.url,
    description: site.seo.description,
    author: { "@id": absoluteUrl("/#author") },
  };
}

const priceNumber = (p: string | null) => (p ? p.replace(/[^0-9.]/g, "") : null);

export function bookSchema(book: Book) {
  const offers = book.purchaseLinks
    .map((l) => {
      const price = priceNumber(book.formats.find((f) => l.format?.includes(f.format))?.price ?? book.price);
      return {
        "@type": "Offer",
        url: l.url,
        availability: "https://schema.org/InStock",
        ...(price && { price, priceCurrency: "USD" }),
      };
    });
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": absoluteUrl(`/books/${book.slug}#book`),
    name: book.title,
    url: absoluteUrl(`/books/${book.slug}`),
    author: { "@type": "Person", "@id": absoluteUrl("/#author"), name: book.author },
    description: book.description[0] ?? book.shortDescription,
    genre: book.category,
    inLanguage: "en",
    audience: { "@type": "PeopleAudience", audienceType: "Children and families" },
    ...(book.cover && { image: absoluteUrl(book.cover.src) }),
    ...(book.isbn && { isbn: book.isbn }),
    ...(book.series && { isPartOf: { "@type": "BookSeries", name: book.series } }),
    ...(book.formats.length && {
      bookFormat: book.formats.map((f) =>
        ({ Hardcover: "https://schema.org/Hardcover", Paperback: "https://schema.org/Paperback", Kindle: "https://schema.org/EBook" })[f.format] ?? f.format
      ),
    }),
    ...(offers.length && { offers }),
  };
}

export function articleSchema(post: { title: string; slug: string; published_at: string | null; cover_image_url: string | null; excerpt: string | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    ...(post.published_at && { datePublished: post.published_at }),
    ...(post.cover_image_url && { image: absoluteUrl(post.cover_image_url) }),
    ...(post.excerpt && { description: post.excerpt }),
    author: { "@type": "Person", "@id": absoluteUrl("/#author"), name: author.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}
