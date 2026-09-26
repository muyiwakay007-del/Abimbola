import Image from "next/image";
import { author } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { DevNote } from "@/components/ui/DevNote";
import styles from "./AuthorSection.module.css";

/** Author portrait (or an elegant monogram until a photo is added). */
export function AuthorPortrait({ priority = false }: { priority?: boolean }) {
  return (
    <div className={styles.portraitWrap}>
      <div className={styles.portraitRing} aria-hidden="true" />
      {author.photo ? (
        <Image
          src={author.photo.src}
          alt={author.photo.alt}
          width={560}
          height={700}
          sizes="(max-width: 900px) 70vw, 420px"
          className={styles.portrait}
          preload={priority}
        />
      ) : (
        <div className={`${styles.portrait} ${styles.monogram}`} role="img" aria-label="Portrait of Abimbola Olumuyiwa coming soon">
          <span className={styles.initials}>AO</span>
          <span className={styles.monoName}>{author.firstName}</span>
        </div>
      )}
      {!author.photo && <DevNote>add your photo in src/content/site.ts → author.photo</DevNote>}
    </div>
  );
}

/** "Meet Abimbola": warm introduction with a link to the full story. */
export function AuthorSection() {
  return (
    <section className={`section ${styles.section}`} aria-labelledby="meet-author">
      <div className={`container ${styles.grid}`}>
        <div data-reveal>
          <AuthorPortrait />
        </div>
        <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }}>
          <span className="eyebrow">The Author</span>
          <h2 id="meet-author" className={styles.title}>
            Meet <span className={styles.script}>Abimbola</span>
          </h2>
          <p className="lead">{author.intro}</p>
          {author.bio[0] && <p>{author.bio[0]}</p>}
          <ul className={styles.themes} aria-label="Topics Abimbola writes about">
            {author.themes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button href="/about" variant="primary" pill>
              Read My Story
            </Button>
            <Button href="/blog" variant="ghost">
              Visit the journal →
            </Button>
          </div>
          {!author.bio.length && <DevNote>add biography paragraphs in src/content/site.ts → author.bio</DevNote>}
        </div>
      </div>
    </section>
  );
}
