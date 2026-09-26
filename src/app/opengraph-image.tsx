import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Abimbola Olumuyiwa, Author of Kiddies Daily Devotional";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-share image: brand gradient + both book covers. */
export default async function OpenGraphImage() {
  const cover = async (n: 1 | 2) =>
    `data:image/jpeg;base64,${(await readFile(path.join(process.cwd(), `public/images/books/kiddies-daily-devotional-volume-${n}.jpg`))).toString("base64")}`;
  const [v1, v2] = await Promise.all([cover(1), cover(2)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "60px 70px",
          color: "#fff",
          background: "linear-gradient(125deg, #083b38 0%, #0f766e 45%, #2f5d8a 80%, #8e4585 115%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 40 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#ccfbf1" }}>Evolving • Impacting</div>
          <div style={{ fontSize: 74, fontWeight: 700, lineHeight: 1.05, marginTop: 20 }}>Abimbola Olumuyiwa</div>
          <div style={{ fontSize: 34, marginTop: 24, color: "rgba(255,255,255,0.92)" }}>Author of Kiddies Daily Devotional</div>
          <div style={{ fontSize: 26, marginTop: 14, color: "rgba(255,255,255,0.8)" }}>365 daily devotionals for children</div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 420, height: 440 }}>
          <img src={v1} width={290} height={290} alt="" style={{ position: "absolute", left: 0, top: 20, borderRadius: 10, transform: "rotate(-6deg)", boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }} />
          <img src={v2} width={290} height={290} alt="" style={{ position: "absolute", right: 0, top: 130, borderRadius: 10, transform: "rotate(5deg)", boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }} />
        </div>
      </div>
    ),
    size
  );
}
