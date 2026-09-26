import { kddVolumes } from "@/content/books";
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./kdd.module.css";

/** Warm closing call to action for Kiddies Daily Devotional. */
export function GiftCta({ href = "/kiddies-daily-devotional", label = "Explore Kiddies Daily Devotional" }: { href?: string; label?: string }) {
  const [v1, v2] = kddVolumes;
  return (
    <section className={styles.gift} aria-labelledby="gift-title">
      <div className={styles.giftGlowA} aria-hidden="true" />
      <div className={styles.giftGlowB} aria-hidden="true" />
      <div className={`container ${styles.giftInner}`}>
        <div className={styles.giftCopy} data-reveal>
          <span className={styles.giftEyebrow}>Kiddies Daily Devotional</span>
          <h2 id="gift-title" className={styles.giftTitle}>
            Give Your Child 365 Days of Growing in Faith
          </h2>
          <p className={styles.giftText}>
            A topic to explore, a verse to remember, a story to understand and a prayer to pray, one joyful day at a time. A simple way to help your
            child meet God in His Word every day of the year.
          </p>
          <Button href={href} size="lg" pill>
            {label} <Icon name="arrow-right" size={18} />
          </Button>
        </div>
        <div className={styles.giftBooks} data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} aria-hidden="true">
          <div className={styles.giftBookOne}>
            <BookCover book={v1} sizes="(max-width: 800px) 45vw, 260px" />
          </div>
          <div className={styles.giftBookTwo}>
            <BookCover book={v2} sizes="(max-width: 800px) 45vw, 260px" />
          </div>
        </div>
      </div>
    </section>
  );
}
