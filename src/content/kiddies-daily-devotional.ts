/**
 * ============================================================
 *  KIDDIES DAILY DEVOTIONAL: series wording.
 * ============================================================
 *  This file holds the *words* used to present the series on the
 *  home page and the product page (/books/kiddies-daily-devotional).
 *
 *  Facts about each volume (price, pages, ISBN, retailer links,
 *  number of devotionals, publisher, covers, samples…) are NOT here:
 *  they live once in src/content/books.ts and are read from there.
 */

export const kddSeries = {
  name: "Kiddies Daily Devotional",
  /** The product page for the whole series. */
  path: "/books/kiddies-daily-devotional",

  /** From the cover. */
  coverLine: "Daily devotionals for the child with a great destiny in Christ",
  tagline: "365 Daily Devotionals for Children",
  valueProp: "Helping children build a daily habit of engaging with God's Word.",
  summary:
    "365 daily devotionals designed to help children grow in faith, understand God's Word, and discover their identity in Christ, one day at a time.",

  /** Your story, in your words. */
  story:
    "As a mum, I wanted my own children to have a structured guide for their faith journey and help shape their worldview and mindset from an early age. I decided to write a children's devotional that contains 365 unique, relatable topics alongside vibrant illustrations and practical child-friendly applications.",

  /** Published product description (as listed on Amazon). Both volumes use it. */
  description: [
    "Empower your child with daily devotions that inspire faith, love, and confidence. Each lesson is designed to build a strong foundation in God's Word, encouraging young hearts to invite Him into their lives and grow in their spiritual journey every day.",
    "Kiddies Daily Devotional is a year-long guide that helps children discover their identity in Christ, one joyful day at a time. This engaging devotional is filled with 365 short, easy-to-understand lessons, making it perfect for young readers. Each devotion features a memory verse, relatable explanations, illustrations, and heartfelt prayers, ensuring that children can connect with God in a meaningful way.",
    "The devotional promotes essential values such as faith, love, confidence, diligence, and obedience, helping children build a strong spiritual foundation. Whether read as a family or enjoyed independently, Kiddies Daily Devotional inspires a generation to live out their faith and strive to be their best selves.",
  ],

  /** The five parts of every devotional. */
  dailyParts: [
    { key: "topic", title: "Topic of the Day", text: "A clear, relatable theme that sets the focus for the day." },
    { key: "verse", title: "Bible Memory Verse", text: "A short scripture to read, repeat and hide in the heart." },
    { key: "narration", title: "Narration", text: "A child-friendly explanation that connects the verse to everyday life." },
    { key: "illustration", title: "Illustration", text: "A vibrant picture that brings the lesson to life." },
    { key: "prayer", title: "Prayer of the Day", text: "A heartfelt prayer children can pray in their own words." },
  ],

  /** Short "useful for" pills in the featured-book section. */
  usefulFor: ["Parents", "Families", "Schools", "Churches", "Children's ministries"],

  /** "Why Parents Love This Format": describes the format, never reviews. */
  formatPoints: [
    { key: "days", title: "365 Days", text: "A devotional for every day of the year, across two volumes." },
    { key: "short", title: "Short Lessons", text: "Brief, easy-to-understand readings that fit naturally into a daily routine." },
    { key: "topics", title: "Relatable Topics", text: 'From "God, the Father" to "I Stir Up the Gift of God in Me", themes children can connect with.' },
    { key: "verse", title: "Bible Memory Verses", text: "A verse each day to read, repeat and hide in the heart." },
    { key: "illustration", title: "Illustrations", text: "Vibrant pictures that bring each lesson to life." },
    { key: "prayer", title: "Prayer", text: "A heartfelt prayer to close each day's reading." },
  ],

  /** "Perfect For" settings on the home page. */
  perfectFor: [
    { key: "home", title: "Home", text: "A simple daily rhythm for family devotions, read together or independently." },
    { key: "church", title: "Church", text: "A resource for Sunday school classes and for families to continue at home." },
    { key: "school", title: "School", text: "Short daily readings for devotion time in Christian schools and classrooms." },
    { key: "ministry", title: "Children's Ministry", text: "Ready-to-use daily content for children's ministry leaders and volunteers." },
  ],

  /** Search result + social preview text for the product page. */
  seo: {
    title: "Kiddies Daily Devotional: 365 Daily Devotionals for Children",
    description:
      "A Christian children's devotional in two volumes: 365 daily devotionals for kids, each with a topic, Bible memory verse, narration, illustration and prayer.",
  },

  /** Product page wording. */
  landing: {
    headline: "365 daily devotionals to help children grow in faith, one day at a time.",
    shortDescription:
      "A two-volume, year-long devotional for children. Each day brings a topic, a Bible memory verse, a child-friendly narration, a vibrant illustration and a prayer.",
    audiences: [
      { key: "parents", title: "Parents", text: "Help your child build a consistent devotional routine." },
      { key: "schools", title: "Schools", text: "A practical resource for nurturing faith and character." },
      { key: "churches", title: "Churches", text: "A resource for Sunday school classes and discipleship." },
      { key: "ministries", title: "Children's Ministries", text: "Ready-to-use daily content for leaders and volunteers." },
      { key: "families", title: "Christian Families", text: "Create meaningful moments around God's Word together." },
    ],
  },

  /** How each volume is introduced (label + colour). The day counts come from books.ts. */
  volumeRoles: {
    1: { label: "Start here", accent: "caramel" },
    2: { label: "Complete the year", accent: "sage" },
  } as Record<number, { label: string; accent: "caramel" | "sage" }>,
};
