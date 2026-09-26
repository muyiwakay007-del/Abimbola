import { kddSeries } from "@/lib/books";
import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./DailyParts.module.css";

const icons: Record<string, IconName> = {
  topic: "topic",
  verse: "verse",
  narration: "narration",
  illustration: "illustration",
  prayer: "prayer",
};

/** "What's inside": the five parts of every devotional, as a numbered journey. */
export function DailyParts() {
  return (
    <ol className={styles.list}>
      {kddSeries.dailyParts.map((p, i) => (
        <li key={p.key} className={styles.item} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
          <span className={styles.icon} aria-hidden="true">
            <Icon name={icons[p.key]} size={28} />
          </span>
          <span className={styles.step}>{String(i + 1).padStart(2, "0")}</span>
          <h3 className={styles.title}>{p.title}</h3>
          <p className={styles.text}>{p.text}</p>
        </li>
      ))}
    </ol>
  );
}
