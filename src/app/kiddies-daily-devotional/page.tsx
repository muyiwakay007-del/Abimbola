import { kddSeries, kddVolumes, books } from "@/content/books";
import { pageMetadata, bookSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { JourneyNav } from "@/components/kdd/JourneyNav";
import { KddDiscover } from "@/components/kdd/KddDiscover";
import { FormatSection } from "@/components/kdd/FormatSection";
import { PerfectFor } from "@/components/kdd/PerfectFor";
import { VolumeSet } from "@/components/kdd/VolumeSet";
import { GiftCta } from "@/components/kdd/GiftCta";
import { BookPreview } from "@/components/books/BookPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { DailyParts } from "@/components/DailyParts";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/forms/Newsletter";
import styles from "../home.module.css";

export const metadata = pageMetadata({
  title: "Kiddies Daily Devotional",
  description:
    "Kiddies Daily Devotional by Abimbola Olumuyiwa: 365 daily devotionals for children, each with a topic, Bible memory verse, narration, illustration and prayer. Two volumes, one complete year.",
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

      <div className={styles.journey}>
        <JourneyNav />
        <KddDiscover headingLevel="h1" eyebrow="The Devotional Collection" learnHref={null} step="discover" />

        <section className="section-tight" data-step="understand" aria-labelledby="about-kdd">
          <div className="container container-read">
            <h2 id="about-kdd" style={{ fontSize: "var(--text-h2)", textAlign: "center" }}>
              About the devotional
            </h2>
            <div className="prose" data-reveal>
              {kddSeries.description.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <FormatSection step="understand" eyebrow="How It Works" />
        <section data-step="understand" className={`section ${styles.inside}`} aria-labelledby="inside-title">
          <div className="container">
            <SectionHeading id="inside-title" tone="light" eyebrow="A day inside the book" title="Five parts to every devotional" />
            <DailyParts />
          </div>
        </section>
        <PerfectFor step="understand" />

        <BookPreview books={kddVolumes} step="preview" nextHref="#buy" />
        <Testimonials hideWhenEmpty />
        <VolumeSet step="buy" eyebrow="Choose Your Volume" />
      </div>

      <GiftCta href="#buy" label="Choose Your Volume" />
      <Newsletter />
    </>
  );
}
