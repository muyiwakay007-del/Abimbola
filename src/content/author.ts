/**
 * ============================================================
 *  AUTHOR: everything about you, in one place.
 * ============================================================
 *  Used by: the hero, "Meet Abimbola", About page, footer, contact
 *  page, social icons, YouTube section and search-engine data.
 *
 *  Set anything you don't want shown to null (or [] for lists).
 *  Social icons only appear for links that are filled in.
 */
import type { Author } from "./types";

export const author: Author = {
  name: "Abimbola Olumuyiwa",
  firstName: "Abimbola",
  tagline: "Evolving • Impacting",

  shortBio: "Author of Kiddies Daily Devotional. A mum writing to help children and families grow in faith, one day at a time.",

  intro:
    "I'm a mum, a writer, and the author of Kiddies Daily Devotional. I wrote it because I wanted my own children to have a structured guide for their faith journey, something that would help shape their worldview and mindset from an early age.",

  /** Add your longer story here, one string per paragraph. */
  bio: [],

  /** About page → "My story". One string per paragraph, shown exactly as written. */
  myStory: [
    "I'm a wife, mum, author, finance professional & song-writer. I'm on a mission to help more and more young people find their purpose in Christ and live that purpose out fully. My latest work is the Kiddies Daily Devotional collection which I originally wrote because I wanted my own children to have a structured guide for their faith journey, shaping their worldview and mindset from an early age.",
    "This little corner of the internet is a place to breathe. I write about faith, personal growth, and the books that shape me: slowly, honestly, and with a lot of hope.",
    "Whether you're just evolving or you're someone who has a desire to impact lives in the most positive way, I'm so glad you stopped by.",
  ],

  themes: ["Faith", "Family", "Personal growth", "Books that shape us"],

  photo: {
    src: "/images/author/abimbola-portrait.jpg",
    alt: "Abimbola Olumuyiwa smiling, chin resting on her hand, wearing a pink dress",
    width: 1200,
    height: 1500,
    focus: "50% 30%",
  },

  /** e.g. "hello@abimbolaolumuyiwa.com" */
  email: null,

  social: {
    youtube: "https://www.youtube.com/channel/UCAEM9w3lYVw2MSkUip-QGAg",
    linkedin: "https://www.linkedin.com/in/abimbolaolumuyiwa/",
    instagram: null,
    facebook: null,
    tiktok: null,
    x: null,
    other: [],
  },

  youtube: {
    channelId: "UCAEM9w3lYVw2MSkUip-QGAg",
    featuredVideoIds: [],
    hiddenVideoIds: ["YqsSzr1LfvQ"], // an untitled test upload ("j")
  },
};
