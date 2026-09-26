import { kddVolumes } from "@/lib/books";
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./kdd.module.css";

/** Warm closing call to action for Kiddies Daily Devotional. */
export function GiftCta({
  href = "/books/kiddies-daily-devotional",
  label = "Explore Kiddies Daily Devotional",
  title = "Give Your Child 365 Days of Growing in Faith",
  text = "A topic to explore, a verse to remember, a story to understand and a prayer to pray, one joyful day at a time. A simple way to help your child meet God in His Word every day of the year.",
}: {
  href?: string;
  label?: string;
  title?: string;
  text?: string;
}) {
  const [v1, v2] = kddVolumes;
  return (
    <section className={styles.gift} aria-labelledby="gift-title">
      <div className={styles.giftGlowA} aria-hidden="true" />
      <div className={styles.giftGlowB} aria-hidden="true" />
      <div className={`container ${styles.giftInner}`}>
        <div className={styles.giftCopy} data-reveal>
          <span className={`eyebrow ${styles.giftEyebrow}`}>Kiddies Daily Devotional</span>
          <h2 id="gift-title" className={styles.giftTitle}>
            {title}
          </h2>
          <p className={styles.giftText}>{text}</p>
          <Button href={href} size="lg" pill>
            {label} <Icon name="arrow-right" size={18} />
          </Button>
        </div>
        <div className={styles.giftBooks} data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} aria-hidden="true">
          <div className={styles.giftBookOne}>
            <BookCover book={v1} sizes="(max-width: 800px) 45vw, 260px" tilt />
          </div>
          <div className={styles.giftBookTwo}>
            <BookCover book={v2} sizes="(max-width: 800px) 45vw, 260px" tilt />
          </div>
        </div>
      </div>
    </section>
  );
}
