/**
 * Generates the song artwork in public/images/music/ (1400×1400 JPEG).
 *
 *   node scripts/generate-music-covers.mjs
 *
 * Original typographic artwork in the site's palette (cream, sage, caramel,
 * dark brown) with one motif per song, drawn from its title. All covers
 * share a frame and typography so they read as one body of work.
 * Replace any file with official artwork at any time; nothing else changes.
 */
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";
import React from "react";
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";

const h = React.createElement;
const ROOT = new URL("..", import.meta.url).pathname;
const OUT = path.join(ROOT, "public/images/music");
const SIZE = 1400;
const ARTIST = "Abimbola Olumuyiwa";

const font = (f) => readFile(path.join(ROOT, "src/assets/fonts", f));
const fonts = [
  { name: "Playfair", data: await font("PlayfairDisplay-SemiBold.woff"), weight: 600, style: "normal" },
  { name: "Playfair", data: await font("PlayfairDisplay-MediumItalic.woff"), weight: 500, style: "italic" },
  { name: "Lato", data: await font("Lato-Bold.woff"), weight: 700, style: "normal" },
  { name: "Script", data: await font("DancingScript-Bold.woff"), weight: 700, style: "normal" },
];

/* Deterministic "random" so the artwork is identical every run. */
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

/* ------------------------------ shared frame ------------------------------ */
function Cover({ background, art, title, italic = false, ink = "#f7f1de", accent = "#d2a67a" }) {
  const lines = Array.isArray(title) ? title : [title];
  const longest = Math.max(...lines.map((l) => l.length));
  return h(
    "div",
    { style: { width: "100%", height: "100%", display: "flex", position: "relative", background, fontFamily: "Lato" } },
    art,
    // inner frame
    h("div", { style: { position: "absolute", top: 56, left: 56, right: 56, bottom: 56, border: `2px solid ${ink}`, opacity: 0.32, borderRadius: 10 } }),
    // artist, top
    h(
      "div",
      { style: { position: "absolute", top: 104, left: 0, right: 0, display: "flex", justifyContent: "center", color: ink, fontSize: 30, letterSpacing: 12, textTransform: "uppercase", opacity: 0.9 } },
      ARTIST
    ),
    // title, bottom
    h(
      "div",
      { style: { position: "absolute", left: 110, right: 110, bottom: 150, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" } },
      h("div", { style: { width: 90, height: 3, background: accent, marginBottom: 34 } }),
      h(
        "div",
        {
          style: {
            fontFamily: "Playfair",
            fontWeight: italic ? 500 : 600,
            fontStyle: italic ? "italic" : "normal",
            fontSize: longest > 14 ? 118 : longest > 10 ? 136 : 150,
            lineHeight: 1.04,
            letterSpacing: -1,
            color: ink,
            textShadow: "0 6px 30px rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        },
        ...lines.map((l, i) => h("span", { key: i }, l))
      )
    )
  );
}

/* ---------------------- 1. The Battle Has Been Won ----------------------- */
/* Victory at dawn: sunrise rays breaking over quiet hills. */
function battle() {
  const cx = 700, cy = 860;
  const rays = Array.from({ length: 29 }, (_, i) => {
    const a = Math.PI + (i / 28) * Math.PI; // upper half
    const x2 = cx + Math.cos(a) * 1300, y2 = cy + Math.sin(a) * 1300;
    return h("line", { key: i, x1: cx, y1: cy, x2, y2, stroke: "#fff3d6", strokeWidth: i % 2 ? 3 : 7, strokeOpacity: i % 2 ? 0.16 : 0.24 });
  });
  const art = h(
    "div",
    { style: { position: "absolute", inset: 0, display: "flex" } },
    h(
      "svg",
      { width: SIZE, height: SIZE, viewBox: `0 0 ${SIZE} ${SIZE}` },
      h("defs", null, h("radialGradient", { id: "sun", cx: "50%", cy: "50%", r: "50%" }, h("stop", { offset: "0%", stopColor: "#fffaf0" }), h("stop", { offset: "60%", stopColor: "#f6dfae" }), h("stop", { offset: "100%", stopColor: "#e7bf7d", stopOpacity: 0 }))),
      ...rays,
      h("circle", { cx, cy, r: 330, fill: "url(#sun)" }),
      h("circle", { cx, cy, r: 150, fill: "#fff6e2" }),
      // far hills
      h("path", { d: `M0 900 C 220 820 420 860 620 900 C 820 940 1020 820 1400 870 L1400 1400 L0 1400 Z`, fill: "#6b3a1f" }),
      // near hills
      h("path", { d: `M0 1010 C 260 930 480 1000 700 1030 C 940 1060 1150 960 1400 1000 L1400 1400 L0 1400 Z`, fill: "#36170a" })
    )
  );
  return Cover({
    background: "linear-gradient(180deg, #2a1206 0%, #5a2b14 34%, #9d6638 62%, #e0b47a 80%, #f3dca9 100%)",
    art,
    title: ["The Battle", "Has Been Won"],
  });
}

/* ------------------------------- 2. Tremble ------------------------------- */
/* Awe: rings that ripple and quiver outward, like the ground trembling. */
function tremble() {
  const cx = 700, cy = 610;
  const rings = [];
  for (let k = 0; k < 24; k++) {
    const r = 46 + k * 36;
    const amp = 2 + k * 0.9;
    const waves = 10 + (k % 3) * 2;
    let d = "";
    for (let s = 0; s <= 180; s++) {
      const t = (s / 180) * Math.PI * 2;
      const rr = r + amp * Math.sin(waves * t + k * 0.6);
      const x = cx + rr * Math.cos(t), y = cy + rr * Math.sin(t);
      d += `${s ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    rings.push(h("path", { key: k, d: d + "Z", fill: "none", stroke: "#efe5c9", strokeWidth: k < 3 ? 4 : 2.2, strokeOpacity: Math.max(0.08, 0.7 - k * 0.028) }));
  }
  const art = h(
    "div",
    { style: { position: "absolute", inset: 0, display: "flex" } },
    h("svg", { width: SIZE, height: SIZE, viewBox: `0 0 ${SIZE} ${SIZE}` }, ...rings, h("circle", { cx, cy, r: 20, fill: "#f7f1de" }))
  );
  return Cover({
    background: "radial-gradient(circle at 50% 44%, #9aa37f 0%, #6f7a57 26%, #4a5338 56%, #2b3122 100%)",
    art,
    title: "Tremble",
    italic: true,
    accent: "#d2a67a",
  });
}

/* --------------------------- 3. Oh King of Kings --------------------------- */
/* Majesty: a fine-line golden crown beneath a scatter of stars. */
function kingOfKings() {
  const rand = rng(20260926);
  const stars = Array.from({ length: 70 }, (_, i) => {
    const x = 90 + rand() * 1220, y = 170 + rand() * 640;
    return h("circle", { key: i, cx: x, cy: y, r: 1.4 + rand() * 3.2, fill: "#f7f1de", fillOpacity: 0.25 + rand() * 0.55 });
  });
  const sparkle = (x, y, s) =>
    h("path", { d: `M${x} ${y - s} L${x + s * 0.22} ${y - s * 0.22} L${x + s} ${y} L${x + s * 0.22} ${y + s * 0.22} L${x} ${y + s} L${x - s * 0.22} ${y + s * 0.22} L${x - s} ${y} L${x - s * 0.22} ${y - s * 0.22} Z`, fill: "#f3dca9", fillOpacity: 0.85 });
  // crown: points at x = 470, 585, 700, 815, 930
  const gold = "#d9ae78";
  const crown = [
    h("path", { d: "M450 700 L470 470 L585 590 L700 400 L815 590 L930 470 L950 700 Z", fill: "rgba(217,174,120,0.10)", stroke: gold, strokeWidth: 7, strokeLinejoin: "round" }),
    h("path", { d: "M440 700 L960 700 L960 760 L440 760 Z", fill: "rgba(217,174,120,0.16)", stroke: gold, strokeWidth: 7, strokeLinejoin: "round" }),
    ...[[470, 470], [700, 400], [930, 470], [585, 590], [815, 590]].map(([x, y], i) => h("circle", { key: `j${i}`, cx: x, cy: y, r: i < 3 ? 16 : 11, fill: "#f3dca9" })),
    ...[560, 700, 840].map((x, i) => h("circle", { key: `b${i}`, cx: x, cy: 730, r: 12, fill: "none", stroke: gold, strokeWidth: 5 })),
  ];
  const art = h(
    "div",
    { style: { position: "absolute", inset: 0, display: "flex" } },
    h(
      "svg",
      { width: SIZE, height: SIZE, viewBox: `0 0 ${SIZE} ${SIZE}` },
      h("defs", null, h("radialGradient", { id: "glow", cx: "50%", cy: "50%", r: "50%" }, h("stop", { offset: "0%", stopColor: "#d9ae78", stopOpacity: 0.42 }), h("stop", { offset: "55%", stopColor: "#d9ae78", stopOpacity: 0.12 }), h("stop", { offset: "100%", stopColor: "#d9ae78", stopOpacity: 0 }))),
      h("ellipse", { cx: 700, cy: 600, rx: 520, ry: 420, fill: "url(#glow)" }),
      ...stars, sparkle(700, 250, 26), sparkle(1080, 330, 16), sparkle(330, 360, 18), ...crown)
  );
  return Cover({
    background: "linear-gradient(160deg, #2a1206 0%, #4e220f 45%, #3b3a24 100%)",
    art,
    title: "Oh King of Kings",
    accent: "#d9ae78",
  });
}

/* -------------------------------- render -------------------------------- */
const covers = { "the-battle-has-been-won": battle, tremble, "oh-king-of-kings": kingOfKings };
await mkdir(OUT, { recursive: true });
for (const [slug, make] of Object.entries(covers)) {
  const png = Buffer.from(await new ImageResponse(make(), { width: SIZE, height: SIZE, fonts }).arrayBuffer());
  const file = path.join(OUT, `${slug}.jpg`);
  await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(file);
  console.log("✓", path.relative(ROOT, file));
}
