import type { Metadata } from "next";
import { site } from "@/content/site";
import { author } from "@/content/author";
import type { Book, BlogPost } from "@/content/types";
import { purchaseLinks, displayPrice, bookHref } from "@/lib/books";
import { socialProfiles } from "@/lib/social";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/** Default social image (the branded card at /opengraph-image). Pages with their own card override it. */
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Kiddies Daily Devotional: 365 Daily Devotionals for Children, by Abimbola Olumuyiwa",
};

/** Trim to a search-friendly length at a word boundary. */
export function clampText(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max).replace(/\s+\S*$/, "").replace(/[,:;]$/, "") + "…";
}

const xHandle = () => {
  const url = author.social.x;
  const m = url?.match(/(?:x|twitter)\.com\/([A-Za-z0-9_]+)/);
  return m ? `@${m[1]}` : undefined;
};

/** Consistent per-page metadata: title, description, canonical, Open Graph, X/Twitter. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  absoluteTitle = false,
  book,
  article,
  ownImage = false,
}: {
  /** The page folder has its own opengraph-image.tsx card: don't set a default image here. */
  ownImage?: boolean;
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  /** Use the title exactly as written (no " | Abimbola Olumuyiwa" suffix). */
  absoluteTitle?: boolean;
  /** Marks the page as a book (og:type=book with ISBN, author, release date). */
  book?: Book;
  /** Marks the page as an article (og:type=article with publish date). */
  article?: { publishedTime?: string | null };
}): Metadata {
  const desc = clampText(description);
  const img = image ?? DEFAULT_OG_IMAGE;
  const ogTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const typeFields = book
    ? {
        type: "book" as const,
        authors: [absoluteUrl("/about")],
        ...(book.isbn && { isbn: book.isbn.replace(/-/g, "") }),
        ...(book.publicationDate && { releaseDate: book.publicationDate }),
        tags: [book.category, ...(book.series ? [book.series.name] : [])],
      }
    : article
      ? { type: "article" as const, authors: [absoluteUrl("/about")], ...(article.publishedTime && { publishedTime: article.publishedTime }) }
      : { type: "website" as const };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      ...typeFields,
      title: ogTitle,
      description: desc,
      url: path,
      siteName: site.name,
      locale: site.locale,
      ...(!ownImage && { images: [img] }),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      // Without twitter:image, X uses og:image (which the page's own card provides).
      ...(!ownImage && { images: [{ url: img.url, alt: img.alt }] }),
      ...(xHandle() && { creator: xHandle(), site: xHandle() }),
    },
  };
}

/** Search title/description for a book page: `seo` from books.ts if set, otherwise written from the data. */
export function bookSeo(book: Book): { title: string; description: string; absoluteTitle: boolean } {
  const count = book.devotionalCount ? `${book.devotionalCount} daily devotionals for kids` : null;
  const auto = book.series
    ? {
        title: `${book.series.name} Volume ${book.series.volume} | Children's Devotional`,
        description: `Volume ${book.series.volume} of ${book.series.name} by ${book.author}: ${count ?? "daily devotionals for kids"}, each with a Bible memory verse, story, illustration and prayer.`,
        absoluteTitle: true,
      }
    : {
        title: `${book.title}${book.subtitle && book.title.length + book.subtitle.length < 40 ? `: ${book.subtitle}` : ""}`,
        description: `${book.title}${book.subtitle ? `: ${book.subtitle}` : ""} by ${book.author}. ${book.shortDescription}`,
        absoluteTitle: false,
      };
  return {
    title: book.seo?.title ?? auto.title,
    description: book.seo?.description ?? auto.description,
    absoluteTitle: book.seo?.title ? true : auto.absoluteTitle,
  };
}

const sameAs = () => socialProfiles().map((p) => p.url);

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/#author"),
    name: author.name,
    url: site.url,
    jobTitle: "Author",
    description: author.shortBio,
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
    inLanguage: "en",
    author: { "@id": absoluteUrl("/#author") },
    publisher: { "@id": absoluteUrl("/#author") },
  };
}

const priceNumber = (p: string | null) => (p ? p.replace(/[^0-9.]/g, "") : null);
const FORMAT_SCHEMA: Record<string, string> = {
  Hardcover: "https://schema.org/Hardcover",
  Paperback: "https://schema.org/Paperback",
  Kindle: "https://schema.org/EBook",
  eBook: "https://schema.org/EBook",
  Audiobook: "https://schema.org/AudiobookFormat",
};

export function bookSchema(book: Book) {
  const price = priceNumber(displayPrice(book));
  const offers = purchaseLinks(book).map((l) => ({
    "@type": "Offer",
    url: l.url,
    seller: { "@type": "Organization", name: l.name },
    ...(price && { price, priceCurrency: "USD" }),
  }));
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": absoluteUrl(`/books/${book.slug}#book`),
    name: book.title,
    url: absoluteUrl(bookHref(book)),
    author: { "@type": "Person", "@id": absoluteUrl("/#author"), name: book.author },
    description: book.description[0] ?? book.shortDescription,
    genre: book.category,
    inLanguage: "en",
    ...(book.devotionalCount && { audience: { "@type": "PeopleAudience", audienceType: "Children and families" } }),
    ...(book.cover && { image: absoluteUrl(book.cover.src) }),
    ...(book.isbn && { isbn: book.isbn }),
    ...(book.publisher && { publisher: { "@type": "Organization", name: book.publisher } }),
    ...(book.publicationDate && { datePublished: book.publicationDate }),
    ...(book.pages && { numberOfPages: book.pages }),
    ...(book.series && { isPartOf: { "@type": "BookSeries", name: book.series.name } }),
    ...(book.formats.length && { bookFormat: book.formats.map((f) => FORMAT_SCHEMA[f.format] ?? f.format) }),
    ...(offers.length && { offers }),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: "en",
    ...(post.date && { datePublished: post.date }),
    // The post's own photo, or its branded share card.
    image: absoluteUrl(post.image?.src ?? `/blog/${post.slug}/opengraph-image/card`),
    ...(post.excerpt && { description: clampText(post.excerpt) }),
    author: { "@type": "Person", "@id": absoluteUrl("/#author"), name: author.name, url: absoluteUrl("/about") },
    publisher: { "@type": "Person", "@id": absoluteUrl("/#author"), name: author.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}
