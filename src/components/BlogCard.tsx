import Image from "next/image";
import Link from "next/link";
import { type Post, categoryLabel, excerptOf, formatDate } from "@/lib/posts";
import styles from "./BlogCard.module.css";

const tones = ["var(--gradient-blossom)", "var(--gradient-brand)", "var(--gradient-soft)"];

/** Blog / book-review preview card. The whole card is clickable via the title link. */
export function BlogCard({ post, index = 0, headingLevel = "h3" }: { post: Post; index?: number; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const href = `/blog/${post.slug}`;
  return (
    <article className={styles.card} data-reveal style={{ ["--reveal-delay" as string]: `${(index % 3) * 90}ms` }}>
      <div className={styles.media} style={post.cover_image_url ? undefined : { background: tones[index % tones.length] }}>
        {post.cover_image_url && (
          <Image
            src={post.cover_image_url}
            alt={post.cover_image_alt ?? ""}
            fill
            sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 380px"
            className={styles.img}
          />
        )}
        <span className={styles.category}>{categoryLabel(post.category)}</span>
      </div>
      <div className={styles.body}>
        {post.published_at && (
          <time className={styles.date} dateTime={post.published_at}>
            {formatDate(post.published_at)}
          </time>
        )}
        <Heading className={styles.title}>
          <Link href={href} className={styles.link}>
            {post.title}
          </Link>
        </Heading>
        <p className={styles.excerpt}>{excerptOf(post, 150)}</p>
        <span className={styles.more} aria-hidden="true">
          Read More →
        </span>
      </div>
    </article>
  );
}
