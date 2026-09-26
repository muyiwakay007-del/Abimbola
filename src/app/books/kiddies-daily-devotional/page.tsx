import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { author } from "@/content/author";
import { kddSeries, kddVolumes, bookHref, primaryPurchase, sampleLink, kddFacts, kddTotalDevotionals, kddVolumesLabel, kddRetailerNames, formatsLabel, type Book } from "@/lib/books";
import { pageMetadata, bookSchema, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { BookCover } from "@/components/books/BookCover";
import { BookPurchaseButton } from "@/components/books/BookPurchaseButton";
import { SectionHeading } from "@/components/SectionHeading";
import { PerfectFor } from "@/components/kdd/PerfectFor";
import { DailyParts } from "@/components/DailyParts";
import { AuthorPortrait } from "@/components/AuthorSection";
import { Testimonials } from "@/components/Testimonials";
import { VolumeSet } from "@/components/kdd/VolumeSet";
import { CompareVolumes } from "@/components/kdd/CompareVolumes";
import { PeekInside } from "@/components/kdd/PeekInside";
import { WhereToBuy } from "@/components/kdd/WhereToBuy";
import { StickyBuyBar } from "@/components/kdd/StickyBuyBar";
import { GiftCta } from "@/components/kdd/GiftCta";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { DevNote } from "@/components/ui/DevNote";
import styles from "@/components/kdd/landing.module.css";

const { landing } = kddSeries;
const vol = (b: Book) => b.series?.volume ?? 0;

// The share image comes from ./opengraph-image.tsx in this folder.
export const metadata = pageMetadata({ ...kddSeries.seo, path: kddSeries.path, absoluteTitle: true, ownImage: true });

const partIcons: Record<string, IconName> = { topic: "topic", verse: "verse", narration: "narration", illustration: "illustration", prayer: "prayer" };

export default function KddLandingPage() {
  const [v1, v2] = kddVolumes;
  const retailers = kddRetailerNames();
  const hasSample = kddVolumes.some((b) => sampleLink(b));
  const previewImages = kddVolumes.flatMap((b) => b.previewImages.map((img) => ({ ...img, volume: `Volume ${vol(b)}` })));

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BookSeries",
            "@id": absoluteUrl(`${kddSeries.path}#series`),
            name: kddSeries.name,
            url: absoluteUrl(kddSeries.path),
            description: landing.shortDescription,
            author: { "@type": "Person", "@id": absoluteUrl("/#author"), name: author.name },
            inLanguage: "en",
            hasPart: kddVolumes.map((b) => ({ "@id": bookSchema(b)["@id"] })),
          },
          ...kddVolumes.map(bookSchema),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Books", path: "/books" },
            { name: kddSeries.name, path: kddSeries.path },
          ]),
        ]}
      />

      {/* ============ Top: cover, title, author, CTAs ============ */}
      <section id="kdd-hero" className={styles.hero} aria-labelledby="kdd-title">
        <div className="container">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <ol>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/books">Books</Link></li>
              <li aria-current="page">{kddSeries.name}</li>
            </ol>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroCovers}>
              <div className={styles.heroGlow} aria-hidden="true" />
              <Link href={bookHref(v1)} className={`${styles.heroBook} ${styles.heroBookOne}`} aria-label={`${v1.title}: details`}>
                <BookCover book={v1} sizes="(max-width: 900px) 58vw, 360px" preload tilt />
              </Link>
              <Link href={bookHref(v2)} className={`${styles.heroBook} ${styles.heroBookTwo}`} aria-label={`${v2.title}: details`}>
                <BookCover book={v2} sizes="(max-width: 900px) 58vw, 360px" preload tilt />
              </Link>
            </div>

            <div className={styles.heroCopy}>
              <span className="eyebrow">Children&apos;s Devotional</span>
              <h1 id="kdd-title" className={styles.title}>
                {kddSeries.name}
              </h1>
              <p className={styles.volumes}>
                {kddVolumes.map((b, i) => (
                  <Fragment key={b.slug}>
                    {i > 0 && <span aria-hidden="true">&amp;</span>}
                    <span className={vol(b) === 2 ? styles.volTwo : styles.volOne}>Volume {vol(b)}</span>
                  </Fragment>
                ))}
              </p>
              <Link href="/about" className={styles.byline}>
                {author.photo && (
                  <Image src={author.photo.src} alt="" width={44} height={44} className={styles.avatar} style={{ objectPosition: author.photo.focus }} />
                )}
                <span>
                  by <strong>{author.name}</strong>
                </span>
              </Link>
              <p className={styles.headline}>{landing.headline}</p>
              <p className={styles.short}>{landing.shortDescription}</p>

              <div className={styles.heroCtas}>
                {kddVolumes.map((b) => {
                  const buy = primaryPurchase(b);
                  return (
                    buy && (
                      <BookPurchaseButton
                        key={b.slug}
                        retailer={buy.retailer}
                        url={buy.url}
                        label={`Buy Volume ${vol(b)}`}
                        variant={vol(b) === 2 ? "accent" : "primary"}
                        size="lg"
                      />
                    )
                  );
                })}
                {hasSample && (
                  <Button href="#peek-inside" variant="secondary" size="lg" pill>
                    <Icon name="eye" size={20} /> Read a Sample
                  </Button>
                )}
              </div>
              <p className={styles.heroNote}>
                {retailers.length > 0 && <>Available on {retailers.join(" & ")} in {formatsLabel(kddVolumes).toLowerCase()}. </>}
                <a href="#where-to-buy">All buying options</a>
              </p>
            </div>
          </div>

          <dl className={styles.facts}>
            {kddFacts().map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ Book overview ============ */}
      <section id="overview" className="section" aria-labelledby="overview-title">
        <div className={`container ${styles.overview}`}>
          <div className={styles.bigStat} data-reveal>
            <span className={styles.statNum}>{kddTotalDevotionals}</span>
            <span className={styles.statLabel}>daily devotionals</span>
            <span className={styles.statSplit}>
              {kddVolumes.map((b) => (
                <span key={b.slug} className={vol(b) === 2 ? styles.splitPlum : styles.splitTeal}>
                  Volume {vol(b)} · {b.devotionalCount}
                </span>
              ))}
            </span>
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <span className="eyebrow">Book Overview</span>
            <h2 id="overview-title" className={styles.h2}>
              A year of short, <em>joyful</em> devotions
            </h2>
            <p className="lead">{kddSeries.description[1]}</p>
            <p className={styles.includesLabel}>Each devotional includes</p>
            <ul className={styles.includes}>
              {kddSeries.dailyParts.map((p) => (
                <li key={p.key}>
                  <span className={styles.includesIcon} aria-hidden="true">
                    <Icon name={partIcons[p.key]} size={18} />
                  </span>
                  {p.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============ Author story ============ */}
      <section id="story" className={styles.story} aria-labelledby="story-title">
        <div className={`container ${styles.storyGrid}`}>
          <div data-reveal>
            <AuthorPortrait />
          </div>
          <figure className={styles.storyFigure} data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
            <span className="eyebrow">Why I Wrote It</span>
            <h2 id="story-title" className="visually-hidden">
              The author&apos;s story
            </h2>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote className={styles.storyQuote}>
              <p>{kddSeries.story}</p>
            </blockquote>
            <figcaption className={styles.storyCaption}>
              <span className={styles.signature}>{author.firstName}</span>
              <span>{author.name}, author and mum</span>
            </figcaption>
            <Link href="/about" className={styles.storyLink}>
              Read more about Abimbola <Icon name="arrow-right" size={16} />
            </Link>
          </figure>
        </div>
      </section>

      {/* ============ Both volumes ============ */}
      <VolumeSet id="volumes" eyebrow="The Two Volumes" />
      <section className={styles.compareSection} aria-label="Compare the two volumes">
        <div className="container">
          <CompareVolumes />
        </div>
      </section>

      {/* ============ Who it's for ============ */}
      <PerfectFor
        id="for"
        eyebrow="Who It's For"
        title={
          <>
            For everyone nurturing <em>a child&apos;s faith</em>
          </>
        }
        items={landing.audiences}
      />

      {/* ============ What's inside ============ */}
      <section id="inside" className={`section ${styles.inside}`} aria-labelledby="inside-title">
        <div className="container">
          <SectionHeading
            id="inside-title"
            eyebrow="What's Inside"
            title="Five parts to every devotional"
            intro="The same simple rhythm every day, so children always know what comes next."
          />
          <DailyParts />
        </div>
      </section>

      {/* ============ Peek inside ============ */}
      <section id="peek-inside" className={`section ${styles.peek}`} aria-labelledby="peek-title">
        <div className="container">
          <SectionHeading
            id="peek-title"
            eyebrow="Preview"
            title="Peek Inside"
            intro="The back covers of both volumes show illustrations from inside the book. Tap an image to view it larger."
          />
          <PeekInside images={previewImages} placeholderSlots={Math.min(3, Math.max(0, 5 - previewImages.length))} />
          <DevNote>add real interior page images to `previewImages` in src/content/books.ts; the placeholders disappear as you add them</DevNote>
          <div className={styles.peekCtas} data-reveal>
            {kddVolumes.map((b) => {
              const sample = sampleLink(b);
              return (
                sample && (
                  <Button key={b.slug} href={sample.url} external={sample.external} variant="secondary" pill>
                    <Icon name="eye" size={18} /> Read a sample of Volume {vol(b)}
                  </Button>
                )
              );
            })}
          </div>
          {kddVolumes.some((b) => sampleLink(b)?.note) && <p className={styles.peekNote}>Opens Amazon&apos;s “Look inside” preview.</p>}
        </div>
      </section>

      {/* ============ Reviews ============ */}
      <Testimonials
        id="reviews"
        title="Reader Reviews"
        bookSlugs={kddVolumes.map((b) => b.slug)}
        showSamples={false}
        emptyTitle="Reader reviews coming soon."
        emptyText="Reviews from families, teachers and ministry leaders will appear here. Has Kiddies Daily Devotional been part of your home, classroom or ministry? I'd love to hear about it."
      />

      {/* ============ Where to get the book ============ */}
      <WhereToBuy />

      {/* ============ Bottom CTA ============ */}
      <GiftCta
        href="#volumes"
        label="Explore Kiddies Daily Devotional"
        title="Make every day a little more intentional."
        text="A topic, a memory verse, a story, an illustration and a prayer: a few quiet minutes each day to open God's Word together."
      />

      <StickyBuyBar watchHidden={["volumes", "where-to-buy"]} title={kddSeries.name} subtitle={kddVolumesLabel} />
    </>
  );
}
