import { pageSeo } from "@/content/site";
import { author } from "@/content/author";
import { pageMetadata, personSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { AuthorPortrait } from "@/components/AuthorSection";
import { BookCta } from "@/components/BookCta";
import { SocialLinks } from "@/components/SocialLinks";
import { Button } from "@/components/ui/Button";
import { DevNote } from "@/components/ui/DevNote";
import styles from "./about.module.css";

export const metadata = pageMetadata({ ...pageSeo.about, path: "/about", absoluteTitle: true, ownImage: true });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[personSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
      <PageHeader eyebrow="About" title={<>Hi, I&apos;m <span style={{ fontFamily: "var(--font-script)", color: "var(--accent)" }}>Abimbola</span></>} intro={author.tagline} />

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.portrait} data-reveal>
            <AuthorPortrait priority />
          </div>

          <div data-reveal>
            <h2 className={styles.h2}>My story</h2>
            <div className={`prose ${styles.story}`}>
              {author.myStory.map((p, i) => (
                <p key={i}>
                  {p}
                </p>
              ))}
            </div>
            {!author.myStory.length && <DevNote>add your story to `myStory` in src/content/author.ts, one string per paragraph</DevNote>}

            <div className={styles.themes}>
              <h3 className={styles.h3}>What I write about</h3>
              <ul>
                {author.themes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className={styles.actions}>
              <Button href="/books/kiddies-daily-devotional" variant="primary" pill>
                Explore Kiddies Daily Devotional
              </Button>
              <Button href="/contact" variant="secondary" pill>
                Get in touch
              </Button>
            </div>
            <div style={{ marginTop: "var(--space-6)" }}>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      <BookCta />
    </>
  );
}
