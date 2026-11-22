"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "@/lib/content";

/**
 * The original Instagram carousel: a row of thumbnails that open into a
 * full-size viewer (arrow keys / swipe to move, Esc to close). Slides without
 * an image show a typeset placeholder.
 */
export function Slides({ slides, title, handle }: { slides: Slide[]; title: string; handle: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const viewable = slides.map((s, i) => (s.image ? i : -1)).filter((i) => i >= 0);

  const step = useCallback(
    (dir: 1 | -1) => {
      setIndex((cur) => {
        if (cur === null) return cur;
        const pos = viewable.indexOf(cur);
        return viewable[(pos + dir + viewable.length) % viewable.length];
      });
    },
    [viewable],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) d.close();
  }, [index]);

  if (!slides.length) return null;
  const current = index !== null ? slides[index] : null;

  return (
    <section className="slides" aria-label="Original carousel">
      <div className="slides__head">
        <span className="kicker">The original carousel</span>
        {viewable.length > 0 && <span className="slides__hint">Tap a slide to read it full size</span>}
      </div>
      <div className="slides__row" style={{ ["--count" as string]: slides.length }}>
        {slides.map((s, i) => (
          <figure className="slide" key={`${s.label}-${i}`}>
            {s.image ? (
              <button type="button" className="slide__frame slide__frame--btn" onClick={() => setIndex(i)}>
                <Image
                  src={s.image}
                  alt={`${title}: ${s.label}`}
                  fill
                  sizes="(max-width: 700px) 45vw, 200px"
                />
                <span className="slide__zoom" aria-hidden="true">
                  ⤢
                </span>
              </button>
            ) : (
              <div className="slide__frame">
                <div className="slide__ph" role="img" aria-label={`${s.label} slide (image coming soon)`}>
                  <span className="slide__ph-handle">
                    {i + 1} / {slides.length}
                  </span>
                  {i === 0 ? <span className="slide__ph-title">{title}</span> : <span />}
                  <span className="slide__ph-handle">@{handle}</span>
                </div>
              </div>
            )}
            <figcaption>
              <span className="slide__num">{i + 1}</span> {s.label}
            </figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="viewer"
        aria-label={`${title}, carousel viewer`}
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {current?.image && (
          <figure className="viewer__figure">
            {/* Plain <img>: natural size inside the viewer, no fixed dimensions needed. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.image} alt={`${title}: ${current.label}`} className="viewer__img" />
            <figcaption className="viewer__caption">
              <span>
                {current.label} · {viewable.indexOf(index!) + 1} of {viewable.length}
              </span>
              <span>@{handle}</span>
            </figcaption>
          </figure>
        )}
        {viewable.length > 1 && (
          <>
            <button type="button" className="viewer__nav viewer__nav--prev" onClick={() => step(-1)} aria-label="Previous slide">
              ←
            </button>
            <button type="button" className="viewer__nav viewer__nav--next" onClick={() => step(1)} aria-label="Next slide">
              →
            </button>
          </>
        )}
        <button type="button" className="viewer__close" onClick={() => setIndex(null)} aria-label="Close viewer">
          ✕
        </button>
      </dialog>
    </section>
  );
}
