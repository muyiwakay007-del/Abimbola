import type { ReactNode } from "react";

type Tone = "accent" | "brand" | "muted" | "light";

const tones: Record<Tone, { fg: string; bg: string; solidBg: string }> = {
  accent: { fg: "var(--accent)", bg: "var(--surface-blossom)", solidBg: "var(--accent)" },
  brand: { fg: "var(--brand-strong)", bg: "var(--surface-soft)", solidBg: "var(--brand)" },
  muted: { fg: "var(--text-muted)", bg: "var(--gray-100)", solidBg: "var(--slate-500)" },
  light: { fg: "#fff", bg: "rgba(255,255,255,0.14)", solidBg: "rgba(255,255,255,0.2)" },
};

/** Small uppercase pill for categories and ribbons. */
export function Badge({ children, tone = "accent", solid = false }: { children: ReactNode; tone?: Tone; solid?: boolean }) {
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-xs)",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        lineHeight: 1.2,
        padding: "5px 12px",
        borderRadius: "var(--radius-pill)",
        color: solid ? "#fff" : t.fg,
        background: solid ? t.solidBg : t.bg,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
