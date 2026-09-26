import Link from "next/link";
import { kddSeries, kddVolumes, kddQuickFacts, bookHref, type Book } from "@/lib/books";

const volumeChip = (b: Book) => `Volume ${b.series?.volume ?? ""}${b.devotionalCount ? ` · ${b.devotionalCount} days` : ""}`;
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./KddDiscover.module.css";

const partIcons: Record<string, IconName> = {
  topic: "topic",
  verse: "verse",
  narration: "narration",
  illustration: "illustration",
  prayer: "prayer",
};

/**
 * The primary featured-book experience: large covers, what the book is,
 * what each day contains, who it's for, and a clear CTA hierarchy
 * (Buy Now → Read a Sample → Learn More).
 */
export function KddDiscover({
  id = "discover",
  eyebrow = "Featured Book",
  headingLevel = "h2",
  buyHref = "#buy",
  sampleHref = "#preview",
  learnHref = "/books/kiddies-daily-devotional",
  step,
}: {
  id?: string;
  eyebrow?: string;
  headingLevel?: "h1" | "h2";
  buyHref?: string;
  sampleHref?: string;
  /** Set to null to hide the "Learn More" link (e.g. on the series page itself). */
  learnHref?: string | null;
  /** Journey step this section belongs to (for the sticky step indicator). */
  step?: string;
}) {
  const Heading = headingLevel;
  const [v1, v2] = kddVolumes;

  return (
    <section id={id} data-step={step} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.grid}`}>
        {/* Covers: the real artwork, large */}
        <div className={styles.stage} data-reveal>
          <div className={styles.glow} aria-hidden="true" />
          <Link href={bookHref(v1)} className={`${styles.book} ${styles.bookOne}`} aria-label={`${v1.title}: details`}>
            <BookCover book={v1} sizes="(max-width: 900px) 55vw, 340px" preload tilt />
            <span className={`${styles.chip} ${styles.chipTeal}`}>{volumeChip(v1)}</span>
          </Link>
          <Link href={bookHref(v2)} className={`${styles.book} ${styles.bookTwo}`} aria-label={`${v2.title}: details`}>
            <BookCover book={v2} sizes="(max-width: 900px) 55vw, 340px" preload tilt />
            <span className={`${styles.chip} ${styles.chipPlum}`}>{volumeChip(v2)}</span>
          </Link>
        </div>

        {/* The pitch */}
        <div className={styles.copy} data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <span className="eyebrow">{eyebrow}</span>
          <Heading id={`${id}-title`} className={styles.title}>
            {kddSeries.name}
          </Heading>
          <p className={styles.tagline}>{kddSeries.tagline}</p>
          <p className={styles.value}>{kddSeries.valueProp}</p>

          <div className={styles.contains}>
            <p className={styles.containsTitle}>Each devotional contains</p>
            <ul className={styles.parts}>
              {kddSeries.dailyParts.map((p) => (
                <li key={p.key}>
                  <span className={styles.partIcon} aria-hidden="true">
                    <Icon name={partIcons[p.key]} size={18} />
                  </span>
                  {p.title}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.ctas}>
            <Button href={buyHref} size="lg" pill>
              <Icon name="cart" size={20} /> Buy Now
            </Button>
            <Button href={sampleHref} variant="secondary" size="lg" pill>
              <Icon name="eye" size={20} /> Read a Sample
            </Button>
            {learnHref && (
              <Link href={learnHref} className={styles.learn}>
                Learn More <Icon name="arrow-right" size={16} />
              </Link>
            )}
          </div>

          <div className={styles.forRow}>
            <span className={styles.forLabel}>Useful for</span>
            <ul className={styles.pills}>
              {kddSeries.usefulFor.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <p className={styles.facts}>
            {kddQuickFacts().map((f, i) => (
              <span key={f}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                {f}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
