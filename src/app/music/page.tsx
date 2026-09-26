import { pageSeo } from "@/content/site";
import { musicPage, releasedMusic, upcomingMusic, visibleReleases } from "@/lib/music";
import { youtubeSubscribeUrl } from "@/lib/youtube";
import { pageMetadata, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import { author } from "@/content/author";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { MusicReleaseCard } from "@/components/music/MusicReleaseCard";
import { MusicArtwork } from "@/components/music/MusicArtwork";
import { BookCta } from "@/components/BookCta";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "@/components/music/music.module.css";

export const metadata = pageMetadata({ ...pageSeo.music, path: "/music", absoluteTitle: true, ownImage: true });

/** Structured data only for music that is actually released (never for upcoming projects). */
function recordingSchema() {
  return releasedMusic
    .filter((r) => r.title)
    .map((r) => ({
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      name: r.title,
      byArtist: { "@type": "Person", "@id": absoluteUrl("/#author"), name: r.artist },
      ...(r.releaseDate && { datePublished: r.releaseDate }),
      ...(r.cover && { image: absoluteUrl(r.cover.src) }),
      ...(r.description && { description: r.description }),
      sameAs: [r.spotifyUrl, r.appleMusicUrl, r.youtubeUrl].filter(Boolean),
    }));
}

export default function MusicPage() {
  const [featured, ...more] = releasedMusic;
  const placeholder = upcomingMusic[0] ?? visibleReleases[0];

  return (
    <>
      <JsonLd data={[breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Music", path: "/music" }]), ...recordingSchema()]} />

      <section className={styles.hero} aria-labelledby="music-title">
        <div className={styles.staff} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <span className={styles.heroIcon} aria-hidden="true">
            <Icon name="music" size={28} strokeWidth={1.6} />
          </span>
          <div>
            <span className="eyebrow">Another creative expression</span>
          </div>
          <h1 id="music-title" className={styles.heroTitle}>
            {musicPage.heading}
          </h1>
          <p className={styles.heroIntro}>{musicPage.intro}</p>
          <p className={styles.heroBody}>{musicPage.body}</p>
        </div>
      </section>

      {featured ? (
        <section className="section" aria-labelledby="listen-title">
          <div className="container">
            <SectionHeading id="listen-title" eyebrow="Listen" title="Released Music" />
            <MusicReleaseCard release={featured} layout="feature" />
            {more.length > 0 && (
              <div className={styles.grid} style={{ marginTop: "var(--space-6)" }}>
                {more.map((r) => (
                  <MusicReleaseCard key={r.slug} release={r} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : upcomingMusic.length > 0 ? (
        <section className="section" aria-labelledby="soon-title">
          <div className="container">
            <SectionHeading id="soon-title" eyebrow="Coming Soon" title={musicPage.comingSoon.heading} intro={musicPage.comingSoon.text} />
            <div className={styles.grid}>
              {upcomingMusic.map((r) => (
                <MusicReleaseCard key={r.slug} release={r} />
              ))}
            </div>
            <p className={styles.streamingNote} data-reveal>
              {musicPage.streamingNote}
            </p>
            <div className={styles.noteActions} data-reveal>
              <Button href="/#newsletter" variant="primary" pill>
                Get notified of new releases
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="section" aria-labelledby="soon-title">
          <div className="container">
            <div className={styles.empty} data-reveal>
              {placeholder && <MusicArtwork release={placeholder} sizes="260px" />}
              <div>
                <span className="eyebrow">Coming Soon</span>
                <h2 id="soon-title" className={styles.emptyTitle} style={{ marginTop: "var(--space-3)" }}>
                  {musicPage.comingSoon.heading}
                </h2>
                <p className={styles.emptyText}>{musicPage.comingSoon.text}</p>
                <Button href="/#newsletter" variant="secondary" pill>
                  Get updates
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {featured && upcomingMusic.length > 0 && (
        <section className="section-tight" aria-labelledby="upcoming-title">
          <div className="container">
            <SectionHeading
              id="upcoming-title"
              eyebrow="On the way"
              title="Upcoming Music"
              action={
                <Button href="/music/upcoming" variant="secondary" pill>
                  See all upcoming
                </Button>
              }
              align="left"
            />
            <div className={styles.grid}>
              {upcomingMusic.slice(0, 3).map((r) => (
                <MusicReleaseCard key={r.slug} release={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {youtubeSubscribeUrl && (
        <section className="section-tight" aria-labelledby="yt-title">
          <div className="container">
            <div className={styles.connect} data-reveal>
              <div>
                <h2 id="yt-title" className={styles.connectTitle}>
                  Follow along on YouTube
                </h2>
                <p className={styles.connectText}>Subscribe to {author.firstName}&apos;s channel to see new videos as they&apos;re shared.</p>
              </div>
              <Button href={youtubeSubscribeUrl} external variant="secondary" pill>
                <Icon name="youtube" size={18} /> Subscribe on YouTube
              </Button>
            </div>
          </div>
        </section>
      )}

      <BookCta title="And for the little ones: a daily faith journey" />
    </>
  );
}
