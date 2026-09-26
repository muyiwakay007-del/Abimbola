import type { ReactNode } from "react";
import Link from "next/link";

/** Soft gradient header for inner pages, with optional breadcrumb. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  breadcrumb?: { label: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <header style={{ position: "relative", background: "var(--gradient-soft)", paddingBlock: "clamp(3rem, 2rem + 4vw, 5.5rem)", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{ position: "absolute", width: 480, height: 480, top: -220, right: -120, borderRadius: "50%", background: "radial-gradient(circle, rgba(176, 186, 153,0.25), transparent 70%)" }}
      />
      <div className="container container-narrow" style={{ position: "relative", textAlign: "center" }}>
        {breadcrumb && (
          <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-4)", fontSize: "var(--text-sm)" }}>
            <ol style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, listStyle: "none", margin: 0, padding: 0, color: "var(--text-muted)" }}>
              {breadcrumb.map((b, i) => (
                <li key={b.href} style={{ display: "flex", gap: 8 }}>
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === breadcrumb.length - 1 ? <span aria-current="page">{b.label}</span> : <Link href={b.href}>{b.label}</Link>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 style={{ fontSize: "var(--text-display)", lineHeight: "var(--lh-tight)", margin: eyebrow ? "var(--space-3) 0 0" : 0 }}>{title}</h1>
        {intro && (
          <p className="lead" style={{ margin: "var(--space-4) auto 0", maxWidth: "58ch" }}>
            {intro}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
