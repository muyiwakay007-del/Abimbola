"use client";

import { useEffect, useState } from "react";
import styles from "./JourneyNav.module.css";

export const JOURNEY = [
  { id: "discover", label: "Discover" },
  { id: "understand", label: "Understand" },
  { id: "preview", label: "Preview" },
  { id: "buy", label: "Buy" },
] as const;

type StepId = (typeof JOURNEY)[number]["id"];

/**
 * Sticky step indicator for the book journey. Sections opt in with
 * `data-step="<id>"`; the step whose section crosses the middle of the
 * screen is highlighted.
 */
export function JourneyNav() {
  const [active, setActive] = useState<StepId>("discover");

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-step]")];
    if (!els.length) return;
    let frame = 0;
    // Active step = the last journey section whose top has passed the middle of the screen.
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let current: StepId = "discover";
      for (const el of els) if (el.getBoundingClientRect().top <= mid) current = el.getAttribute("data-step") as StepId;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const activeIndex = JOURNEY.findIndex((s) => s.id === active);

  return (
    <nav className={styles.bar} aria-label="Kiddies Daily Devotional: your journey">
      <ol className={`container ${styles.steps}`}>
        {JOURNEY.map((s, i) => (
          <li key={s.id} className={styles.item}>
            <a
              href={`#${s.id}`}
              className={`${styles.step} ${i < activeIndex ? styles.done : ""} ${i === activeIndex ? styles.active : ""}`}
              aria-current={i === activeIndex ? "step" : undefined}
            >
              <span className={styles.num} aria-hidden="true">
                {i < activeIndex ? "✓" : i + 1}
              </span>
              <span className={styles.label}>{s.label}</span>
            </a>
            {i < JOURNEY.length - 1 && <span className={styles.arrow} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
