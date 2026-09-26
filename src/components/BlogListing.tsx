"use client";

import { useState, type ReactNode } from "react";
import styles from "./BlogListing.module.css";

type Filter = "all" | "blog" | "book-review";
const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "blog", label: "Blog Posts" },
  { value: "book-review", label: "Book Reviews" },
];

/**
 * Filter chips over server-rendered cards. Each card is passed in with its
 * category so the cards themselves stay server components.
 */
export function BlogListing({ items }: { items: { key: string; category: "blog" | "book-review"; card: ReactNode }[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = items.filter((i) => filter === "all" || i.category === filter);

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter posts">
        {FILTERS.map((f) => (
          <button key={f.value} type="button" className={styles.chip} aria-pressed={filter === f.value} onClick={() => setFilter(f.value)}>
            {f.label}
            <span className={styles.count}>{f.value === "all" ? items.length : items.filter((i) => i.category === f.value).length}</span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {shown.length} posts
      </p>
      <div className={styles.grid}>
        {shown.map((i) => (
          <div key={i.key}>{i.card}</div>
        ))}
      </div>
    </>
  );
}
