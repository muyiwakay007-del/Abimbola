/**
 * ============================================================
 *  CONTENT TYPES: the shape of everything in src/content/.
 * ============================================================
 *  You normally don't need to edit this file. It exists so that
 *  a typo or missing field in a content file is caught by the
 *  editor / build instead of breaking a page.
 *
 *  Conventions:
 *    • `null` means "not available yet": the site hides that item
 *      (or shows a tasteful placeholder). Never put "" or "TBD".
 *    • Dates are ISO strings: "2026-06-15".
 *    • Images live in /public, so "/images/books/cover.jpg" means
 *      public/images/books/cover.jpg.
 */

/* ---------------------------------- Images --------------------------------- */

export type Image = {
  /** Path under /public, e.g. "/images/books/my-book.jpg". */
  src: string;
  /** Describe the image for screen readers and search engines. */
  alt: string;
  /** Pixel size of the file (used to reserve space and avoid layout jumps). */
  width: number;
  height: number;
  /** Optional caption shown under gallery images. */
  caption?: string;
};

/* ---------------------------------- Author --------------------------------- */

export type SocialLinks = {
  youtube: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  tiktok: string | null;
  x: string | null;
  /** Any other profiles, e.g. { label: "Goodreads", url: "https://…" }. */
  other: { label: string; url: string }[];
};

export type Author = {
  name: string;
  firstName: string;
  /** Short line under the logo, e.g. "Evolving • Impacting". */
  tagline: string;
  /** One or two sentences for the footer and search results. */
  shortBio: string;
  /** Opening paragraph for the About page and "Meet Abimbola". */
  intro: string;
  /** Longer biography, one string per paragraph. Leave [] to hide. */
  bio: string[];
  /** The About page's "My story" section, shown exactly as written (one string per paragraph). */
  myStory: string[];
  /** Topics you write about (small tags). */
  themes: string[];
  /** Portrait. `focus` is the CSS object-position used when it's cropped. */
  photo: (Image & { focus?: string }) | null;
  /** Public contact email. null hides it. */
  email: string | null;
  social: SocialLinks;
  youtube: {
    /** Channel id (from the channel URL) used to pull your latest videos. null hides the video grid. */
    channelId: string | null;
    /** Pin these video ids to the front. */
    featuredVideoIds: string[];
    /** Never show these video ids. */
    hiddenVideoIds: string[];
  };
};

/* ---------------------------------- Books ---------------------------------- */

export type BookFormat = {
  /** "Paperback", "Hardcover", "Kindle", "Audiobook"… */
  format: string;
  /** Display price, e.g. "$26.99". null shows "See price at retailer". */
  price: string | null;
};

export type Retailers = {
  amazon: string | null;
  barnesNoble: string | null;
  appleBooks: string | null;
  bookshop: string | null;
  /** Anything else, e.g. { name: "Christianbook", url: "https://…" }. */
  other: { name: string; url: string }[];
};

/**
 * Where "Read a Sample" goes:
 *   { kind: "preview" }                       the book's own "Peek Inside" pages on this site (previewImages)
 *   { kind: "amazon-look-inside" }            uses the book's Amazon link (retailers.amazon)
 *   { kind: "pdf",  url: "/samples/v1.pdf" }  a PDF you put in /public/samples
 *   { kind: "link", url: "https://…" }        any other preview page
 */
export type BookSample = { kind: "preview" } | { kind: "amazon-look-inside" } | { kind: "pdf" | "link"; url: string };

