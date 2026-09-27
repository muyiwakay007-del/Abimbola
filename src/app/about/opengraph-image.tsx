import { authorCard, authorCardAlt, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = authorCardAlt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return authorCard();
}

export const dynamic = "force-static";
