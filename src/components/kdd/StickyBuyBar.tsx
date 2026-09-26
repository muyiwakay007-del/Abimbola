"use client";

import { useEffect, useState } from "react";
import styles from "./landing.module.css";

/**
 * Slim mobile-only bar with a single "Choose a Volume" action. It appears once
 * the hero's buttons have scrolled away and hides while the volumes or
 * retailer sections are on screen, so it never covers the real buttons.
 */
export function StickyBuyBar({ watchHidden, target = "#volumes", title, subtitle }: { watchHidden: string[]; target?: string; title: string; subtitle: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("kdd-hero");
    const blockers = watchHidden.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!hero || !("IntersectionObserver" in window)) return;
    const onScreen = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => onScreen.set(e.target, e.isIntersecting));
        const heroVisible = onScreen.get(hero) ?? true;
        const blocked = blockers.some((b) => onScreen.get(b));
        setVisible(!heroVisible && !blocked);
      },
      { threshold: 0 }
    );
    [hero, ...blockers].forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [watchHidden]);

  return (
    <div className={`${styles.sticky} ${visible ? styles.stickyOn : ""}`} aria-hidden={!visible}>
      <span className={styles.stickyText}>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </span>
      <a href={target} className={styles.stickyBtn} tabIndex={visible ? 0 : -1}>
        Choose a Volume
      </a>
    </div>
  );
}
