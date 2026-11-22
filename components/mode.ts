"use client";

import { useSyncExternalStore } from "react";
import { MODE_STORAGE_KEY } from "@/lib/modeBoot";

export type Mode = "skim" | "deep";

const EVENT = "sz-mode-change";
function read(): Mode {
  return document.documentElement.dataset.mode === "skim" ? "skim" : "deep";
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function setMode(next: Mode) {
  const root = document.documentElement;
  if (root.dataset.mode === next) return;
  root.dataset.mode = next;
  try {
    localStorage.setItem(MODE_STORAGE_KEY, next);
  } catch {
    /* storage unavailable: mode still applies for this page view */
  }
  root.classList.remove("mode-switching");
  void root.offsetWidth; // restart the cross-fade
  root.classList.add("mode-switching");
  window.setTimeout(() => root.classList.remove("mode-switching"), 500);
  window.dispatchEvent(new Event(EVENT));
}

export function useMode(): Mode {
  return useSyncExternalStore(subscribe, read, () => "deep");
}
