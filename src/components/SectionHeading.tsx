import type { ReactNode } from "react";

/** Eyebrow + serif heading + optional intro, used to open every section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  as: Tag = "h2",
  id,
  tone = "dark",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  id?: string;
  tone?: "dark" | "light";
  action?: ReactNode;
}) {
  const centered = align === "center";
  const light = tone === "light";
  return (
    <div
      data-reveal
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: centered ? "center" : "space-between",
        gap: "var(--space-5)",
        marginBottom: "clamp(2rem, 1.5rem + 2vw, 3.5rem)",
        textAlign: centered ? "center" : "left",
      }}
    >
      <div style={{ maxWidth: centered ? 720 : 680, marginInline: centered ? "auto" : undefined }}>
        {eyebrow && (
          <span className="eyebrow" style={light ? { color: "var(--sage-200)" } : undefined}>
            {eyebrow}
          </span>
        )}
        <Tag
          id={id}
          className={light ? "on-dark" : undefined}
          style={{
            fontSize: Tag === "h1" ? "var(--text-display)" : "var(--text-h2)",
            margin: eyebrow ? "var(--space-3) 0 0" : 0,
            color: light ? "#fff" : undefined,
          }}
        >
          {title}
        </Tag>
        {intro && (
          <p className="lead" style={{ margin: "var(--space-4) 0 0", color: light ? "rgba(255,255,255,0.88)" : undefined }}>
            {intro}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
