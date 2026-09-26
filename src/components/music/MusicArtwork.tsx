import Image from "next/image";
import type { MusicRelease } from "@/content/types";
import { releaseTitle } from "@/lib/music";
import { Icon } from "@/components/ui/Icon";
import styles from "./music.module.css";

/**
 * Square release artwork, or (when there's no cover yet) a quiet,
 * record-inspired placeholder in the brand palette. No invented album art.
 */
const STATUS_LABEL = { COMING_SOON: "Coming Soon", UNRELEASED: "Unreleased", RELEASED: null } as const;

export function MusicArtwork({ release, sizes = "(max-width: 700px) 80vw, 360px" }: { release: MusicRelease; sizes?: string }) {
  const label = STATUS_LABEL[release.status];
  if (release.cover) {
    return (
      <div className={styles.art}>
        <Image src={release.cover.src} alt={release.cover.alt} width={release.cover.width} height={release.cover.height} sizes={sizes} className={styles.artImg} />
      </div>
    );
  }
  return (
    <div className={`${styles.art} ${styles.artPlaceholder}`} role="img" aria-label={`${releaseTitle(release)}: artwork coming soon`}>
      <span className={styles.grooves} aria-hidden="true" />
      <span className={styles.artCenter} aria-hidden="true">
        <Icon name="music" size={28} strokeWidth={1.6} />
      </span>
      {label && <span className={styles.artLabel}>{label}</span>}
    </div>
  );
}
