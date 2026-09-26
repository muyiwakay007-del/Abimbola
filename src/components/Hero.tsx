import Image from "next/image";
import Link from "next/link";
import { books, kddVolumesLabel, kddRetailerNames } from "@/lib/books";
import { author } from "@/content/author";
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
          <p className={styles.eyebrow}>{author.tagline}</p>
          <h1 id="hero-title" className={styles.title}>
            Welcome!
          </h1>
          <p className={styles.intro}>
            I&apos;m so glad you&apos;re here. Pull up a chair, let&apos;s reflect, and grow together.
          </p>
          <div className={styles.author}>
            {author.photo && (
              <Image
                src={author.photo.src}
                alt=""
                width={112}
                height={112}
                className={styles.avatar}
                style={{ objectPosition: author.photo.focus }}
                preload
              />
            )}
            <p>
              I&apos;m <strong className={styles.name}>Abimbola Olumuyiwa</strong>
              <span>
                Mum, writer and author of <Link href="/books/kiddies-daily-devotional">Kiddies Daily Devotional</Link>
              </span>
            </p>
          </div>
          <div className={styles.actions}>
            <Button href="#discover" variant="primary" size="lg" pill>
              Explore Kiddies Daily Devotional <Icon name="arrow-right" size={18} />
            </Button>
            <Button href="/about" variant="secondary" size="lg" pill>
              About Me
            </Button>
          </div>
        </div>

        <div className={styles.books}>
          <Link href={`/books/${books.kddVolume1.slug}`} className={`${styles.book} ${styles.bookBack}`} aria-label={books.kddVolume1.title}>
            <BookCover book={books.kddVolume1} sizes="(max-width: 900px) 55vw, 340px" preload tilt />
          </Link>
          <Link href={`/books/${books.kddVolume2.slug}`} className={`${styles.book} ${styles.bookFront}`} aria-label={books.kddVolume2.title}>
            <BookCover book={books.kddVolume2} sizes="(max-width: 900px) 55vw, 340px" preload tilt />
          </Link>
          <p className={styles.caption}>
            <span>Kiddies Daily Devotional</span>{" "}
            · {kddVolumesLabel}
            {kddRetailerNames().length > 0 && " · Available now"}
          </p>
        </div>
      </div>
    </section>
  );
}
