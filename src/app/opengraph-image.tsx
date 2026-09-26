import { kddCard, kddCardAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

// Default share card (home page): Kiddies Daily Devotional, 365 Daily Devotionals for Children, Abimbola Olumuyiwa.
export const alt = kddCardAlt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return kddCard();
}
