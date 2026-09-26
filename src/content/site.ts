/**
 * ============================================================
 *  SITE CONFIGURATION: edit this file to update site-wide details.
 * ============================================================
 *  Anything set to `null` is a placeholder: the site hides it (or
 *  shows a tasteful fallback) until you fill it in.
 */

export const site = {
  name: "Abimbola Olumuyiwa",
  tagline: "Evolving • Impacting",
  /** Production URL: used for canonical links, sitemap and social previews. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abimbolaolumuyiwa.com",
  locale: "en_US",

  seo: {
    title: "Abimbola Olumuyiwa | Author of Kiddies Daily Devotional",
    description:
      "Abimbola Olumuyiwa is the author of Kiddies Daily Devotional: 365 daily devotionals that help children grow in faith, learn God's Word, and discover their identity in Christ. Christian children's books for families, schools and churches.",
  },

  /** Short line used in the footer and author cards. */
  shortBio:
    "Author of Kiddies Daily Devotional. A mum writing to help children and families grow in faith, one day at a time.",

  /** Contact email shown on the Contact page. Example: "hello@abimbolaolumuyiwa.com" */
  contactEmail: null as string | null,

  /**
   * Social profiles. Only links with a URL are displayed.
   * The YouTube URL comes from the current abimbolaolumuyiwa.com site.
   */
  social: {
    youtube: "https://www.youtube.com/channel/UCAEM9w3lYVw2MSkUip-QGAg",
    instagram: null as string | null,
    facebook: null as string | null,
    tiktok: null as string | null,
    x: null as string | null,
    linkedin: null as string | null,
  },

  youtube: {
    /** Channel id: used to pull your latest uploads automatically. */
    channelId: "UCAEM9w3lYVw2MSkUip-QGAg",
    /** Subscribe link (adds ?sub_confirmation=1 so YouTube shows the subscribe prompt). */
    subscribeUrl: "https://www.youtube.com/channel/UCAEM9w3lYVw2MSkUip-QGAg?sub_confirmation=1",
    /**
     * Pin specific videos to the top (YouTube video ids, e.g. "vN3fSbSz7vE").
     * Leave empty to simply show the newest uploads.
     */
    featuredVideoIds: [] as string[],
    /** Uploads to never show on the site (tests, private-feeling streams, etc.). */
    hiddenVideoIds: ["YqsSzr1LfvQ"] as string[],
  },
} as const;

/** Primary navigation: used by the navbar and footer. */
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Books", href: "/books" },
  { label: "Blog", href: "/blog" },
  { label: "Book Reviews", href: "/book-reviews" },
  { label: "YouTube", href: "/youtube" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * ============================================================
 *  AUTHOR: content for the About page and "Meet Abimbola" section.
 * ============================================================
 *  Only facts you have provided are filled in. Add your story to
 *  `bio` (one string per paragraph) and it appears automatically.
 */
export const author = {
  name: "Abimbola Olumuyiwa",
  firstName: "Abimbola",
  /** Author portrait. `focus` is the CSS object-position used when the photo is cropped. */
  photo: {
    src: "/images/author/abimbola.jpg",
    alt: "Abimbola Olumuyiwa smiling, arms folded, wearing a cream tweed jacket outdoors",
    width: 1200,
    height: 1500,
    focus: "50% 50%",
  } as { src: string; alt: string; width: number; height: number; focus?: string } | null,
  intro:
    "I'm a mum, a writer, and the author of Kiddies Daily Devotional. I wrote it because I wanted my own children to have a structured guide for their faith journey, something that would help shape their worldview and mindset from an early age.",
  /** Longer biography paragraphs for the About page. */
  bio: [] as string[],
  /** Things you write about: shown as small tags. */
  themes: ["Faith", "Family", "Personal growth", "Books that shape us"],
  /** Your "Did you know?" theme from the original site. */
  mission:
    "This little corner of the internet is a place to breathe. I write about faith, personal growth, and the books that shape me: slowly, honestly, and with a lot of hope.",
} as const;

/** Topics offered in the contact form's "What's this about?" menu. */
export const contactTopics = [
  "General",
  "Book order or bulk purchase",
  "School or church",
  "Speaking or event",
  "Review",
  "Media",
] as const;
