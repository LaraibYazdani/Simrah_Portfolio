"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { PieceMeta } from "@/lib/content";
import {
  AUDIENCES,
  FORMATS,
  SECTIONS,
  sectionOf,
  type AudienceKey,
  type FormatKey,
} from "@/lib/taxonomy";

type AudienceFilter = AudienceKey | "all";
type FormatFilter = FormatKey | "all";

const AUDIENCE_KEYS = Object.keys(AUDIENCES) as AudienceKey[];
const FORMAT_KEYS = Object.keys(FORMATS) as FormatKey[];

function matches(p: PieceMeta, audience: AudienceFilter, format: FormatFilter) {
  const okAudience = audience === "all" || p.audiences.includes(audience);
  const okFormat = format === "all" || sectionOf(p.section).format === format;
  return okAudience && okFormat;
}

export function ContentsBrowser({ pieces }: { pieces: PieceMeta[] }) {
  const [audience, setAudience] = useState<AudienceFilter>("all");
  const [format, setFormat] = useState<FormatFilter>("all");

  // Read filters from the URL once, so filtered views can be shared (e.g. ?for=business-owners).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const a = q.get("for");
    const f = q.get("format");
    if (a && a in AUDIENCES) setAudience(a as AudienceKey);
    if (f && f in FORMATS) setFormat(f as FormatKey);
  }, []);

  const update = (nextAudience: AudienceFilter, nextFormat: FormatFilter) => {
    setAudience(nextAudience);
    setFormat(nextFormat);
    const q = new URLSearchParams(window.location.search);
    if (nextAudience === "all") q.delete("for");
    else q.set("for", nextAudience);
    if (nextFormat === "all") q.delete("format");
    else q.set("format", nextFormat);
    const qs = q.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}#contents`);
  };

  const visible = useMemo(() => pieces.filter((p) => matches(p, audience, format)), [pieces, audience, format]);
  const filterKey = `${audience}|${format}`;

  const audienceCount = (a: AudienceFilter) => pieces.filter((p) => matches(p, a, format)).length;
  const formatCount = (f: FormatFilter) => pieces.filter((p) => matches(p, audience, f)).length;

  return (
    <div>
      <div className="filters" role="region" aria-label="Filter the contents">
        <div className="filters__group" role="group" aria-label="Filter by reader">
          <span className="kicker filters__label">For</span>
          <button type="button" className="chip" aria-pressed={audience === "all"} onClick={() => update("all", format)}>
            Everyone
          </button>
          {AUDIENCE_KEYS.map((a) => (
            <button
              key={a}
              type="button"
              className="chip"
              aria-pressed={audience === a}
              disabled={audienceCount(a) === 0 && audience !== a}
              onClick={() => update(audience === a ? "all" : a, format)}
            >
              {AUDIENCES[a]}
              <span className="chip__count">{audienceCount(a)}</span>
            </button>
          ))}
        </div>
        <div className="filters__group" role="group" aria-label="Filter by format">
          <span className="kicker filters__label">Format</span>
          <button type="button" className="chip" aria-pressed={format === "all"} onClick={() => update(audience, "all")}>
            All
          </button>
          {FORMAT_KEYS.map((f) => (
            <button
              key={f}
              type="button"
              className="chip"
              aria-pressed={format === f}
              disabled={formatCount(f) === 0 && format !== f}
              onClick={() => update(audience, format === f ? "all" : f)}
            >
              {FORMATS[f]}
              <span className="chip__count">{formatCount(f)}</span>
            </button>
          ))}
        </div>
        <p className="filters__status" aria-live="polite">
          {visible.length} of {pieces.length} pieces
          {(audience !== "all" || format !== "all") && (
            <button type="button" className="filters__reset" onClick={() => update("all", "all")}>
              Clear
            </button>
          )}
        </p>
      </div>

      {visible.length === 0 && <p className="toc-empty">Nothing matches that combination yet.</p>}

      {SECTIONS.map((section) => {
        const entries = visible.filter((p) => p.section === section.key);
        if (!entries.length) return null;
        return (
          <section key={`${section.key}-${filterKey}`} className="toc-section" aria-labelledby={`toc-${section.key}`}>
            <div className="toc-section__num" aria-hidden="true">
              {section.number}
            </div>
            <div>
              <h3 className="toc-section__name" id={`toc-${section.key}`}>
                {section.title}
              </h3>
              <p className="toc-section__blurb">{section.blurb}</p>
              {entries.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/writing/${p.slug}`}
                  className="toc-entry"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <h4 className="toc-entry__title">{p.shortTitle}</h4>
                  <p className="toc-entry__dek only-deep">{p.note}</p>
                  <p className="toc-entry__dek toc-entry__dek--line only-skim">{p.takeaway}</p>
                  <div className="toc-entry__side">
                    {p.slides[0]?.image && (
                      <span className="toc-entry__thumb">
                        <Image src={p.slides[0].image} alt="" fill sizes="54px" />
                      </span>
                    )}
                    <strong>{p.publication}</strong>
                    {p.platform}, {p.dateLabel}
                    <br />
                    {p.skimmable ? (
                      <>
                        <span className="only-deep">{p.readLabel} read</span>
                        <span className="only-skim">{p.skimLabel} skim</span>
                      </>
                    ) : (
                      <span>{p.words} words</span>
                    )}
                  </div>
                  <div className="toc-entry__tags">
                    {p.startHere && <span className="tag tag--accent">Start here</span>}
                    {p.audiences.map((a) => (
                      <span key={a} className="tag">
                        {AUDIENCES[a]}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
