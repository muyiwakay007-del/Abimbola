# Music: how it works, and what's needed for uploads later

## Adding or updating a song today

Everything lives in `src/content/music.ts` → `releases`. Each entry follows the `MusicRelease` type in `types.ts`:

```ts
{
  slug: "song-title",               // unique id
  visible: true,                    // false = hidden everywhere
  status: "COMING_SOON",            // "COMING_SOON" | "UNRELEASED" | "RELEASED"
  title: null,                      // null shows "New Music" (never invent a title)
  artist: "Abimbola Olumuyiwa",
  cover: null,                      // { src: "/images/music/x.jpg", alt, width, height }
  description: null,
  releaseDate: null,                // "2026-12-01"
  audioPreview: null,               // { src: "/music/x-preview.mp3", type: "audio/mpeg" }
  lyricsUrl: null,
  youtubeUrl: null,
  spotifyUrl: null,
  appleMusicUrl: null,
  otherLinks: [],                   // [{ name: "Audiomack", url: "https://…" }]
}
```

How the site responds:

| Situation | What visitors see |
|---|---|
| `status: "COMING_SOON"` | "Coming Soon" badge, "Stay tuned", no player, no listen buttons |
| `status: "UNRELEASED"` | "Unreleased" badge, "Coming Soon"; a preview player **only** if `audioPreview` is set |
| `status: "RELEASED"` | "Out Now" badge, **Listen Now** (first available platform) + a button per other platform |
| No `audioPreview` | No player at all (never a broken one) |
| A streaming link is `null` | That platform simply isn't shown |
| No `cover` | A soft, record-inspired placeholder in the brand colours |
| No released music at all | `/music` shows "New Music Coming Soon"; the homepage teaser says "New music coming soon." |

Released songs also get `MusicRecording` structured data for search engines. Upcoming ones never do.

Files: artwork goes in `public/images/music/`, audio in `public/music/`.

> ⚠ **Anything in `/public` is publicly downloadable** by anyone with the link. Only place audio there that you're comfortable sharing openly. Truly private, unreleased audio needs the backend described below.

## TODO: connecting a real music-management backend (for uploads)

The site is **frontend-ready**: the pages only read a list of `MusicRelease` objects through `src/lib/music.ts`. Nothing is uploaded or stored today, and there is no upload screen, on purpose.

To upload songs through the website later, connect these pieces:

1. **File storage** for artwork and audio (MP3/WAV).
   - The project already uses **Supabase**, so **Supabase Storage** is the natural fit: a public `music-artwork` bucket and a **private** `music-audio` bucket.
   - Alternatives: Cloudflare R2, AWS S3, Cloudinary.
   - Unreleased audio should stay in the **private** bucket and be played through short-lived **signed URLs**, so it can't be passed around.
2. **A database table** mirroring `MusicRelease`, e.g. `music_releases` with the same fields plus `published boolean`, `created_at` and `updated_at`. Protect it with Row Level Security: the public can read only `published = true` rows, and only the admin can write.
3. **Admin sign-in** (Supabase Auth) so only Abimbola or trusted helpers can manage music.
4. **An admin area** (e.g. `/admin/music`, protected by sign-in) with forms to:
   upload artwork · upload MP3/WAV · add a title and description · set the status and release date ·
   add lyrics · add streaming links · publish or unpublish.
5. **Swap the data source**: change `src/lib/music.ts` to read published rows from the database (like `src/lib/posts.ts` does for the blog) and fall back to `src/content/music.ts` if the database is unavailable. No page or component needs to change.
6. **Large files**: upload audio directly from the browser to storage (Supabase's resumable uploads or signed upload URLs) rather than through the website's server, and consider generating a short, lower-bitrate MP3 preview for the player.

Until then, adding a song means editing `music.ts` and placing files in `public/`, then redeploying.
