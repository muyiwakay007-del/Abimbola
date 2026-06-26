import type { Metadata } from "next";
import { Dancing_Script, Lato } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const body = Lato({
  variable: "--font-body",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abimbola Olumuyiwa — Evolving || Impacting",
  description: "Blog posts, book reviews, and reflections by Abimbola Olumuyiwa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${script.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-gray-800">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
