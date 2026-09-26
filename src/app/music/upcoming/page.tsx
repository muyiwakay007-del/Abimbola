import { pageSeo } from "@/content/site";
import { musicPage, upcomingMusic } from "@/lib/music";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { MusicReleaseCard } from "@/components/music/MusicReleaseCard";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "@/components/music/music.module.css";

export const metadata = pageMetadata({ ...pageSeo.musicUpcoming, path: "/music/upcoming", absoluteTitle: true, ownImage: true });

/**
 * Upcoming & unreleased music. Entries come from src/content/music.ts
 * (status COMING_SOON or UNRELEASED); each card adapts to its status.
 * When a real music-management backend is connected (see src/content/MUSIC.md),
 * this page reads from it instead, with no layout changes needed.
 */
export default function UpcomingMusicPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Music", path: "/music" },
          { name: "Upcoming", path: "/music/upcoming" },
        ])}
      />
      <PageHeader
        eyebrow="Music"
        title={musicPage.upcoming.heading}
        intro={musicPage.upcoming.intro}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Music", href: "/music" },
          { label: "Upcoming", href: "/music/upcoming" },
        ]}
      />

      <section className="section" aria-label="Upcoming releases">
        <div className="container">
          {upcomingMusic.length > 0 ? (
            <div className={styles.grid}>
              {upcomingMusic.map((r) => (
                <MusicReleaseCard key={r.slug} release={r} />
              ))}
            </div>
          ) : (
            <div className={styles.empty} style={{ gridTemplateColumns: "1fr", textAlign: "center" }}>
              <div>
                <Icon name="music" size={34} />
                <h2 className={styles.emptyTitle}>Coming Soon</h2>
                <p className={styles.emptyText}>New music is on the way.</p>
              </div>
            </div>
          )}

          {upcomingMusic.length > 0 && <p className={styles.streamingNote}>{musicPage.streamingNote}</p>}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-7)" }}>
            <Button href="/music" variant="secondary" pill>
              ← Back to Music
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
