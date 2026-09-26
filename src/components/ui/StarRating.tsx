/** Read-only 0–5 star rating; filled stars use the plum accent. */
export function StarRating({ value, max = 5, size = 18 }: { value: number; max?: number; size?: number }) {
  return (
    <span role="img" aria-label={`Rated ${value} out of ${max}`} style={{ display: "inline-flex", gap: 2, lineHeight: 1 }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} aria-hidden="true" style={{ fontSize: size, color: i < Math.round(value) ? "var(--accent)" : "var(--gray-300)" }}>
          ★
        </span>
      ))}
    </span>
  );
}
