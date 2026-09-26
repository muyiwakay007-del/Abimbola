/**
 * ============================================================
 *  BOOKS: the single place to manage every book on the site.
 * ============================================================
 *  • Change a price, link, cover or description here and it updates
 *    everywhere (home page, Books page, book detail pages, SEO data).
 *  • Anything `null` / empty is a placeholder and is hidden or shown
 *    as "coming soon": nothing is invented.
 *  • Details below come from the Amazon listings. Amazon prices change
 *    from time to time: update `price` / `formats` when they do.
 *  • To add a retailer, append to `purchaseLinks`
 *    (retailer: "amazon" | "barnes-noble" | "apple-books" | "bookshop" | "other").
 *  • To add a new book, copy an entry, give it a unique `slug`, and add
 *    it to `bookOrder` at the bottom.
 */

export type Retailer = "amazon" | "barnes-noble" | "apple-books" | "bookshop" | "other";

export type PurchaseLink = {
  retailer: Retailer;
  url: string;
  /** Button text, e.g. "Buy on Amazon". */
  label: string;
  /** Optional format this link is for, e.g. "Paperback". */
  format?: string;
};

export type BookFormat = { format: string; price: string | null };

export type BookImage = { src: string; alt: string; width: number; height: number; caption?: string };

export type Book = {
  /** URL segment: /books/<slug> */
  slug: string;
  title: string;
  /** Shorter title for tight spaces, e.g. "Volume 1". */
  shortTitle: string;
  subtitle: string | null;
  series: string | null;
  volume: number | null;
  author: string;
  category: string;
  /** "available" books show purchase buttons; "coming-soon" shows a placeholder state. */
  status: "available" | "coming-soon";
  /** Small ribbon on the cover, e.g. "New Release". */
  tag: string | null;
  cover: BookImage | null;
  /** One or two sentences for cards. */
  shortDescription: string;
  /** Full description paragraphs for the detail page. */
  description: string[];
  /** Headline price shown on cards. */
  price: string | null;
  formats: BookFormat[];
  purchaseLinks: PurchaseLink[];
  /** Link to a sample PDF or preview. Leave null to fall back to "Look inside" on Amazon. */
  sampleUrl: string | null;
  /** Interior spreads / sample pages for the "Take a Peek Inside" gallery. */
  previewImages: BookImage[];
  /** Publication details shown on the detail page (publisher, pages, ISBN, date…). */
  details: { label: string; value: string }[];
  isbn: string | null;
  /** Marks entries that still need real details (shown with a hint in development). */
  placeholder?: boolean;
};

/* ------------------------------------------------------------------ */
/*  Shared Kiddies Daily Devotional copy                               */
/* ------------------------------------------------------------------ */

export const kddSeries = {
  name: "Kiddies Daily Devotional",
  slug: "kiddies-daily-devotional",
  /** From the cover. */
  coverLine: "Daily devotionals for the child with a great destiny in Christ",
  summary:
    "365 daily devotionals designed to help children grow in faith, understand God's Word, and discover their identity in Christ, one day at a time.",
  /** The author's own story. */
  story:
    "As a mum, I wanted my own children to have a structured guide for their faith journey and help shape their worldview and mindset from an early age. I decided to write a children's devotional that contains 365 unique, relatable topics alongside vibrant illustrations and practical child-friendly applications.",
  /** What every daily devotional contains. */
  dailyParts: [
    { key: "topic", title: "Topic of the Day", text: "A clear, relatable theme that sets the focus for the day." },
    { key: "verse", title: "Bible Memory Verse", text: "A short scripture to read, repeat and hide in the heart." },
    { key: "narration", title: "Narration", text: "A child-friendly explanation that connects the verse to everyday life." },
    { key: "illustration", title: "Illustration", text: "A vibrant picture that brings the lesson to life." },
    { key: "prayer", title: "Prayer of the Day", text: "A heartfelt prayer children can pray in their own words." },
  ],
  /** Published product description (as listed on Amazon). */
  description: [
    "Empower your child with daily devotions that inspire faith, love, and confidence. Each lesson is designed to build a strong foundation in God's Word, encouraging young hearts to invite Him into their lives and grow in their spiritual journey every day.",
    "Kiddies Daily Devotional is a year-long guide that helps children discover their identity in Christ, one joyful day at a time. This engaging devotional is filled with 365 short, easy-to-understand lessons, making it perfect for young readers. Each devotion features a memory verse, relatable explanations, illustrations, and heartfelt prayers, ensuring that children can connect with God in a meaningful way.",
    "The devotional promotes essential values such as faith, love, confidence, diligence, and obedience, helping children build a strong spiritual foundation. Whether read as a family or enjoyed independently, Kiddies Daily Devotional inspires a generation to live out their faith and strive to be their best selves.",
  ],
  audiences: ["Parents", "Children", "Christian families", "Schools", "Churches", "Children's ministries", "Organizations serving children"],
};

