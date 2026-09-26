"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { BookImage } from "@/lib/books";
import { Icon } from "@/components/ui/Icon";
import styles from "./PeekInside.module.css";

type GalleryImage = BookImage & { volume: string };

/**
 * "Peek Inside" gallery. Real images (from `previewImages` in
 * src/content/books.ts) open larger in a dialog. Empty slots are shown as
 * clearly labelled placeholders; no interior pages are invented.
 */
export function PeekInside({ images, placeholderSlots = 3 }: { images: GalleryImage[]; placeholderSlots?: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<GalleryImage | null>(null);

  const show = (img: GalleryImage) => {
    setOpen(img);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <div className={styles.gallery}>
        {images.map((img, i) => (
          <figure key={img.src} className={styles.item} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
            <button type="button" className={styles.thumb} onClick={() => show(img)} aria-label={`View larger: ${img.alt}`}>
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 700px) 92vw, 420px" className={styles.img} />
              <span className={styles.zoom} aria-hidden="true">
                <Icon name="eye" size={18} /> View larger
              </span>
            </button>
            <figcaption className={styles.caption}>
              <span className={styles.vol}>{img.volume}</span>
              {img.caption}
            </figcaption>
          </figure>
        ))}

        {Array.from({ length: placeholderSlots }, (_, i) => (
          <div key={`ph-${i}`} className={styles.placeholder} data-reveal style={{ ["--reveal-delay" as string]: `${(images.length + i) * 90}ms` }}>
            <Icon name="book-open" size={30} />
            <span className={styles.phTitle}>Interior pages</span>
            <span className={styles.phNote}>Preview coming soon</span>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        aria-label={open?.alt ?? "Image preview"}
      >
        {open && (
          <figure className={styles.dialogFigure}>
            <Image src={open.src} alt={open.alt} width={open.width} height={open.height} sizes="(max-width: 900px) 94vw, 860px" className={styles.dialogImg} />
            <figcaption className={styles.dialogCaption}>{open.caption}</figcaption>
          </figure>
        )}
        <form method="dialog">
          <button type="submit" className={styles.close} aria-label="Close preview" autoFocus>
            <Icon name="close" size={22} />
          </button>
        </form>
      </dialog>
    </>
  );
}
