/**
 * ============================================================
 *  BOOKS: the single source of truth for every book.
 * ============================================================
 *  Change something here and it updates everywhere the book appears:
 *  home page, Books page, book pages, the Kiddies Daily Devotional
 *  product page, footer, buy buttons, comparison table and the data
 *  search engines read.
 *
 *  Quick reference:
 *    Price ................ formats → price        ("$26.99", or null)
 *    Buy buttons .......... retailers → amazon / barnesNoble / appleBooks / bookshop / other
 *    "Read a Sample" ...... sample                 (null hides the button)
 *    "Peek Inside" ........ previewImages
 *    Cover ................ cover                  (null shows a placeholder)
 *    Hide a book .......... visible: false
 *
 *  Field meanings are documented in src/content/types.ts.
 *  Information here comes from the books' Amazon listings.
 */
import type { Book } from "./types";
import { kddSeries } from "./kiddies-daily-devotional";

export const books = {
  /* ------------------------------------------------------------------ */
  /*  KIDDIES DAILY DEVOTIONAL: VOLUME 1                                 */
  /* ------------------------------------------------------------------ */
  kddVolume1: {
    slug: "kiddies-daily-devotional-volume-1",
    visible: true,
    status: "available",
    title: "Kiddies Daily Devotional: Volume 1",
    shortTitle: "Volume 1",
    subtitle: kddSeries.coverLine,
    author: "Abimbola Olumuyiwa",
    series: { name: kddSeries.name, volume: 1 },
    category: "Children's Devotional",
    tag: null,
    cover: {
      src: "/images/books/kiddies-daily-devotional-volume-1.jpg",
      alt: "Cover of Kiddies Daily Devotional Volume 1 by Abimbola Olumuyiwa: children gathered on a hill under a rainbow",
      width: 1000,
      height: 1000,
    },
    shortDescription:
      "The first volume of the collection. Engaging daily lessons, each with a memory verse, relatable explanation, illustration and heartfelt prayer.",
    description: kddSeries.description,
    formats: [
      { format: "Paperback", price: null }, // add the confirmed price, e.g. "$24.99"
      { format: "Hardcover", price: null },
    ],
    isbn: "979-8318821684",
    publisher: "Palmetto Publishing",
    publicationDate: "2026-06-15",
    pages: 192,
    readingAge: "Baby – 12 years",
    dimensions: "8.5 × 8.5 in",
    devotionalCount: 183,
    retailers: {
      amazon: "https://www.amazon.com/dp/B0H3YD19V6",
      barnesNoble: null,
      appleBooks: null,
      bookshop: null,
      other: [],
    },
    sample: { kind: "amazon-look-inside" }, // uses retailers.amazon
    previewImages: [
      {
        src: "/images/books/kiddies-daily-devotional-volume-1-back.jpg",
        alt: "Back cover of Kiddies Daily Devotional Volume 1 showing four interior illustrations and the book description",
        width: 600,
        height: 600,
        caption: "Back cover with interior illustrations",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  KIDDIES DAILY DEVOTIONAL: VOLUME 2                                 */
  /* ------------------------------------------------------------------ */
  kddVolume2: {
    slug: "kiddies-daily-devotional-volume-2",
    visible: true,
    status: "available",
    title: "Kiddies Daily Devotional: Volume 2",
    shortTitle: "Volume 2",
    subtitle: kddSeries.coverLine,
    author: "Abimbola Olumuyiwa",
    series: { name: kddSeries.name, volume: 2 },
    category: "Children's Devotional",
    tag: null,
    cover: {
      src: "/images/books/kiddies-daily-devotional-volume-2.jpg",
      alt: "Cover of Kiddies Daily Devotional Volume 2 by Abimbola Olumuyiwa: four smiling children in a bright classroom",
      width: 1200,
      height: 1200,
    },
    shortDescription:
      "The second volume completes the year. More daily lessons, each with a memory verse, relatable explanation, illustration and heartfelt prayer.",
    description: kddSeries.description,
    formats: [
      { format: "Paperback", price: "$26.99" },
      { format: "Hardcover", price: null },
    ],
    isbn: "979-8318839863",
    publisher: "Palmetto Publishing",
    publicationDate: "2026-06-15",
    pages: 192,
    readingAge: "Baby – 12 years",
    dimensions: "8.5 × 8.5 in",
    devotionalCount: 182,
    retailers: {
      amazon: "https://www.amazon.com/dp/B0H48FJXX5",
      barnesNoble: null,
      appleBooks: null,
      bookshop: null,
      other: [],
    },
    sample: { kind: "amazon-look-inside" }, // uses retailers.amazon
    previewImages: [
      {
        src: "/images/books/kiddies-daily-devotional-volume-2-back.jpg",
        alt: "Back cover of Kiddies Daily Devotional Volume 2 showing four interior illustrations and the book description",
        width: 1200,
        height: 1200,
        caption: "Back cover with interior illustrations",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  SECOND BOOK: BUILT FOR MORE                                        */
  /*  (details from its Amazon listing)                                  */
  /* ------------------------------------------------------------------ */
  builtForMore: {
    slug: "built-for-more",
    visible: true,
    status: "available",
    title: "Built for More",
    shortTitle: "Built for More",
    subtitle: "Living a life of purpose in a crazy world",
    author: "Abimbola Olumuyiwa",
    series: null,
    category: "Christian Living",
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
    formats: [
      { format: "Paperback", price: "$11.99" },
      { format: "Kindle", price: "$4.99" },
    ],
    isbn: "978-9789917945",
    publisher: "Harmony Publishing",
    publicationDate: "2021-11-17",
    pages: 174,
    readingAge: null,
    dimensions: null,
    devotionalCount: null,
    retailers: {
      amazon: "https://www.amazon.com/dp/B09LDDDM9K",
      barnesNoble: null,
      appleBooks: null,
      bookshop: null,
      other: [],
    },
    sample: null, // add a sample link to show "Read a Sample" for this book
    previewImages: [],
  },

  /* ------------------------------------------------------------------ */
  /*  TEMPLATE FOR A FUTURE BOOK (hidden)                                */
  /*  Fill in what you know, leave the rest null, then set visible: true.*/
  /*  Without a cover it shows a tasteful "cover coming soon" design.    */
  /* ------------------------------------------------------------------ */
  nextBook: {
    slug: "next-book",
    visible: false,
    status: "coming-soon",
    title: "New Book",
    shortTitle: "Coming Soon",
    subtitle: null,
    author: "Abimbola Olumuyiwa",
    series: null,
    category: "Coming Soon",
    tag: "Coming Soon",
    cover: null,
    shortDescription: "Details about this book will be shared here soon.",
    description: [],
    formats: [],
    isbn: null,
    publisher: null,
    publicationDate: null,
    pages: null,
    readingAge: null,
    dimensions: null,
    devotionalCount: null,
    retailers: { amazon: null, barnesNoble: null, appleBooks: null, bookshop: null, other: [] },
    sample: null,
    previewImages: [],
  },
} satisfies Record<string, Book>;

/** The order books appear in across the site (hidden books are skipped automatically). */
export const bookOrder: Book[] = [books.kddVolume1, books.kddVolume2, books.builtForMore, books.nextBook];

/** The Kiddies Daily Devotional volumes, in order. */
export const kddVolumeList: Book[] = [books.kddVolume1, books.kddVolume2];
