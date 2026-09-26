import type { MusicRelease } from "@/content/types";
import { releaseTitle, releaseDateLabel, listenLinks, canPreview, statusLabel } from "@/lib/music";
import { MusicArtwork } from "@/components/music/MusicArtwork";
import { MusicPlayer } from "@/components/music/MusicPlayer";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./music.module.css";

/**
 * One release, rendered from its data in src/content/music.ts.
 * The card adapts to `status` and hides anything that isn't filled in.
 */
export function MusicReleaseCard({ release, layout = "card" }: { release: MusicRelease; layout?: "card" | "feature" }) {
  const title = releaseTitle(release);
  const date = releaseDateLabel(release);
  const links = listenLinks(release);
  const released = release.status === "RELEASED";
  const comingSoon = release.status === "COMING_SOON";

  return (
    <article className={`${styles.release} ${layout === "feature" ? styles.releaseFeature : ""}`} data-reveal>
      <div className={styles.releaseArt}>
        <MusicArtwork release={release} />
      </div>

      <div className={styles.releaseBody}>
        <span className={`${styles.status} ${styles[`status_${release.status}`]}`}>{statusLabel[release.status]}</span>
        <h3 className={styles.releaseTitle}>
          {comingSoon && !release.title ? (
            <>
              New Music <em>Coming Soon</em>
            </>
          ) : (
            title
          )}
        </h3>
        {(released || release.title) && <p className={styles.artist}>{release.artist}</p>}
        {release.description && <p className={styles.releaseText}>{release.description}</p>}
        {date && (
          <p className={styles.date}>
            <Icon name="calendar" size={15} /> {released ? "Released" : "Expected"} {date}
          </p>
        )}

        {/* Listening: only for released music, only the platforms that exist */}
        {released && links.length > 0 && (
          <div className={styles.listen}>
            <Button href={links[0].url} external size="md" pill>
              <Icon name="headphones" size={18} /> Listen Now
            </Button>
            {links.length > 1 && (
              <ul className={styles.platforms} aria-label="Also available on">
                {links.slice(1).map((l) => (
                  <li key={l.url}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.name}
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {!released && <p className={styles.soon}>{comingSoon ? "Stay tuned" : "Coming soon to streaming platforms"}</p>}

        {/* Preview player: shown when audio exists; otherwise nothing broken */}
        {canPreview(release) && <MusicPlayer src={release.audioPreview?.src} type={release.audioPreview?.type} title={title} compact={layout === "card"} />}

        {release.lyricsUrl && (
          <a className={styles.lyrics} href={release.lyricsUrl} target={/^https?:/.test(release.lyricsUrl) ? "_blank" : undefined} rel="noopener noreferrer">
            <Icon name="lyrics" size={16} /> Lyrics
          </a>
        )}
      </div>
    </article>
  );
}
