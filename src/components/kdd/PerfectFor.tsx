import Link from "next/link";
import { kddSeries } from "@/content/books";
import { SectionHeading } from "@/components/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./kdd.module.css";

const icons: Record<string, IconName> = { home: "family", church: "church", school: "school", ministry: "child" };

/** "Perfect For": Home, Church, School, Children's Ministry. */
export function PerfectFor({ step }: { step?: string }) {
  return (
    <section data-step={step} className={`section ${styles.perfect}`} aria-labelledby="perfect-title">
      <div className="container">
        <SectionHeading id="perfect-title" eyebrow="Perfect For" title="Wherever children gather around God's Word" />
        <ul className={styles.perfectGrid}>
          {kddSeries.perfectFor.map((p, i) => (
            <li key={p.key} className={styles.perfectCard} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <span className={styles.perfectIcon} aria-hidden="true">
                <Icon name={icons[p.key]} size={30} />
              </span>
              <h3 className={styles.perfectTitle}>{p.title}</h3>
              <p className={styles.perfectText}>{p.text}</p>
            </li>
          ))}
        </ul>
        <p className={styles.perfectNote} data-reveal>
          Serving a group of children? <Link href="/contact?topic=School%20or%20church">Ask about orders for your school, church or ministry</Link>.
        </p>
      </div>
    </section>
  );
}
