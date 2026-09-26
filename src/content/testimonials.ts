/**
 * ============================================================
 *  TESTIMONIALS: real reader feedback for your books.
 * ============================================================
 *  Add genuine reviews only (with the reader's permission).
 *  Each entry:
 *    quote: the review text
 *    name: how the reader wants to be credited ("Sarah O.")
 *    role: relationship/role ("Mum of two", "Children's pastor")
 *    image: optional photo path, e.g. "/images/testimonials/sarah.jpg"
 *    rating: optional 1–5
 *    bookSlug: optional: ties the review to a specific book page
 *
 *  While this list is empty, the site shows an invitation for readers
 *  to share their experience instead of any made-up reviews.
 */

import type { Testimonial } from "./types";

export type { Testimonial };

export const testimonials: Testimonial[] = [
  // {
  //   quote: "…",
  //   name: "…",
  //   role: "Parent",
  //   rating: 5,
  //   bookSlug: "kiddies-daily-devotional-volume-1",
  // },
];

/**
 * Example cards used ONLY in local development (never in production)
 * so you can see the layout before real reviews arrive.
 */
export const sampleTestimonials: Testimonial[] = [
  { quote: "Placeholder: a parent's review of Kiddies Daily Devotional will appear here.", name: "Reader name", role: "Parent", rating: 5 },
  { quote: "Placeholder: feedback from a teacher or school will appear here.", name: "Reader name", role: "Teacher" },
  { quote: "Placeholder: a children's ministry leader's review will appear here.", name: "Reader name", role: "Children's ministry leader", rating: 5 },
];
