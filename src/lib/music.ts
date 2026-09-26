/**
 * Helpers that turn src/content/music.ts into what the UI needs.
 * Components never check fields themselves; they ask these helpers,
 * so missing data is handled the same way everywhere.
 */
import { releases, musicPage } from "@/content/music";
import type { MusicRelease, MusicStatus } from "@/content/types";
import { formatDate } from "@/lib/books";

export { musicPage };
export type { MusicRelease, MusicStatus };

export const visibleReleases: MusicRelease[] = releases.filter((r) => r.visible);
export const releasedMusic = visibleReleases
  .filter((r) => r.status === "RELEASED")
  .sort((a, b) => (b.releaseDate ?? "").localeCompare(a.releaseDate ?? ""));
export const upcomingMusic = visibleReleases.filter((r) => r.status !== "RELEASED");

export const statusLabel: Record<MusicStatus, string> = {
  COMING_SOON: "Coming Soon",
  UNRELEASED: "Unreleased",
  RELEASED: "Out Now",
};

/** "New Music" when no title has been confirmed yet. */
export const releaseTitle = (r: MusicRelease) => r.title ?? "New Music";

export const releaseDateLabel = (r: MusicRelease) => (r.releaseDate ? formatDate(r.releaseDate) : null);

export type ListenLink = { name: string; url: string };

/** Streaming / video links that are filled in, in a consistent order. Only for released music. */
export function listenLinks(r: MusicRelease): ListenLink[] {
  if (r.status !== "RELEASED") return [];
  const links: ListenLink[] = [];
  if (r.spotifyUrl) links.push({ name: "Spotify", url: r.spotifyUrl });
  if (r.appleMusicUrl) links.push({ name: "Apple Music", url: r.appleMusicUrl });
  if (r.youtubeUrl) links.push({ name: "YouTube", url: r.youtubeUrl });
  r.otherLinks.forEach((o) => o.url && links.push({ name: o.name, url: o.url }));
  return links;
}

/** A preview player is shown only when there is audio and the song isn't merely "coming soon". */
export const canPreview = (r: MusicRelease) => Boolean(r.audioPreview) && r.status !== "COMING_SOON";
