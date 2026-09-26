import type { ReactNode } from "react";

/**
 * A reminder about missing content, visible ONLY in local development
 * (`npm run dev`). It never renders in a production build.
 */
export function DevNote({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <p
      role="note"
      style={{
        margin: "var(--space-3) 0 0",
        padding: "6px 10px",
        fontSize: "12px",
        lineHeight: 1.4,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        color: "#7a4b00",
        background: "#fff6dd",
        border: "1px dashed #e0b44c",
        borderRadius: 8,
        textAlign: "left",
      }}
    >
      ✎ Placeholder: {children}
    </p>
  );
}
