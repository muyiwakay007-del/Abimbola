import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Home-screen icon for iPhone/iPad (and some link previews).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const serif = await readFile(path.join(process.cwd(), "src/assets/fonts/PlayfairDisplay-SemiBold.woff"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4e220f 0%, #8a5630 60%, #6b3a1f 100%)",
          color: "#fff",
          fontFamily: "Playfair",
          fontSize: 78,
          letterSpacing: 2,
        }}
      >
        AO
      </div>
    ),
    { ...size, fonts: [{ name: "Playfair", data: serif, weight: 600, style: "normal" }] }
  );
}

export const dynamic = "force-static";
