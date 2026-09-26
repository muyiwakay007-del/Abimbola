import { Icon } from "@/components/ui/Icon";
import { socialProfiles } from "@/lib/social";

/** Round icon links for the author's social profiles. */
export function SocialLinks({ tone = "dark", size = 20 }: { tone?: "dark" | "light"; size?: number }) {
  const profiles = socialProfiles();
  if (!profiles.length) return null;

  const color = tone === "light" ? "#fff" : "var(--brand-strong)";
  const bg = tone === "light" ? "rgba(255,255,255,0.1)" : "var(--surface-soft)";

  return (
    <ul style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)", listStyle: "none", margin: 0, padding: 0 }}>
      {profiles.map((p) => (
        <li key={p.url}>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.label} (opens in a new tab)`}
            title={p.label}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", color, background: bg }}
          >
            <Icon name={p.icon} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