/* ------------------------------------------------------------------ */
/*  The books                                                          */
/* ------------------------------------------------------------------ */

export const books = {
  kddVolume1: {
    slug: "kiddies-daily-devotional-volume-1",
    title: "Kiddies Daily Devotional: Volume 1",
    shortTitle: "Volume 1",
    subtitle: kddSeries.coverLine,
    series: kddSeries.name,
    volume: 1,
    author: "Abimbola Olumuyiwa",
    category: "Children's Devotional",
    status: "available",
    tag: null,
    cover: {
      src: "/images/books/kiddies-daily-devotional-volume-1.jpg",
      alt: "Cover of Kiddies Daily Devotional Volume 1 by Abimbola Olumuyiwa: children gathered on a hill under a rainbow",
      width: 1000,
      height: 1000,
    },
    shortDescription:
      "The first volume: 183 engaging lessons, each with a memory verse, relatable explanation, illustration and heartfelt prayer.",
    description: kddSeries.description,
    price: null, // add the confirmed paperback price, e.g. "$24.99"
    formats: [
      { format: "Paperback", price: null },
      { format: "Hardcover", price: null },
    ],
    purchaseLinks: [
      { retailer: "amazon", label: "Buy on Amazon", format: "Paperback & Hardcover", url: "https://www.amazon.com/dp/B0H3YD19V6" },
    ],
    sampleUrl: null,
    previewImages: [
      {
        src: "/images/books/kiddies-daily-devotional-volume-1-back.jpg",
        alt: "Back cover of Kiddies Daily Devotional Volume 1 showing four interior illustrations and the book description",
        width: 600,
        height: 600,
        caption: "Volume 1: back cover with interior illustrations",
      },
    ],
    details: [
      { label: "Devotionals", value: "183 days" },
      { label: "Publisher", value: "Palmetto Publishing" },
      { label: "Published", value: "June 15, 2026" },
      { label: "Print length", value: "192 pages" },
      { label: "Reading age", value: "Baby – 12 years" },
      { label: "Dimensions", value: "8.5 × 8.5 in" },
    ],
    isbn: "979-8318821684",
  },

  kddVolume2: {
    slug: "kiddies-daily-devotional-volume-2",
    title: "Kiddies Daily Devotional: Volume 2",
    shortTitle: "Volume 2",
    subtitle: kddSeries.coverLine,
    series: kddSeries.name,
    volume: 2,
    author: "Abimbola Olumuyiwa",
    category: "Children's Devotional",
    status: "available",
    tag: "New Release",
    cover: {
      src: "/images/books/kiddies-daily-devotional-volume-2.jpg",
      alt: "Cover of Kiddies Daily Devotional Volume 2 by Abimbola Olumuyiwa: four smiling children in a bright classroom",
      width: 1200,
      height: 1200,
    },
    shortDescription:
      "The second volume completes the year: 182 engaging lessons with a memory verse, relatable explanation, illustration and heartfelt prayer.",
    description: kddSeries.description,
    price: "$26.99",
    formats: [
      { format: "Paperback", price: "$26.99" },
      { format: "Hardcover", price: null },
    ],
    purchaseLinks: [
      { retailer: "amazon", label: "Buy on Amazon", format: "Paperback & Hardcover", url: "https://www.amazon.com/dp/B0H48FJXX5" },
    ],
    sampleUrl: null,
    previewImages: [
      {
        src: "/images/books/kiddies-daily-devotional-volume-2-back.jpg",
        alt: "Back cover of Kiddies Daily Devotional Volume 2 showing four interior illustrations and the book description",
        width: 1200,
        height: 1200,
        caption: "Volume 2: back cover with interior illustrations",
      },
    ],
    details: [
      { label: "Devotionals", value: "182 days" },
      { label: "Publisher", value: "Palmetto Publishing" },
      { label: "Published", value: "June 15, 2026" },
      { label: "Print length", value: "192 pages" },
      { label: "Reading age", value: "Baby – 12 years" },
      { label: "Dimensions", value: "8.5 × 8.5 in" },
    ],
    isbn: "979-8318839863",
  },

  builtForMore: {
    slug: "built-for-more",
    title: "Built for More",
    shortTitle: "Built for More",
    subtitle: "Living a life of purpose in a crazy world",
    series: null,
    volume: null,
    author: "Abimbola Olumuyiwa",
    category: "Christian Living",
    status: "available",
    tag: null,
    cover: {
      src: "/images/books/built-for-more.jpg",
      alt: "Cover of Built for More: Living a life of purpose in a crazy world by Abimbola Olumuyiwa: an open road stretching toward distant hills",
      width: 980,
      height: 1500,
    },
    shortDescription:
      "A faith-filled guide to life's biggest questions (why am I here, and what was I born to do?) and to discovering your God-given purpose.",
    description: [
      "At some point in our lives, we'll all ask ourselves salient questions like: why am I on earth? What was I born to do? What's my purpose? How do I live a fulfilling life? Can I live an extraordinary life? Isn't there more to life than this rat race I didn't ask for?",
      "Let's face it; these are somewhat tough questions. Yet, the answers to these questions are so important that they define our very essence. Whether we know it or not, God has sent us all here for a specific purpose. We've been built for more and to face a time as this.",
      "The lessons presented in Built for More: Living a life of purpose in a crazy world are pretty simple yet incredibly effective. Don't get caught up trying to prove to people that you are worth more than they think you are. The true meaning of your life lies in strengthening your relationship with God. Do you constantly worry about how your life will turn out to be in the future? Don't worry; we all have moments when we doubt every iota of our existence. Just have faith in God and see how your life changes for the better.",
      "For devout followers of Christianity, the Bible offers valuable lessons on finding your real-life purpose. You can live a meaningful life and find your true self if you believe in God. Discover your God-given purpose now.",
    ],
    price: "$11.99",
    formats: [
      { format: "Paperback", price: "$11.99" },
      { format: "Kindle", price: "$4.99" },
    ],
    purchaseLinks: [
      { retailer: "amazon", label: "Buy on Amazon", format: "Paperback & Kindle", url: "https://www.amazon.com/dp/B09LDDDM9K" },
    ],
    sampleUrl: null,
    previewImages: [],
    details: [
      { label: "Publisher", value: "Harmony Publishing" },
      { label: "Published", value: "November 17, 2021" },
      { label: "Print length", value: "174 pages" },
      { label: "Formats", value: "Paperback, Kindle" },
    ],
    isbn: "978-9789917945",
  },

  /*
   * To add another book, copy an entry above, give it a unique key and `slug`,
   * then add it to `bookOrder` below. For a book that isn't out yet, use
   * status: "coming-soon", cover: null and placeholder: true.
   */
} satisfies Record<string, Book>;

