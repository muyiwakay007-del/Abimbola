import Link from "next/link";
import { kddSeries, kddVolumes, books } from "@/content/books";
import { pageMetadata, bookSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { FeaturedBook } from "@/components/books/FeaturedBook";
import { BookPreview } from "@/components/books/BookPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard, FeatureGrid } from "@/components/FeatureCard";
import { DailyParts } from "@/components/DailyParts";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/forms/Newsletter";
import { Button } from "@/components/ui/Button";
import styles from "../home.module.css";

export const metadata = pageMetadata({
  title: "Kiddies Daily Devotional",
  description:
    "Kiddies Daily Devotional by Abimbola Olumuyiwa: 365 daily devotionals for children with a topic, Bible memory verse, narration, illustration and prayer for every day. Volumes 1 and 2.",
  path: "/kiddies-daily-devotional",
  image: books.kddVolume1.cover ? { url: books.kddVolume1.cover.src, width: books.kddVolume1.cover.width, height: books.kddVolume1.cover.height, alt: books.kddVolume1.cover.alt } : undefined,
});

export default function KddPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BookSeries",
            name: kddSeries.name,
            description: kddSeries.summary,
            author: { "@type": "Person", name: "Abimbola Olumuyiwa" },
            hasPart: kddVolumes.map((b) => ({ "@id": bookSchema(b)["@id"] })),
          },
          ...kddVolumes.map(bookSchema),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: kddSeries.name, path: "/kiddies-daily-devotional" }]),
        ]}
      />

      <PageHeader eyebrow="The Devotional Series" title={kddSeries.name} intro={kddSeries.summary}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-3)", marginTop: "var(--space-6)" }}>
          <Button href="#featured-book" variant="primary" size="lg" pill>
            Choose a volume
          </Button>
          <Button href="#preview" variant="secondary" size="lg" pill>
            Take a peek inside
          </Button>
        </div>
      </PageHeader>

      <FeaturedBook />

      <section className="section" aria-labelledby="story-title">
        <div className={`container ${styles.why}`}>
          <div className={styles.story} data-reveal>
            <span className="eyebrow">The heart behind it</span>
            <h2 id="story-title" className={styles.whyTitle}>
              More Than a Devotional. A Daily Faith Journey.
            </h2>
            <blockquote className={styles.storyQuote}>
              <p>{kddSeries.story}</p>
              <footer className={styles.signature}>Abimbola</footer>
            </blockquote>
          </div>
          <div className="prose" data-reveal>
            {kddSeries.description.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.inside}`} aria-labelledby="inside-title">
        <div className="container">
          <SectionHeading id="inside-title" tone="light" eyebrow="What's Inside" title="Five parts to every devotional" />
          <DailyParts />
        </div>
      </section>

      <section className="section" aria-labelledby="audience-title">
        <div className="container">
          <SectionHeading id="audience-title" eyebrow="Who It's For" title="Designed for everyone nurturing a child's faith" />
          <FeatureGrid min={230}>
            <FeatureCard icon="parents" title="Parents" accent="teal">Help your child build a consistent devotional routine.</FeatureCard>
            <FeatureCard icon="school" title="Schools" accent="blue" delay={80}>A practical resource for nurturing faith and character.</FeatureCard>
            <FeatureCard icon="church" title="Churches" accent="plum" delay={160}>A useful resource for children&apos;s ministries and discipleship.</FeatureCard>
            <FeatureCard icon="heart" title="Families" accent="emerald" delay={240}>Create meaningful moments around God&apos;s Word together.</FeatureCard>
          </FeatureGrid>
          <p className={styles.bulk}>
            Also a fit for children&apos;s ministries and organizations serving children. Planning a group order?{" "}
            <Link href="/contact?topic=Book%20order%20or%20bulk%20purchase">Let&apos;s talk</Link>.
          </p>
        </div>
      </section>

      <BookPreview books={kddVolumes} />
      <Testimonials />
      <Newsletter />
    </>
  );
}
