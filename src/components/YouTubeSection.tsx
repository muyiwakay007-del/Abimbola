import Image from "next/image";
import { youtubeChannelUrl, youtubeSubscribeUrl } from "@/lib/youtube";
import type { Video } from "@/lib/youtube";
import { formatDate } from "@/lib/posts";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./YouTubeSection.module.css";

/** A video thumbnail that opens the video on YouTube (no heavy embeds on load). */
export function VideoCard({ video, index = 0 }: { video: Video; index?: number }) {
  return (
    <article className={styles.card} data-reveal style={{ ["--reveal-delay" as string]: `${(index % 3) * 90}ms` }}>
      <a href={video.url} target="_blank" rel="noopener noreferrer" className={styles.thumbLink}>
        <span className={styles.thumb}>
          <Image src={video.thumbnail} alt="" fill sizes="(max-width: 700px) 92vw, 380px" className={styles.img} />
          <span className={styles.play} aria-hidden="true">
            <Icon name="play" size={26} />
          </span>
        </span>
        <span className={styles.meta}>
          <span className={styles.title}>{video.title}</span>
          {video.published && <span className={styles.date}>{formatDate(video.published)}</span>}
        </span>
        <span className="visually-hidden"> (opens YouTube in a new tab)</span>
      </a>
    </article>
  );
}

/** "Watch & Connect": latest uploads + subscribe CTA. */
export function YouTubeSection({ videos, headingLevel = "h2", limit = 3 }: { videos: Video[]; headingLevel?: "h1" | "h2"; limit?: number }) {
  const shown = videos.slice(0, limit);
  return (
    <section className={`section ${styles.section}`} aria-labelledby="watch-title">
      <div className="container">
        <SectionHeading
          id="watch-title"
          as={headingLevel}
          eyebrow="YouTube"
          title={
            <>
              Watch &amp; <em>Connect</em>
            </>
          }
          intro="Behind-the-scenes moments, book news and words of encouragement from my channel."
        />
        {shown.length > 0 ? (
          <div className={styles.grid}>
            {shown.map((v, i) => (
              <VideoCard key={v.id} video={v} index={i} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Icon name="youtube" size={40} />
            <p>New videos are on the way. Visit the channel to see the latest.</p>
          </div>
        )}
        <div className={styles.actions} data-reveal>
          {youtubeSubscribeUrl && (
            <Button href={youtubeSubscribeUrl} external variant="primary" size="lg" pill>
              <Icon name="youtube" size={20} /> Subscribe on YouTube
            </Button>
          )}
          {youtubeChannelUrl && (
            <Button href={youtubeChannelUrl} external variant="secondary" size="lg" pill>
              Visit the channel
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
