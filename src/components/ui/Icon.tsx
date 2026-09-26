/**
 * Minimal line-icon set (24×24, stroke = currentColor).
 * Decorative by default; pass `label` to expose it to screen readers.
 */
const paths = {
  book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5",
  "book-open": "M2 5c3-1.5 6.5-1.5 10 1 3.5-2.5 7-2.5 10-1v14c-3-1.5-6.5-1.5-10 1-3.5-2.5-7-2.5-10-1V5Z M12 6v14",
  calendar: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z M4 10h16 M8 2v4 M16 2v4 M8 14h2 M14 14h2 M8 17h2",
  topic: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z",
  verse: "M6 3h12v18l-6-4-6 4V3Z M9 8h6 M9 11h4",
  narration: "M4 5h16v11H10l-6 4.5V5Z M8 9h8 M8 12h5",
  illustration: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z M3 16l5-5 4 4 3-3 6 6 M15.5 8.5h.01",
  prayer: "M12 20.5s-7.5-4.6-7.5-10.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 2.5c0 5.8-7.5 10.4-7.5 10.4Z",
  sprout: "M12 21v-8 M12 13c0-4.4 3-7.5 8.5-7.5 0 5.3-3.2 7.5-8.5 7.5Z M12 15.5c0-3.3-2.6-5.5-7.5-5.5 0 3.8 2.7 5.5 7.5 5.5Z",
  heart: "M12 20.5s-7.5-4.6-7.5-10.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 2.5c0 5.8-7.5 10.4-7.5 10.4Z",
  child: "M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M6 22v-6l-2-4 5-2h6l5 2-2 4v6 M9 22v-5h6v5",
  parents: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M17 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z M2 21v-3a5 5 0 0 1 10 0v3 M13.5 21v-2.5a3.5 3.5 0 0 1 7 0V21",
  school: "M2 9l10-5 10 5-10 5L2 9Z M6 11v5.5c3.5 2.5 8.5 2.5 12 0V11 M22 9v6",
  church: "M12 2v4 M10 4h4 M5 21V11l7-5 7 5v10 M10 21v-4a2 2 0 0 1 4 0v4 M3 21h18",
  family: "M3 11l9-7 9 7 M5 9.5V21h14V9.5 M12 18.5s-3-1.8-3-4a1.6 1.6 0 0 1 3-.9 1.6 1.6 0 0 1 3 .9c0 2.2-3 4-3 4Z",
  mail: "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z M3 7l9 6 9-6",
  "arrow-right": "M5 12h14 M13 6l6 6-6 6",
  "arrow-left": "M19 12H5 M11 6l-6 6 6 6",
  external: "M14 4h6v6 M20 4l-9 9 M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  check: "M4 12.5l5 5L20 6.5",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  close: "M5 5l14 14 M19 5L5 19",
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  quote: "M9 7H5v6h4c0 2-1 3.5-3 4 M19 7h-4v6h4c0 2-1 3.5-3 4",
  cart: "M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2 M10 21h.01 M17 21h.01",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  youtube: "M2.5 8.2A3 3 0 0 1 5.2 5.4C7.4 5.1 9.7 5 12 5s4.6.1 6.8.4a3 3 0 0 1 2.7 2.8c.2 1.3.3 2.5.3 3.8s-.1 2.5-.3 3.8a3 3 0 0 1-2.7 2.8c-2.2.3-4.5.4-6.8.4s-4.6-.1-6.8-.4a3 3 0 0 1-2.7-2.8C2.3 14.5 2.2 13.3 2.2 12s.1-2.5.3-3.8Z M10 9v6l5-3-5-3Z",
  instagram: "M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M17.5 6.5h.01",
  facebook: "M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v7h4v-7h3l.5-4H12V7.8c0-.5.4-.8.8-.8H15V3Z",
  tiktok: "M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5 M14 3c.4 2.7 2.4 4.7 5 5",
  x: "M4 4l16 16 M20 4L4 20",
  linkedin: "M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z M8 10v7 M8 7v.01 M12 17v-4a2 2 0 0 1 4 0v4 M12 10v7",
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 22, label, strokeWidth = 1.7 }: { name: IconName; size?: number; label?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
