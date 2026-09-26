import { author } from "@/content/author";
import type { SocialLinks as Social } from "@/content/types";
import type { IconName } from "@/components/ui/Icon";

type Key = Exclude<keyof Social, "other">;

const NETWORKS: { key: Key; label: string; icon: IconName }[] = [
  { key: "youtube", label: "YouTube", icon: "youtube" },
  { key: "instagram", label: "Instagram", icon: "instagram" },
  { key: "facebook", label: "Facebook", icon: "facebook" },
  { key: "linkedin", label: "LinkedIn", icon: "linkedin" },
  { key: "tiktok", label: "TikTok", icon: "tiktok" },
  { key: "x", label: "X (Twitter)", icon: "x" },
];

/** Every social profile filled in under `social` in src/content/author.ts. Empty ones render nothing. */
export function socialProfiles(): { label: string; url: string; icon: IconName }[] {
  return [
    ...NETWORKS.flatMap((n) => (author.social[n.key] ? [{ label: n.label, url: author.social[n.key] as string, icon: n.icon }] : [])),
    ...author.social.other.filter((o) => o.url).map((o) => ({ label: o.label, url: o.url, icon: "external" as IconName })),
  ];
}

