import type { Metadata, Viewport } from "next";
import { Dancing_Script, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";

const lato = Lato({ variable: "--font-lato", weight: ["400", "700"], subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", weight: ["400", "600", "700"], style: ["normal", "italic"], subsets: ["latin"], display: "swap" });
const dancing = Dancing_Script({ variable: "--font-dancing", weight: ["600", "700"], subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s | ${site.name}` },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: ["Abimbola Olumuyiwa", "Kiddies Daily Devotional", "children's devotional", "Christian children's books", "daily devotional for kids"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b4f4a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lato.variable} ${playfair.variable} ${dancing.variable}`}>
      <body style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} style={{ flex: 1, outline: "none" }}>
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
