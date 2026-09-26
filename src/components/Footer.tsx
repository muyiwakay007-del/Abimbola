import Link from "next/link";
import { mainNav, site } from "@/content/site";
import { bookOrder, bookHref } from "@/content/books";
import { SocialLinks } from "@/components/SocialLinks";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            {site.name}
          </Link>
          <p className={styles.tagline}>{site.tagline}</p>
          <p className={styles.bio}>{site.shortBio}</p>
          <SocialLinks tone="light" />
        </div>

        <nav aria-label="Footer" className={styles.col}>
          <h2 className={styles.heading}>Explore</h2>
          <ul className={styles.list}>
            {mainNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>Books</h2>
          <ul className={styles.list}>
            {bookOrder.map((b) => (
              <li key={b.slug}>
                <Link href={bookHref(b)} className={styles.link}>
                  {b.placeholder ? "New book: coming soon" : b.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Connect</h2>
          <ul className={styles.list}>
            <li>
              <a href={site.youtube.subscribeUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                Subscribe on YouTube<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/#newsletter" className={styles.link}>
                Join the newsletter
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>
            © {year} {site.name}. Written with faith &amp; hope.
          </p>
          <p>
            <Link href="/books" className={styles.link}>
              Kiddies Daily Devotional
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
