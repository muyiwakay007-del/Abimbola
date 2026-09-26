/**
 * Helpers that turn the book data in src/content/books.ts into what the
 * UI needs (buy buttons, prices, details, series facts). Components use
 * these instead of reading or repeating book facts themselves, so every
 * fact has exactly one home.
 */
import { books, bookOrder, kddVolumeList } from "@/content/books";
import { kddSeries } from "@/content/kiddies-daily-devotional";
import type { Book, Image, Retailers } from "@/content/types";

export { books, kddSeries };
export type { Book, Image as BookImage };

/* ------------------------------ Visibility ------------------------------ */

/** Books shown on the site, in display order. */
export const visibleBooks: Book[] = bookOrder.filter((b) => b.visible);

/** Visible books that have their own page (/books/<slug>). */
export const publishedBooks: Book[] = visibleBooks.filter((b) => b.status === "available");

/** Kiddies Daily Devotional volumes that are visible. */
export const kddVolumes: Book[] = kddVolumeList.filter((b) => b.visible);

export function getBook(slug: string): Book | undefined {
  return publishedBooks.find((b) => b.slug === slug);
}

export const bookHref = (b: Book) => (b.status === "available" ? `/books/${b.slug}` : "/books#collection");

/* ------------------------------- Retailers ------------------------------ */

export type RetailerKey = keyof Omit<Retailers, "other"> | "other";

export const retailerNames: Record<Exclude<RetailerKey, "other">, string> = {
  amazon: "Amazon",
  barnesNoble: "Barnes & Noble",
  appleBooks: "Apple Books",
  bookshop: "Bookshop.org",
};

export type PurchaseLink = {
  retailer: RetailerKey;
  /** Retailer display name, e.g. "Amazon". */
  name: string;
  url: string;
  /** Button text, e.g. "Buy on Amazon". */
  label: string;
};

/** Every configured retailer link for a book, in a consistent order. Empty links are skipped. */
export function purchaseLinks(b: Book): PurchaseLink[] {
  const links: PurchaseLink[] = [];
  (Object.keys(retailerNames) as (keyof typeof retailerNames)[]).forEach((key) => {
    const url = b.retailers[key];
    if (url) links.push({ retailer: key, name: retailerNames[key], url, label: `Buy on ${retailerNames[key]}` });
  });
  b.retailers.other.forEach((o) => {
    if (o.url) links.push({ retailer: "other", name: o.name, url: o.url, label: `Buy on ${o.name}` });
  });
  return b.status === "available" ? links : [];
}

/** The first configured retailer (used for the main "Buy Now" button). */
export const primaryPurchase = (b: Book): PurchaseLink | null => purchaseLinks(b)[0] ?? null;

/* -------------------------------- Samples ------------------------------- */

/** "Read a Sample" target, or null when the book has no sample (hides the button). */
export function sampleLink(b: Book): { url: string; external: boolean; note: string | null } | null {
  if (!b.sample) return null;
  if (b.sample.kind === "amazon-look-inside") {
    // Reuses the Amazon link, so there's only one URL to keep up to date.
    return b.retailers.amazon ? { url: b.retailers.amazon, external: true, note: "Opens Amazon's “Look inside” preview." } : null;
  }
  return { url: b.sample.url, external: /^https?:/.test(b.sample.url), note: null };
}

/* ---------------------------- Prices & formats --------------------------- */

/** Headline price: the first format that has a price. */
export const displayPrice = (b: Book): string | null => b.formats.find((f) => f.price)?.price ?? null;

/** "Paperback & Hardcover", "Paperback, Hardcover & Kindle"… */
export function formatsLabel(b: Book | Book[]): string {
  const list = [...new Set((Array.isArray(b) ? b : [b]).flatMap((x) => x.formats.map((f) => f.format)))];
  if (list.length <= 1) return list[0] ?? "";
  return `${list.slice(0, -1).join(", ")} & ${list[list.length - 1]}`;
}

/* -------------------------------- Details ------------------------------- */

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

/** Label/value rows for the "Book details" panel. Empty fields are left out. */
export function bookDetails(b: Book): { label: string; value: string }[] {
  const rows: [string, string | null][] = [
    ["Author", b.author],
    ["Series", b.series ? `${b.series.name}, Volume ${b.series.volume}` : null],
    ["Devotionals", b.devotionalCount ? `${b.devotionalCount} days` : null],
    ["Publisher", b.publisher],
    ["Published", b.publicationDate ? formatDate(b.publicationDate) : null],
    ["Print length", b.pages ? `${b.pages} pages` : null],
    ["Formats", b.formats.length ? formatsLabel(b) : null],
    ["Reading age", b.readingAge],
    ["Dimensions", b.dimensions],
    ["ISBN-13", b.isbn],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1])).map(([label, value]) => ({ label, value }));
}

/* ------------------------ Kiddies Daily Devotional ------------------------ */

/** Total devotionals across the visible volumes (e.g. 183 + 182 = 365). */
export const kddTotalDevotionals = kddVolumes.reduce((n, b) => n + (b.devotionalCount ?? 0), 0);

const common = <T,>(values: T[]): T | null => (values.length && values.every((v) => v === values[0]) ? values[0] : null);

/** Series facts derived from the volumes (so they never drift out of sync). */
export function kddFacts(): { label: string; value: string }[] {
  const pages = common(kddVolumes.map((b) => b.pages));
  const age = common(kddVolumes.map((b) => b.readingAge));
  const publisher = common(kddVolumes.map((b) => b.publisher));
  const year = common(kddVolumes.map((b) => b.publicationDate?.slice(0, 4) ?? null));
  const rows: [string, string | null][] = [
    ["Devotionals", kddTotalDevotionals ? `${kddTotalDevotionals} in ${kddVolumes.length} volumes` : null],
    ["Print length", pages ? `${pages} pages per volume` : null],
    ["Reading age", age],
    ["Formats", formatsLabel(kddVolumes) || null],
    ["Publisher", publisher ? `${publisher}${year ? `, ${year}` : ""}` : null],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1])).map(([label, value]) => ({ label, value }));
}

/** Compact facts line, e.g. "2 volumes · 365 devotionals · 192 pages each · …". */
export function kddQuickFacts(): string[] {
  const pages = common(kddVolumes.map((b) => b.pages));
  const age = common(kddVolumes.map((b) => b.readingAge));
  return [
    `${kddVolumes.length} volumes`,
    kddTotalDevotionals ? `${kddTotalDevotionals} devotionals` : null,
    pages ? `${pages} pages each` : null,
    age ? `Ages ${age.replace(/ years?$/, "").toLowerCase()}` : null,
    formatsLabel(kddVolumes) || null,
  ].filter((x): x is string => Boolean(x));
}

/** Retailers that sell at least one volume, e.g. "Amazon" or "Amazon & Barnes & Noble". */
export function kddRetailerNames(): string[] {
  return [...new Set(kddVolumes.flatMap((b) => purchaseLinks(b).map((l) => l.name)))];
}

/** "Volumes 1 & 2" (follows whichever volumes are visible). */
export const kddVolumesLabel = (() => {
  const nums = kddVolumes.map((b) => b.series?.volume).filter(Boolean);
  if (nums.length <= 1) return nums.length ? `Volume ${nums[0]}` : "";
  return `Volumes ${nums.slice(0, -1).join(", ")} & ${nums[nums.length - 1]}`;
})();
