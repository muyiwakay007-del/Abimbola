import { kddVolumes, formatDate, primaryPurchase, type Book } from "@/lib/books";
import styles from "./landing.module.css";

type Row = { label: string; get: (b: Book) => string | null };

/**
 * Neutral, side-by-side facts for the volumes, built entirely from
 * src/content/books.ts. Rows with no data for any volume are skipped.
 */
export function CompareVolumes() {
  const allFormats = [...new Set(kddVolumes.flatMap((b) => b.formats.map((f) => f.format)))];
  const vol = (b: Book) => b.series?.volume ?? 0;

  const rows: Row[] = ([
    { label: "Daily devotionals", get: (b) => (b.devotionalCount ? String(b.devotionalCount) : null) },
    { label: "Where it fits", get: (b) => (vol(b) === 1 ? "The first part of the year" : vol(b) === 2 ? "The second part of the year" : null) },
    { label: "Print length", get: (b) => (b.pages ? `${b.pages} pages` : null) },
    ...allFormats.map<Row>((format) => ({
      label: format,
      get: (b) => {
        const f = b.formats.find((x) => x.format === format);
        if (!f) return null;
        return f.price ?? `See ${primaryPurchase(b)?.name ?? "retailer"}`;
      },
    })),
    { label: "Reading age", get: (b) => b.readingAge },
    { label: "Published", get: (b) => (b.publicationDate ? formatDate(b.publicationDate) : null) },
    { label: "ISBN-13", get: (b) => b.isbn },
  ] as Row[]).filter((r) => kddVolumes.some((b) => r.get(b)));

  return (
    <div className={styles.compareWrap} data-reveal>
      <table className={styles.compare}>
        <caption className={styles.compareCaption}>Compare the volumes</caption>
        <thead>
          <tr>
            <td />
            {kddVolumes.map((b) => (
              <th key={b.slug} scope="col" className={vol(b) === 2 ? styles.colPlum : styles.colTeal}>
                Volume {vol(b)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {kddVolumes.map((b) => (
                <td key={b.slug}>{r.get(b) ?? "Not listed"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
