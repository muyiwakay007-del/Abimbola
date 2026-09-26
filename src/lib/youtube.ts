import { author } from "@/content/author";

/** Channel link (from author.social.youtube). null when no channel is set. */
export const youtubeChannelUrl = author.social.youtube;
/** Same link with YouTube's "subscribe" prompt. */
export const youtubeSubscribeUrl = youtubeChannelUrl
  ? `${youtubeChannelUrl}${youtubeChannelUrl.includes("?") ? "&" : "?"}sub_confirmation=1`
  : null;

export type Video = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s*\u2014\s*/g, ", "); // house style: no em dashes

/**
 * Latest uploads from the channel's public RSS feed (no API key needed).
 * Cached and refreshed every 6 hours. Returns [] if the feed is unreachable.
 */
export async function getLatestVideos(limit = 6): Promise<Video[]> {
  const { channelId, featuredVideoIds, hiddenVideoIds } = author.youtube;
  if (!channelId) return [];
  let videos: Video[] = [];
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 60 * 60 * 6 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const xml = await res.text();
    videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => {
      const id = entry.match(/<yt:videoId>([^<]+)/)?.[1] ?? "";
      return {
        id,
        title: decode(entry.match(/<title>([^<]*)/)?.[1] ?? ""),
        published: entry.match(/<published>([^<]+)/)?.[1] ?? "",
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`,
      };
    });
  } catch (e) {
    console.warn(`[youtube] feed unavailable (${(e as Error).message})`);
  }

  const hidden = new Set<string>(hiddenVideoIds);
  const visible = videos.filter((v) => v.id && !hidden.has(v.id));
  const pinned = featuredVideoIds
    .map((id) => visible.find((v) => v.id === id))
    .filter((v): v is Video => Boolean(v));
  const rest = visible.filter((v) => !featuredVideoIds.includes(v.id));
  return [...pinned, ...rest].slice(0, limit);
}
