import Link from "next/link";
import { kddSeries } from "@/lib/books";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./kdd.module.css";

const icons: Record<string, IconName> = {
  days: "calendar",
  short: "book-open",
  topics: "topic",
  verse: "verse",
  illustration: "illustration",
  prayer: "prayer",
};

/**
 * "Why Parents Love This Format": an editorial layout that explains the
 * practical format only (no testimonials or outcome claims).
 */
export function FormatSection({ id = "understand", eyebrow = "How It Works", step }: { id?: string; eyebrow?: string; step?: string }) {
  return (
    <section id={id} data-step={step} className="section" aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.formatLayout}`}>
        <div className={styles.formatIntro} data-reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 id={`${id}-title`} className={styles.formatTitle}>
            Why Parents Love <em>This Format</em>
          </h2>
          <p className={styles.formatLead}>Everything is designed so that a few minutes with God&apos;s Word can become a natural part of your child&apos;s day.</p>
          <figure className={styles.story}>
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
        </div>

        <ol className={styles.formatList}>
          {kddSeries.formatPoints.map((f, i) => (
            <li key={f.key} className={styles.formatItem} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}>
              <span className={styles.formatNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.formatHead}>
                <span className={styles.formatIcon} aria-hidden="true">
                  <Icon name={icons[f.key]} size={22} />
                </span>
                {f.title}
              </h3>
              <p className={styles.formatText}>{f.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
