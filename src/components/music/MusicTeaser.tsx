import { musicPage, releasedMusic, visibleReleases } from "@/lib/music";
import { MusicArtwork } from "@/components/music/MusicArtwork";
import { Button } from "@/components/ui/Button";
import styles from "./music.module.css";

/**
 * A small homepage teaser for Music. Deliberately compact and placed below
 * the book content so Kiddies Daily Devotional stays the primary focus.
 */
export function MusicTeaser() {
  const release = releasedMusic[0] ?? visibleReleases[0];
  const t = musicPage.teaser;
  return (
    <section className="section-tight" aria-labelledby="music-teaser-title">
      <div className="container">
        <div className={styles.teaser} data-reveal>
          {release && (
            <div className={styles.teaserArt}>
              <MusicArtwork release={release} sizes="200px" />
            </div>
          )}
          <div>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 id="music-teaser-title" className={styles.teaserTitle}>
              {t.heading}
            </h2>
            <p className={styles.teaserText}>{t.text}</p>
            {releasedMusic.length === 0 && <p className={styles.teaserNote}>{t.emptyNote}</p>}
          </div>
          <Button href="/music" variant="secondary" pill>
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
