import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, categoryLabel, formatDate, readingMinutes, excerptOf } from "@/lib/posts";
import { pageMetadata, articleSchema, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { BlogCard } from "@/components/BlogCard";
import { BookCta } from "@/components/BookCta";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import blogStyles from "@/components/BlogCard.module.css";
import styles from "./post.module.css";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: excerptOf(post, 155),
      path: `/blog/${post.slug}`,
      type: "article",
      image: post.cover_image_url ? { url: post.cover_image_url, alt: post.cover_image_alt ?? post.title } : undefined,
    }),
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug((await params).slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const related = all.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const listHref = post.category === "book-review" ? "/book-reviews" : "/blog";

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article className={styles.article}>
        <div className={styles.cover} style={post.cover_image_url ? undefined : { background: "var(--gradient-hero)" }}>
          {post.cover_image_url && (
            <Image src={post.cover_image_url} alt={post.cover_image_alt ?? ""} fill preload sizes="100vw" className={styles.coverImg} />
          )}
          <div className={styles.coverShade} aria-hidden="true" />
        </div>

        <div className={`container container-read ${styles.wrap}`}>
          <div className={styles.card}>
            <Link href={listHref} className={styles.back}>
              ← Back to {post.category === "book-review" ? "book reviews" : "the journal"}
            </Link>
            <div className={styles.meta}>
              <Badge tone="accent">{categoryLabel(post.category)}</Badge>
              {post.published_at && <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>}
              <span aria-hidden="true">·</span>
              <span>{readingMinutes(post.content)} min read</span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>

            <div className="prose" dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />

            <footer className={styles.footer}>
              <span className={styles.signature}>Abimbola</span>
              <Button href={listHref} variant="accent" pill>
                More reflections
              </Button>
            </footer>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-posts">
          <div className="container">
            <h2 id="related-posts" style={{ textAlign: "center", marginBottom: "var(--space-7)" }}>
              Keep reading
            </h2>
            <div className={blogStyles.grid}>
              {related.map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <BookCta />
    </>
  );
}