export type Book = {
  /** URL segment: the book's page is /books/<slug>. Must be unique. */
  slug: string;
  /** false hides the book everywhere without deleting it. */
  visible: boolean;
  /** "coming-soon" shows a "Get notified" button instead of buy buttons. */
  status: "available" | "coming-soon";

  title: string;
  /** Shorter label for tight spaces, e.g. "Volume 1". */
  shortTitle: string;
  subtitle: string | null;
  author: string;
  /** For books in a series (Kiddies Daily Devotional volumes). */
  series: { name: string; volume: number } | null;
  /** Shown as a small label, e.g. "Children's Devotional". */
  category: string;
  /** Optional ribbon on the cover, e.g. "New Release". */
  tag: string | null;

  /** null shows an elegant "cover coming soon" placeholder. */
  cover: Image | null;
  /** One or two sentences for cards. */
  shortDescription: string;
  /** Full description, one string per paragraph. */
  description: string[];

  /** Formats and prices. The first priced format is the headline price. */
  formats: BookFormat[];
  isbn: string | null;
  publisher: string | null;
  /** ISO date, e.g. "2021-11-17". */
  publicationDate: string | null;
  pages: number | null;
  readingAge: string | null;
  dimensions: string | null;
  /** Number of daily devotionals (devotional books only). */
  devotionalCount: number | null;

  /** Where to buy. Each non-null link becomes a button; none = no buy buttons. */
  retailers: Retailers;
  /** A sample to read. null hides every "Read a Sample" button for this book. */
  sample: BookSample | null;
  /** Interior pages / spreads for the "Peek Inside" gallery. */
  previewImages: Image[];
  /**
   * Optional search-result title/description for this book's page.
   * Leave out to have them written automatically from the fields above.
   */
  seo?: { title?: string; description?: string };
};

/* ----------------------------------- Blog ---------------------------------- */

export type BlogCategory = "blog" | "book-review";

export type BlogPost = {
  /** Internal id (kept for posts imported from WordPress). Leave out for new posts. */
  id?: number;
  slug: string;
  title: string;
  /** ISO date or datetime. */
  date: string | null;
  category: BlogCategory;
  image: { src: string; alt: string } | null;
  /** Short summary for cards and search results. Generated from content if null. */
  excerpt: string | null;
  /** The post body as HTML (paragraphs as <p>…</p>). */
  content: string;
};

/* ------------------------------- Testimonials ------------------------------ */

export type Testimonial = {
  quote: string;
  /** How the reader wants to be credited, e.g. "Sarah O." */
  name: string;
  /** Relationship or role, e.g. "Mum of two", "Children's pastor". */
  role: string;
  /** Optional photo path under /public. */
  image?: string | null;
  /** Optional 1–5 rating. */
  rating?: number | null;
  /** Tie the review to one book's slug (shows on that book's pages). */
  bookSlug?: string | null;
};

/* ----------------------------------- Music --------------------------------- */

/**
 * Where a song is in its life:
 *   COMING_SOON  announced, nothing to hear yet       → "Coming Soon"
 *   UNRELEASED   finished, not yet on streaming sites → "Unreleased" (a preview may be shown)
 *   RELEASED     out now                              → "Listen Now" + streaming links
 */
export type MusicStatus = "COMING_SOON" | "UNRELEASED" | "RELEASED";

export type MusicRelease = {
  /** Unique id used in links, e.g. "my-song". */
  slug: string;
  /** false hides the release everywhere without deleting it. */
  visible: boolean;
  status: MusicStatus;
  /** Song or project title. null shows "New Music" (never invent a title). */
  title: string | null;
  artist: string;
  /** Square artwork. null shows an elegant placeholder. */
  cover: Image | null;
  description: string | null;
  /** ISO date. null hides the date. */
  releaseDate: string | null;
  /** A short audio preview. null hides the player (no broken players). */
  audioPreview: { src: string; type?: "audio/mpeg" | "audio/wav" | "audio/mp4" | "audio/ogg" } | null;
  lyricsUrl: string | null;
  youtubeUrl: string | null;
  spotifyUrl: string | null;
  appleMusicUrl: string | null;
  /** Any other platform, e.g. { name: "Audiomack", url: "https://…" }. */
  otherLinks: { name: string; url: string }[];
};
