import Link from "next/link";
import { books } from "@/content/books";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { BookCover } from "@/components/books/BookCover";
import { Icon } from "@/components/ui/Icon";
import styles from "./Hero.module.css";

/** Home hero: warm personal welcome + the books, visible immediately. */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{site.tagline}</p>
          <h1 id="hero-title" className={styles.title}>
            Welcome!
          </h1>
          <p className={styles.intro}>
            I&apos;m so glad you&apos;re here. Pull up a chair, let&apos;s reflect, grow, and find a little hope together.
          </p>
          <p className={styles.author}>
            I&apos;m <strong>Abimbola Olumuyiwa</strong>, a mum, writer, and author of{" "}
            <Link href="/kiddies-daily-devotional">Kiddies Daily Devotional</Link>, 365 daily devotionals for children.
          </p>
          <div className={styles.actions}>
            <Button href="/kiddies-daily-devotional" variant="light" size="lg" pill>
              Explore Kiddies Daily Devotional <Icon name="arrow-right" size={18} />
            </Button>
            <Button href="/about" variant="outline-light" size="lg" pill>
              About Me
            </Button>
          </div>
        </div>

        <div className={styles.books}>
          <Link href={`/books/${books.kddVolume1.slug}`} className={`${styles.book} ${styles.bookBack}`} aria-label={books.kddVolume1.title}>
            <BookCover book={books.kddVolume1} sizes="(max-width: 900px) 45vw, 300px" preload />
          </Link>
          <Link href={`/books/${books.kddVolume2.slug}`} className={`${styles.book} ${styles.bookFront}`} aria-label={books.kddVolume2.title}>
            <BookCover book={books.kddVolume2} sizes="(max-width: 900px) 45vw, 300px" preload />
          </Link>
          <p className={styles.caption}>
            <span>Kiddies Daily Devotional</span>{" "}
            · Volumes 1 &amp; 2 · Available now
          </p>
        </div>
      </div>
    </section>
  );
}
