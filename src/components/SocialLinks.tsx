import { site } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";

const labels: Record<keyof typeof site.social, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
};

/** Icon links for every social profile that has a URL in src/content/site.ts. */
export function SocialLinks({ tone = "dark", size = 20 }: { tone?: "dark" | "light"; size?: number }) {
  const entries = (Object.entries(site.social) as [keyof typeof site.social, string | null][]).filter(
    (e): e is [keyof typeof site.social, string] => Boolean(e[1])
  );
  if (!entries.length) return null;

  const color = tone === "light" ? "#fff" : "var(--brand-strong)";
  const bg = tone === "light" ? "rgba(255,255,255,0.1)" : "var(--surface-soft)";

  return (
    <ul style={{ display: "flex", gap: "var(--space-2)", listStyle: "none", margin: 0, padding: 0 }}>
      {entries.map(([key, url]) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${labels[key]} (opens in a new tab)`}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: "50%", color, background: bg }}
          >
            <Icon name={key as IconName} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
