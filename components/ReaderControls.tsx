"use client";

import { useEffect } from "react";
import { setMode } from "./mode";

/**
 * Site-wide behaviour for statically rendered prose:
 *  - "Show N more words" folds and "more" toggles inside Skim mode
 *  - the S key flips between Skim and Deep read
 */
export function ReaderControls() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const foldBtn = target.closest<HTMLButtonElement>(".fold-toggle");
      if (foldBtn) {
        const fold = foldBtn.parentElement;
        if (!fold) return;
        const open = fold.classList.toggle("open");
        foldBtn.setAttribute("aria-expanded", String(open));
        foldBtn.textContent = open ? "Fold back" : `Show ${foldBtn.dataset.words} more words`;
        return;
      }

      const restBtn = target.closest<HTMLButtonElement>(".rest-toggle");
      if (restBtn) {
        const block = restBtn.closest(".key");
        if (!block) return;
        const open = block.classList.toggle("open");
        restBtn.setAttribute("aria-expanded", String(open));
        restBtn.textContent = open ? "less" : "more";
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "s" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      setMode(document.documentElement.dataset.mode === "skim" ? "deep" : "skim");
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
