import { site } from "@/content/site";
import { getLatestVideos } from "@/lib/youtube";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { YouTubeSection } from "@/components/YouTubeSection";
import { BookCta } from "@/components/BookCta";

export const revalidate = 21600;

export const metadata = pageMetadata({
  title: "YouTube",
  description: "Watch videos from Abimbola Olumuyiwa: Kiddies Daily Devotional news, behind-the-scenes moments and encouragement. Subscribe on YouTube.",
  path: "/youtube",
});

export default async function YouTubePage() {
  const videos = await getLatestVideos(12);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "YouTube", path: "/youtube" }])} />
      <YouTubeSection videos={videos} headingLevel="h1" limit={12} />
      <section className="section-tight" aria-label="About the channel">
        <div className="container container-narrow" style={{ textAlign: "center" }}>
          <p className="lead" style={{ margin: 0 }}>
            New videos appear here automatically from{" "}
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer">
              my YouTube channel<span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            . Subscribe so you never miss one.
          </p>
        </div>
      </section>
      <BookCta />
    </>
  );
}
