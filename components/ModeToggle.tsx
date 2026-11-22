"use client";

import { setMode, useMode, type Mode } from "./mode";

const OPTIONS: { value: Mode; label: string }[] = [
  { value: "skim", label: "Skim" },
  { value: "deep", label: "Deep read" },
];

export function ModeToggle({ label = "Reading mode" }: { label?: string }) {
  const mode = useMode();
  return (
    <div className="mode" role="group" aria-label={label} title="Press S to switch">
      {OPTIONS.map((o) => (
        <button key={o.value} type="button" aria-pressed={mode === o.value} onClick={() => setMode(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
