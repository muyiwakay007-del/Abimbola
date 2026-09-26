import Link from "next/link";
import { kddSeries } from "@/content/books";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard, type FeatureAccent } from "@/components/FeatureCard";
import type { IconName } from "@/components/ui/Icon";
import styles from "./kdd.module.css";

const look: Record<string, { icon: IconName; accent: FeatureAccent }> = {
  days: { icon: "calendar", accent: "teal" },
  short: { icon: "book-open", accent: "blue" },
  topics: { icon: "topic", accent: "plum" },
  verse: { icon: "verse", accent: "emerald" },
  illustration: { icon: "illustration", accent: "plum" },
  prayer: { icon: "prayer", accent: "teal" },
};

/**
 * "Why Parents Love This Format": explains the practical format only.
 * (No testimonials or claims; real reviews live in src/content/testimonials.ts.)
 */
export function FormatSection({ id = "understand", eyebrow = "How It Works", step }: { id?: string; eyebrow?: string; step?: string }) {
  return (
    <section id={id} data-step={step} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={eyebrow}
          title="Why Parents Love This Format"
          intro="Everything is designed so that a few minutes with God's Word can become a natural part of your child's day."
        />
        <div className={styles.formatLayout}>
          <figure className={styles.story} data-reveal>
            <blockquote>
              <p>{kddSeries.story}</p>
            </blockquote>
            <figcaption>
              <span className={styles.signature}>Abimbola</span>
              <span className={styles.sigRole}>Author and mum</span>
            </figcaption>
            <Link href="/about" className={styles.storyLink}>
              Read the story behind the book →
            </Link>
          </figure>
          <div className={styles.formatGrid}>
            {kddSeries.formatPoints.map((f, i) => (
              <FeatureCard key={f.key} icon={look[f.key].icon} accent={look[f.key].accent} title={f.title} delay={(i % 3) * 80}>
                {f.text}
              </FeatureCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
