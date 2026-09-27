import { musicCard, musicCardAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = musicCardAlt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return musicCard();
}

export const dynamic = "force-static";
