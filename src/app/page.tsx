import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { bookOrder, kddSeries, kddVolumes } from "@/content/books";
import { getRecentPosts } from "@/lib/posts";
import { getLatestVideos } from "@/lib/youtube";
import { bookSchema, pageMetadata, personSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { FeaturedBook } from "@/components/books/FeaturedBook";
import { BookCard } from "@/components/books/BookCard";
import { BookPreview } from "@/components/books/BookPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard, FeatureGrid } from "@/components/FeatureCard";
import { DailyParts } from "@/components/DailyParts";
import { AuthorSection } from "@/components/AuthorSection";
import { Testimonials } from "@/components/Testimonials";
import { BlogCard } from "@/components/BlogCard";
import { YouTubeSection } from "@/components/YouTubeSection";
import { Newsletter } from "@/components/forms/Newsletter";
import { Button } from "@/components/ui/Button";
import bookStyles from "@/components/books/books.module.css";
import blogStyles from "@/components/BlogCard.module.css";
import styles from "./home.module.css";

export const revalidate = 3600;

export const metadata: Metadata = {
  ...pageMetadata({ title: site.seo.title, description: site.seo.description, path: "/" }),
  title: { absolute: site.seo.title },
};

export default async function HomePage() {
  const [posts, videos] = await Promise.all([getRecentPosts(3), getLatestVideos(3)]);

  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema(), ...kddVolumes.map(bookSchema)]} />

      {/* 2: Hero */}
      <Hero />

      {/* 3: Featured book */}
      <FeaturedBook />

      {/* 4: Why Kiddies Daily Devotional */}
      <section className="section" aria-labelledby="why-title">
        <div className={`container ${styles.why}`}>
          <div className={styles.story} data-reveal>
            <span className="eyebrow">Why I wrote it</span>
            <h2 id="why-title" className={styles.whyTitle}>
              More Than a Devotional. A Daily Faith Journey.
            </h2>
            <blockquote className={styles.storyQuote}>
              <p>{kddSeries.story}</p>
              <footer className={styles.signature}>Abimbola</footer>
            </blockquote>
          </div>
          <FeatureGrid min={220}>
            <FeatureCard icon="calendar" title="365 Days" accent="teal">
              A full year of daily devotional content across two volumes.
            </FeatureCard>
            <FeatureCard icon="child" title="Child-Friendly" accent="plum" delay={80}>
              Relatable lessons written with children in mind.
            </FeatureCard>
            <FeatureCard icon="sprout" title="Practical Faith" accent="emerald" delay={160}>
              Bible truth connected to everyday life.
            </FeatureCard>
            <FeatureCard icon="family" title="Built for Families" accent="blue" delay={240}>
              Useful for parents, schools, churches and children&apos;s ministries.
            </FeatureCard>
          </FeatureGrid>
        </div>
      </section>

      {/* 5: Meet the author */}
      <AuthorSection />

      {/* 6: Book collection */}
      <section className={`section ${styles.collection}`} id="books" aria-labelledby="collection-title">
        <div className="container">
          <SectionHeading
            id="collection-title"
            eyebrow="The Bookshop"
            title="Books by Abimbola Olumuyiwa"
            intro="Faith-filled books for children, families, and anyone searching for purpose."
          />
          <div className={bookStyles.grid}>
            {bookOrder.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </div>
      </section>

      {/* 7: What's inside */}
      <section className={`section ${styles.inside}`} aria-labelledby="inside-title">
        <div className="container">
          <SectionHeading
            id="inside-title"
            tone="light"
            eyebrow="What's Inside"
            title="Five parts to every devotional"
            intro="A simple, repeatable rhythm children can follow each day, on their own or with you beside them."
          />
          <DailyParts />
        </div>
      </section>

      {/* 8: Who is it for? */}
      <section className="section" aria-labelledby="audience-title">
        <div className="container">
          <SectionHeading id="audience-title" eyebrow="Who It's For" title="Made for the people who shape young hearts" />
          <FeatureGrid min={230}>
            <FeatureCard icon="parents" title="Parents" accent="teal">
              Help your child build a consistent devotional routine.
            </FeatureCard>
            <FeatureCard icon="school" title="Schools" accent="blue" delay={80}>
              A practical resource for nurturing faith and character.
            </FeatureCard>
            <FeatureCard icon="church" title="Churches" accent="plum" delay={160}>
              A useful resource for children&apos;s ministries and discipleship.
            </FeatureCard>
            <FeatureCard icon="heart" title="Families" accent="emerald" delay={240}>
              Create meaningful moments around God&apos;s Word together.
            </FeatureCard>
          </FeatureGrid>
          <p className={styles.bulk} data-reveal>
            Ordering for a school, church or ministry? <Link href="/contact?topic=School%20or%20church">Get in touch about group orders</Link>.
          </p>
        </div>
      </section>

      {/* 9: Book preview */}
      <BookPreview books={kddVolumes} />

      {/* 10: Testimonials */}
      <Testimonials />

      {/* 11: Blog */}
      {posts.length > 0 && (
        <section className="section" aria-labelledby="journal-title">
          <div className="container">
            <SectionHeading
              id="journal-title"
              align="left"
              eyebrow="The Journal"
              title="From My Journal"
              intro="Reflections on faith, growth, and the books that shape me."
              action={
                <Button href="/blog" variant="secondary" pill>
                  View all posts
                </Button>
              }
            />
            <div className={blogStyles.grid}>
              {posts.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12: YouTube */}
      <YouTubeSection videos={videos} />

      {/* 13: Newsletter */}
      <Newsletter />
    </>
  );
}
