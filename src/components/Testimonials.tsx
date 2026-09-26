import Image from "next/image";
import { testimonials as allTestimonials, sampleTestimonials, type Testimonial } from "@/content/testimonials";
import { SectionHeading } from "@/components/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./Testimonials.module.css";

/** A single reader testimonial. */
export function TestimonialCard({ t, sample = false, delay = 0 }: { t: Testimonial; sample?: boolean; delay?: number }) {
  return (
    <figure className={`${styles.card} ${sample ? styles.sample : ""}`} data-reveal style={{ ["--reveal-delay" as string]: `${delay}ms` }}>
      {sample && <span className={styles.sampleTag}>Placeholder · dev only</span>}
      <span className={styles.quoteMark} aria-hidden="true">
        <Icon name="quote" size={30} />
      </span>
      {t.rating ? <StarRating value={t.rating} /> : null}
      <blockquote className={styles.quote}>
        <p>{t.quote}</p>
      </blockquote>
      <figcaption className={styles.person}>
        {t.image ? (
          <Image src={t.image} alt="" width={48} height={48} className={styles.avatar} />
        ) : (
          <span className={styles.avatar} aria-hidden="true">
            {t.name.charAt(0)}
          </span>
        )}
        <span>
          <span className={styles.name}>{t.name}</span>
          <span className={styles.role}>{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Testimonials section. Shows real entries from src/content/testimonials.ts.
 * With none yet: placeholders in development, an invitation in production.
 */
export function Testimonials({
  bookSlug,
  bookSlugs,
  id = "testimonials",
  title = "What Readers Are Saying",
  headingLevel = "h2",
  bookTitle = "Kiddies Daily Devotional",
  hideWhenEmpty = false,
  showSamples = true,
  emptyTitle,
  emptyText,
}: {
  /** Show the dev-only sample cards when there are no real testimonials. */
  showSamples?: boolean;
  /** Override the empty-state heading and text. */
  emptyTitle?: string;
  emptyText?: string;
  /** Render nothing (not even placeholders or the invitation) until real testimonials exist. */
  hideWhenEmpty?: boolean;
  bookTitle?: string;
  bookSlug?: string;
  /** Only show reviews tied to one of these books (e.g. both KDD volumes). */
  bookSlugs?: string[];
  id?: string;
  title?: string;
  headingLevel?: "h1" | "h2";
}) {
  const real = allTestimonials.filter((t) => {
    if (bookSlugs) return !!t.bookSlug && bookSlugs.includes(t.bookSlug);
    return !bookSlug || !t.bookSlug || t.bookSlug === bookSlug;
  });
  if (hideWhenEmpty && !real.length) return null;
  const isDev = process.env.NODE_ENV !== "production";
  const list = real.length ? real : isDev && showSamples ? sampleTestimonials : [];

  return (
    <section className={`section ${styles.section}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading id={`${id}-title`} as={headingLevel} eyebrow="Reviews & Testimonials" title={title} />

        {list.length > 0 && (
          <div className={styles.grid}>
            {list.map((t, i) => (
              <TestimonialCard key={i} t={t} sample={!real.length} delay={i * 100} />
            ))}
          </div>
        )}

        {!real.length && (
          <div className={styles.invite} data-reveal>
            <Icon name="heart" size={28} />
            <div>
              <h3 className={styles.inviteTitle}>{emptyTitle ?? `Has ${bookTitle} blessed you or your family?`}</h3>
              <p className={styles.inviteText}>
                {emptyText ??
                  "Reader stories will be shared here. If this book has been part of your home, classroom or ministry, I'd love to hear from you."}
              </p>
            </div>
            <Button href="/contact?topic=review" variant="primary" pill>
              Share your experience
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
