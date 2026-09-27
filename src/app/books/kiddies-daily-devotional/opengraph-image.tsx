import { kddCard, kddCardAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = kddCardAlt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return kddCard();
}

export const dynamic = "force-static";
