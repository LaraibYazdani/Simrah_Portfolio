"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className="btn" onClick={copy} aria-live="polite">
      <span className="btn__label">{copied ? "Copied to clipboard" : "Copy email address"}</span>
      <span className="btn__note" aria-hidden="true">
        {copied ? "✓" : "⧉"}
      </span>
    </button>
  );
}
