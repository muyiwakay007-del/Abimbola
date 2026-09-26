import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="section" style={{ background: "var(--gradient-soft)", textAlign: "center" }}>
      <div className="container container-narrow">
        <span className="eyebrow">404</span>
        <h1 style={{ fontSize: "var(--text-display)", margin: "var(--space-3) 0" }}>This page wandered off</h1>
        <p className="lead" style={{ margin: "0 auto var(--space-6)", maxWidth: "46ch" }}>
          The page you&apos;re looking for isn&apos;t here, but there&apos;s plenty to explore.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", justifyContent: "center" }}>
          <Button href="/" pill>
            Go home
          </Button>
          <Button href="/books/kiddies-daily-devotional" variant="secondary" pill>
            Kiddies Daily Devotional
          </Button>
          <Button href="/blog" variant="ghost">
            Read the journal →
          </Button>
        </div>
      </div>
    </section>
  );
}
