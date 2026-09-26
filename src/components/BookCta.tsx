import { kddSeries, kddVolumes, primaryPurchase } from "@/lib/books";
import { BookCover } from "@/components/books/BookCover";
import { BookPurchaseButton } from "@/components/books/BookPurchaseButton";
import { Button } from "@/components/ui/Button";

/** Compact closing call-to-action for inner pages. */
export function BookCta({ title = "Start a daily faith journey with your children" }: { title?: string }) {
  const first = kddVolumes[0];
  const buy = first ? primaryPurchase(first) : null;
  if (!first) return null;
  return (
    <section className="section-tight" aria-label="Kiddies Daily Devotional">
      <div className="container">
        <div
          data-reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--space-6)",
            padding: "clamp(1.5rem, 1rem + 2vw, 3rem)",
            borderRadius: "var(--radius-xl)",
            background: "var(--gradient-blossom)",
            border: "1px solid var(--border-card)",
          }}
        >
          <div style={{ width: 150, flex: "none", marginInline: "auto" }}>
            <BookCover book={first} sizes="150px" />
          </div>
          <div style={{ flex: "1 1 320px" }}>
            <span className="eyebrow">Kiddies Daily Devotional</span>
            <h2 style={{ fontSize: "var(--text-h2)", margin: "var(--space-2) 0 var(--space-3)" }}>{title}</h2>
            <p style={{ margin: "0 0 var(--space-5)" }}>{kddSeries.summary}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
              <Button href="/books/kiddies-daily-devotional" variant="primary" pill>
                Explore the devotional
              </Button>
              {buy && <BookPurchaseButton retailer={buy.retailer} url={buy.url} variant="secondary" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
