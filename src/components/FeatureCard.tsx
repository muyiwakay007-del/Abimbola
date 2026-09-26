import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

const accents = {
  teal: { fg: "var(--caramel-700)", bg: "var(--caramel-100)" },
  plum: { fg: "var(--sage-700)", bg: "var(--sage-100)" },
  blue: { fg: "var(--brown-700)", bg: "var(--cream-300)" },
  emerald: { fg: "var(--sage-900)", bg: "var(--sage-200)" },
} as const;

export type FeatureAccent = keyof typeof accents;

/** Icon + title + short text. Used for features, audiences, and "what's inside". */
export function FeatureCard({
  icon,
  title,
  children,
  accent = "teal",
  kicker,
  delay = 0,
}: {
  icon: IconName;
  title: string;
  children: ReactNode;
  accent?: FeatureAccent;
  kicker?: string;
  delay?: number;
}) {
  const a = accents[accent];
  return (
    <article
      data-reveal
      style={{
        ["--reveal-delay" as string]: `${delay}ms`,
        height: "100%",
        padding: "var(--space-6)",
        background: "var(--surface-card)",
        border: "1px solid var(--border-card)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <span
        aria-hidden="true"
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: 16, color: a.fg, background: a.bg, marginBottom: "var(--space-4)" }}
      >
        <Icon name={icon} size={26} />
      </span>
      {kicker && (
        <p className="eyebrow" style={{ display: "block", margin: "0 0 var(--space-1)", color: a.fg }}>
          {kicker}
        </p>
      )}
      <h3 style={{ fontSize: "var(--text-h4)", margin: "0 0 var(--space-2)" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "0.975rem", lineHeight: 1.65 }}>{children}</p>
    </article>
  );
}

/** Responsive grid for FeatureCards. */
export function FeatureGrid({ children, min = 240 }: { children: ReactNode; min?: number }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-5)", gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))` }}>
      {children}
    </div>
  );
}
