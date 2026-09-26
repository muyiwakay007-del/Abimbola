import Link from "next/link";
import type { ReactNode } from "react";
import { kddSeries } from "@/lib/books";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./kdd.module.css";

const ICONS: Record<string, IconName> = {
  home: "family",
  church: "church",
  school: "school",
  ministry: "child",
  parents: "parents",
  schools: "school",
  churches: "church",
  ministries: "child",
  families: "family",
};

type Item = { key: string; title: string; text: string };

/** Audience / setting row: large type divided by hairlines (not cards). */
export function PerfectFor({
  step,
  id = "perfect",
  eyebrow = "Perfect For",
  title = "Wherever children gather around God's Word",
  items = kddSeries.perfectFor,
  showNote = true,
}: {
  step?: string;
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  items?: Item[];
  showNote?: boolean;
}) {
  return (
    <section id={id} data-step={step} className={`section ${styles.perfect}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className={styles.perfectHead} data-reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 id={`${id}-title`} className={styles.perfectTitle2}>
            {title}
          </h2>
        </div>
        <ul className={styles.perfectGrid} style={{ ["--cols" as string]: items.length }}>
          {items.map((p, i) => (
            <li key={p.key} className={styles.perfectCard} data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
              <span className={styles.perfectIcon} aria-hidden="true">
                <Icon name={ICONS[p.key] ?? "heart"} size={30} strokeWidth={1.5} />
              </span>
              <h3 className={styles.perfectTitle}>{p.title}</h3>
              <p className={styles.perfectText}>{p.text}</p>
            </li>
          ))}
        </ul>
        {showNote && (
          <p className={styles.perfectNote} data-reveal>
            Serving a group of children? <Link href="/contact?topic=School%20or%20church">Ask about orders for your school, church or ministry</Link>.
          </p>
        )}
      </div>
    </section>
  );
}
