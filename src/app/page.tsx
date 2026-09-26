import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { books, kddVolumes, bookHref } from "@/lib/books";
import { getRecentPosts } from "@/lib/posts";
import { getLatestVideos, youtubeChannelUrl } from "@/lib/youtube";
import { bookSchema, pageMetadata, personSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { JourneyNav } from "@/components/kdd/JourneyNav";
import { KddDiscover } from "@/components/kdd/KddDiscover";
import { FormatSection } from "@/components/kdd/FormatSection";
import { PerfectFor } from "@/components/kdd/PerfectFor";
import { VolumeSet } from "@/components/kdd/VolumeSet";
import { GiftCta } from "@/components/kdd/GiftCta";
import { BookPreview } from "@/components/books/BookPreview";
import { BookCover } from "@/components/books/BookCover";
import { SectionHeading } from "@/components/SectionHeading";
import { DailyParts } from "@/components/DailyParts";
import { AuthorSection } from "@/components/AuthorSection";
import { Testimonials } from "@/components/Testimonials";
import { BlogCard } from "@/components/BlogCard";
import { YouTubeSection } from "@/components/YouTubeSection";
import { Newsletter } from "@/components/forms/Newsletter";
import { MusicTeaser } from "@/components/music/MusicTeaser";
import { Button } from "@/components/ui/Button";
import blogStyles from "@/components/BlogCard.module.css";
import styles from "./home.module.css";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({ title: site.seo.title, description: site.seo.description, path: "/", absoluteTitle: true, ownImage: true });

export default async function HomePage() {
  const [posts, videos] = await Promise.all([getRecentPosts(3), getLatestVideos(3)]);
  const also = books.builtForMore;

  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema(), ...kddVolumes.map(bookSchema)]} />

      {/* Personal welcome + the books, visible immediately */}
      <Hero />

      {/* ================= The book journey: Discover → Understand → Preview → Buy ================= */}
      <div className={styles.journey}>
        <JourneyNav />

        {/* 01 Discover */}
        <KddDiscover step="discover" eyebrow="Step 1 · Discover" />

        {/* 02 Understand */}
        <FormatSection step="understand" eyebrow="Step 2 · Understand" />
        <section data-step="understand" className={`section ${styles.inside}`} aria-labelledby="inside-title">
          <div className="container">
            <SectionHeading
              id="inside-title"
              eyebrow="A day inside the book"
              title="Five parts to every devotional"
              intro="A simple, repeatable rhythm children can follow each day, on their own or with you beside them."
            />
            <DailyParts />
          </div>
        </section>
        <PerfectFor step="understand" />

        {/* 03 Preview */}
        <BookPreview books={kddVolumes} step="preview" eyebrow="Step 3 · Preview" nextHref="#buy" />
        <Testimonials hideWhenEmpty />

        {/* 04 Buy */}
        <VolumeSet step="buy" eyebrow="Step 4 · Buy" />
      </div>

      {/* ================= Getting to know Abimbola ================= */}
      <AuthorSection />

      {/* Also by the author (kept deliberately light) */}
      <section className="section-tight" aria-labelledby="also-title">
        <div className="container">
          <div className={styles.also} data-reveal>
            <Link href={bookHref(also)} className={styles.alsoCover} tabIndex={-1} aria-hidden="true">
              <BookCover book={also} sizes="140px" />
            </Link>
            <div className={styles.alsoBody}>
              <span className="eyebrow">Also by Abimbola</span>
              <h2 id="also-title" className={styles.alsoTitle}>
                {also.title}
                {also.subtitle && <span className={styles.alsoSub}>{also.subtitle}</span>}
              </h2>
              <p className={styles.alsoText}>{also.shortDescription}</p>
              <Button href={bookHref(also)} variant="secondary" size="sm" pill>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Music: another creative expression, kept below the book content */}
      <MusicTeaser />

      {posts.length > 0 && (
        <section className="section" aria-labelledby="journal-title">
          <div className="container">
            <SectionHeading
              id="journal-title"
              align="left"
              eyebrow="The Journal"
              title={
                <>
                  From My <em>Journal</em>
                </>
              }
              intro="Reflections on faith, growth, and the books that shape me."
              action={
                <Button href="/blog" variant="secondary" pill>
                  View all posts
                </Button>
              }
            />
            <div className={blogStyles.grid}>
              {posts.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {youtubeChannelUrl && <YouTubeSection videos={videos} />}

      {/* Warm closing invitation */}
      <GiftCta />

      <Newsletter />
    </>
  );
}