/** Display order across the site. */
export const bookOrder: Book[] = [books.kddVolume1, books.kddVolume2, books.builtForMore];

/** The Kiddies Daily Devotional volumes. */
export const kddVolumes: Book[] = [books.kddVolume1, books.kddVolume2];

/** Books that have their own detail page (placeholders don't). */
export const publishedBooks = bookOrder.filter((b) => !b.placeholder);

export function getBook(slug: string): Book | undefined {
  return publishedBooks.find((b) => b.slug === slug);
}

export const bookHref = (b: Book) => (b.placeholder ? "/books#collection" : `/books/${b.slug}`);

/** The primary purchase link (first in the list), if any. */
export const primaryPurchase = (b: Book) => b.purchaseLinks[0] ?? null;

/**
 * Where "Read a Sample" should go: a dedicated sample if provided,
 * otherwise Amazon's "Look inside" on the listing.
 */
export function sampleLink(b: Book): { url: string; label: string; external: boolean } | null {
  if (b.sampleUrl) return { url: b.sampleUrl, label: "Read a Sample", external: /^https?:/.test(b.sampleUrl) };
  const amazon = b.purchaseLinks.find((l) => l.retailer === "amazon");
  if (amazon) return { url: amazon.url, label: "Look Inside on Amazon", external: true };
  return null;
}
