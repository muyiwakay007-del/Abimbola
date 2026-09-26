import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { author } from "@/content/author";
import { site } from "@/content/site";
import { kddSeries } from "@/content/kiddies-daily-devotional";
import { kddVolumes, type Book } from "@/lib/books";
import type { BlogPost } from "@/content/types";
import { blogCategories } from "@/content/blog";

/**
 * One consistent social-share card (1200×630) for every page.
 * Brand fonts, deep-teal background, real cover art or portrait, and the
 * author's name. Rendered to JPEG so previews stay small enough for
 * WhatsApp, Facebook, LinkedIn and X.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/jpeg";

const root = process.cwd();
const fontFile = (name: string) => readFile(path.join(root, "src/assets/fonts", name));

async function fonts() {
  const [serif, serifItalic, sans, sansBold, script] = await Promise.all([
    fontFile("PlayfairDisplay-SemiBold.woff"),
    fontFile("PlayfairDisplay-MediumItalic.woff"),
    fontFile("Lato-Regular.woff"),
    fontFile("Lato-Bold.woff"),
    fontFile("DancingScript-Bold.woff"),
  ]);
  return [
    { name: "Playfair", data: serif, weight: 600 as const, style: "normal" as const },
    { name: "Playfair", data: serifItalic, weight: 500 as const, style: "italic" as const },
    { name: "Lato", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Lato", data: sansBold, weight: 700 as const, style: "normal" as const },
    { name: "Script", data: script, weight: 700 as const, style: "normal" as const },
  ];
}

/** Load an image from /public and shrink it for the card (keeps render fast and output small). */
async function publicImage(src: string | null | undefined, maxWidth = 640): Promise<string | null> {
  if (!src) return null;
  try {
    const buf = await sharp(path.join(root, "public", src)).resize({ width: maxWidth, withoutEnlargement: true }).jpeg({ quality: 86 }).toBuffer();
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export type OgCard = {
  eyebrow: string;
  title: string;
  subtitle?: string | null;
  author: string;
  /** Up to two cover images (paths under /public). */
  covers?: (string | null | undefined)[];
  /** Square-ish covers are shown larger; tall covers narrower. */
  coverAspect?: number;
  /** Portrait (paths under /public) shown in an arch instead of covers. */
  portrait?: string | null;
  /** A photo (e.g. a blog image) shown in a rounded frame. */
  photo?: string | null;
  /** Show the "by <author>" line (off for the author's own card). */
  showBy?: boolean;
  /** Small line at the bottom, e.g. the website address. */
  footer: string;
};

/** Render the card and return it as a JPEG Response. */
export async function renderOgCard(card: OgCard): Promise<Response> {
  const covers = (await Promise.all((card.covers ?? []).slice(0, 2).map((c) => publicImage(c)))).filter((c): c is string => Boolean(c));
  const portrait = await publicImage(card.portrait, 520);
  const photo = covers.length || portrait ? null : await publicImage(card.photo, 760);
  const aspect = card.coverAspect ?? 1;
  const two = covers.length === 2;
  const coverW = two ? 300 : aspect < 0.8 ? 300 : 380;
  const coverH = Math.round(coverW / aspect);
  const hasVisual = covers.length > 0 || Boolean(portrait) || Boolean(photo);
  const titleSize = card.title.length > 34 ? 54 : card.title.length > 24 ? 64 : 72;

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          // cream base (#F7F1DE) with soft sage and caramel washes
          backgroundImage: "linear-gradient(215deg, rgba(176, 186, 153, 0.55) 0%, rgba(247, 241, 222, 0) 48%), linear-gradient(30deg, rgba(210, 166, 122, 0.35) 0%, rgba(247, 241, 222, 0) 45%), linear-gradient(135deg, #f7f1de 0%, #fbf7ec 50%, #f7f1de 100%)",
          fontFamily: "Lato",
          color: "#4e220f",
        }}
      >
        {/* soft mauve glow + inner frame for a printed, premium feel */}
        <div style={{ position: "absolute", top: 26, left: 26, right: 26, bottom: 26, border: "1px solid rgba(78,34,15,0.14)", borderRadius: 18 }} />

        {/* Text column */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 76px", width: hasVisual ? 660 : 1050 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 20, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", color: "#5e6848" }}>
            <div style={{ width: 36, height: 2, background: "#9d6638", marginRight: 16 }} />
            {card.eyebrow}
          </div>
          <div style={{ fontFamily: "Playfair", fontWeight: 600, fontSize: titleSize, lineHeight: 1.05, marginTop: 22, letterSpacing: -1 }}>{card.title}</div>
          {card.subtitle && (
            <div style={{ fontFamily: "Playfair", fontStyle: "italic", fontWeight: 500, fontSize: 32, lineHeight: 1.25, marginTop: 18, color: "#8a5630" }}>{card.subtitle}</div>
          )}
          {card.showBy !== false && (
            <div style={{ display: "flex", alignItems: "baseline", marginTop: 34 }}>
              <span style={{ fontSize: 24, color: "#735a4a", marginRight: 12 }}>by</span>
              <span style={{ fontFamily: "Script", fontWeight: 700, fontSize: 44, color: "#4e220f" }}>{card.author}</span>
            </div>
          )}
          <div style={{ fontSize: 20, marginTop: 40, color: "#735a4a", letterSpacing: 1 }}>{card.footer}</div>
        </div>

        {/* Visual column */}
        {hasVisual && (
          <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", position: "relative", paddingRight: 40 }}>
            {photo ? (
              <div style={{ display: "flex", width: 420, height: 320, borderRadius: 16, overflow: "hidden", border: "6px solid #fffcf5", boxShadow: "0 26px 50px rgba(78,34,15,0.25)", transform: "rotate(2deg)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} width={420} height={320} alt="" style={{ objectFit: "cover", width: 420, height: 320 }} />
              </div>
            ) : portrait ? (
              <div style={{ display: "flex", width: 330, height: 412, borderRadius: "165px 165px 20px 20px", overflow: "hidden", border: "6px solid #fffcf5", boxShadow: "0 26px 50px rgba(78,34,15,0.25)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={portrait} width={318} height={400} alt="" style={{ objectFit: "cover", width: 318, height: 400, borderRadius: "159px 159px 14px 14px" }} />
              </div>
            ) : two ? (
              <div style={{ display: "flex", position: "relative", width: 470, height: 440 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={covers[0]} width={coverW} height={coverH} alt="" style={{ position: "absolute", left: 0, top: 20, borderRadius: 6, transform: "rotate(-6deg)", boxShadow: "0 24px 46px rgba(78,34,15,0.3)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={covers[1]} width={coverW} height={coverH} alt="" style={{ position: "absolute", right: 0, top: 110, borderRadius: 6, transform: "rotate(5deg)", boxShadow: "0 24px 46px rgba(78,34,15,0.3)" }} />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={covers[0]} width={coverW} height={coverH} alt="" style={{ borderRadius: 6, transform: "rotate(3deg)", boxShadow: "0 26px 50px rgba(78,34,15,0.32)" }} />
            )}
          </div>
        )}
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() }
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 84, progressive: true, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": OG_CONTENT_TYPE, "Cache-Control": "public, max-age=31536000, immutable" },
  });
}

/* ------------------------------------------------------------------ */
/*  Card presets, all fed from the central content files              */
/* ------------------------------------------------------------------ */

const domain = () => new URL(site.url).host.replace(/^www\./, "");

/** The flagship card: Kiddies Daily Devotional, 365 Daily Devotionals for Children, Abimbola Olumuyiwa. */
export const kddCardAlt = `${kddSeries.name}: ${kddSeries.tagline}, by ${author.name}`;
export function kddCard() {
  return renderOgCard({
    eyebrow: "Children's Devotional",
    title: kddSeries.name,
    subtitle: kddSeries.tagline,
    author: author.name,
    covers: kddVolumes.map((b) => b.cover?.src),
    footer: domain(),
  });
}

export const bookCardAlt = (b: Book) =>
  b.series ? `${b.series.name} Volume ${b.series.volume}: ${kddSeries.tagline}, by ${b.author}` : `${b.title}${b.subtitle ? `: ${b.subtitle}` : ""}, by ${b.author}`;
export function bookCard(b: Book) {
  const isKdd = b.series?.name === kddSeries.name;
  return renderOgCard({
    eyebrow: isKdd ? `Volume ${b.series!.volume} of ${kddVolumes.length}` : b.category,
    title: isKdd ? kddSeries.name : b.title,
    subtitle: isKdd ? kddSeries.tagline : b.subtitle,
    author: b.author,
    covers: [b.cover?.src],
    coverAspect: b.cover ? b.cover.width / b.cover.height : 1,
    footer: domain(),
  });
}

export const authorCardAlt = `${author.name}, author of ${kddSeries.name}`;
export function authorCard() {
  return renderOgCard({
    eyebrow: "The Author",
    title: author.name,
    subtitle: `Author of ${kddSeries.name}: ${kddSeries.tagline}`,
    author: author.name,
    portrait: author.photo?.src,
    showBy: false,
    footer: domain(),
  });
}

export const musicCardAlt = `Music by ${author.name}`;
export function musicCard() {
  return renderOgCard({
    eyebrow: "Music",
    title: "Music",
    subtitle: "Beyond the written word, faith expressed through music.",
    author: author.name,
    portrait: author.photo?.src,
    footer: `${domain()}/music`,
  });
}

export const postCardAlt = (p: BlogPost) => `${p.title}: ${blogCategories[p.category].label} by ${author.name}`;
export function postCard(p: BlogPost) {
  return renderOgCard({
    eyebrow: blogCategories[p.category].label,
    title: p.title,
    author: author.name,
    photo: p.image?.src,
    footer: `${domain()}/blog`,
  });
}
