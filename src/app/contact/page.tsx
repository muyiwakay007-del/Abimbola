import { Suspense } from "react";
import { pageSeo } from "@/content/site";
import { author } from "@/content/author";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { Icon } from "@/components/ui/Icon";
import { DevNote } from "@/components/ui/DevNote";
import styles from "./contact.module.css";

export const metadata = pageMetadata({ ...pageSeo.contact, path: "/contact", absoluteTitle: true });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHeader eyebrow="Contact" title="Let's Connect" intro="Questions about the books, a group order for your school or church, an event, or simply a note of encouragement. I'd love to hear from you." />

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.formCard}>
            <h2 className={styles.h2}>Send a message</h2>
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>

          <aside className={styles.aside} aria-label="Other ways to connect">
            <div className={styles.infoCard}>
              <h2 className={styles.h3}>Other ways to connect</h2>
              {author.email ? (
                <p className={styles.row}>
                  <Icon name="mail" /> <a href={`mailto:${author.email}`}>{author.email}</a>
                </p>
              ) : (
                <DevNote>add your email in src/content/site.ts → contactEmail</DevNote>
              )}
              {author.social.youtube && (
              <p className={styles.row}>
                <Icon name="youtube" />
                <a href={author.social.youtube} target="_blank" rel="noopener noreferrer">
                  YouTube channel<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </p>
              )}
              <div style={{ marginTop: "var(--space-4)" }}>
                <SocialLinks />
              </div>
            </div>
            <div className={styles.infoCard}>
              <h2 className={styles.h3}>Schools, churches &amp; ministries</h2>
              <p style={{ margin: 0 }}>
                Interested in Kiddies Daily Devotional for your classroom, Sunday school or children&apos;s ministry? Choose “School or church” or
                “Book order or bulk purchase” in the form and share a few details.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
