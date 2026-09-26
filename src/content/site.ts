/**
 * ============================================================
 *  SITE: site-wide settings (not about you or the books).
 * ============================================================
 *  Your name, bio, photo, email and social links are in author.ts.
 *  Book details are in books.ts.
 */
import { author } from "./author";

export const site = {
  /** Shown in the logo, browser tab and search results. */
  name: author.name,
  /** Production URL: used for canonical links, sitemap and social previews. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abimbolaolumuyiwa.com",
  locale: "en_US",

  /** Home page title and description for search engines and link previews. */
  seo: {
    title: "Abimbola Olumuyiwa | Author of Kiddies Daily Devotional",
    description:
      "Kiddies Daily Devotional by Abimbola Olumuyiwa: 365 Christian devotionals for kids, each with a Bible memory verse, story, illustration and prayer.",
  },
} as const;

/**
 * Search-result titles and descriptions for each page.
 * Titles: aim for under 60 characters. Descriptions: 120 to 160 characters.
 * Book pages are set in books.ts (optional `seo` field) or written automatically.
 */
export const pageSeo = {
  about: {
    title: "About Abimbola Olumuyiwa | Christian Children's Author",
    description:
      "Meet Abimbola Olumuyiwa, a mum and writer who created Kiddies Daily Devotional to give children a structured daily faith journey from an early age.",
  },
  books: {
    title: "Christian Books for Children & Families | Abimbola Olumuyiwa",
    description:
      "Books by Abimbola Olumuyiwa: Kiddies Daily Devotional, a two-volume children's devotional, and Built for More, a guide to living a life of purpose.",
  },
  blog: {
    title: "Blog: Faith, Family & Growth | Abimbola Olumuyiwa",
    description:
      "Reflections on faith, family, personal growth and the Christian books that shape us, from author Abimbola Olumuyiwa.",
  },
  bookReviews: {
    title: "Book Reviews & Reader Testimonials | Abimbola Olumuyiwa",
    description:
      "Reader testimonials for Kiddies Daily Devotional and Abimbola Olumuyiwa's honest reviews of Christian and personal-growth books.",
  },
  youtube: {
    title: "Videos & Book News | Abimbola Olumuyiwa on YouTube",
    description:
      "Watch Abimbola Olumuyiwa's videos: Kiddies Daily Devotional news, behind-the-scenes moments and words of encouragement.",
  },
  music: {
    title: "Music | Abimbola Olumuyiwa",
    description: "Explore music and upcoming releases from Abimbola Olumuyiwa, another expression of her faith alongside her writing.",
  },
  musicUpcoming: {
    title: "Upcoming Music | Abimbola Olumuyiwa",
    description: "Upcoming and unreleased music from Abimbola Olumuyiwa. New music is on the way.",
  },
  contact: {
    title: "Contact Abimbola Olumuyiwa | Orders, Events & Media",
    description:
      "Get in touch with Abimbola Olumuyiwa about Kiddies Daily Devotional, group orders for schools and churches, events, reviews or media.",
  },
} as const;

/** Main navigation (navbar and footer). The YouTube item hides itself if no channel is set. */
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Books", href: "/books" },
  { label: "Music", href: "/music" },
  { label: "Blog", href: "/blog" },
  { label: "Book Reviews", href: "/book-reviews" },
  ...(author.social.youtube ? [{ label: "YouTube", href: "/youtube" }] : []),
  { label: "Contact", href: "/contact" },
];

/** Topics offered in the contact form's "What's this about?" menu. */
export const contactTopics = [
  "General",
  "Book order or bulk purchase",
  "School or church",
  "Speaking or event",
  "Review",
  "Media",
] as const;
