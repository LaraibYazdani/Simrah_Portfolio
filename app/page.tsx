import Link from "next/link";
import { site } from "@/content/site";
import { getAllPieces, toMeta, type Piece } from "@/lib/content";
import { AUDIENCES, SECTIONS, sectionOf } from "@/lib/taxonomy";
import { ContentsBrowser } from "@/components/ContentsBrowser";
import { ModeToggle } from "@/components/ModeToggle";
import { Correspondence } from "@/components/Correspondence";

function Timing({ p }: { p: Piece }) {
  if (!p.skimmable) return <span>{p.words} words</span>;
  return (
    <span>
      <span className="only-deep">{p.readLabel} read</span>
      <span className="only-skim">{p.skimLabel} skim</span>
    </span>
  );
}

function Story({ p, variant }: { p: Piece; variant: "lead" | "side" }) {
  const section = sectionOf(p.section);
  return (
    <Link href={`/writing/${p.slug}`} className={`story story--${variant}`}>
      <div className="story__kickers">
        <span className="kicker kicker--accent">{variant === "lead" ? "Cover story" : section.title}</span>
        {p.startHere && <span className="stamp">Start here</span>}
      </div>
      <h2 className="display story__title">{p.shortTitle}</h2>
      <p className="story__dek only-deep">{p.note}</p>
      <p className="story__line only-skim">{p.takeaway}</p>
      <div className="meta">
        <span>{p.publication}</span>
        <span>{p.dateLabel}</span>
        <Timing p={p} />
      </div>
      <span className="readmore">
        Read the piece <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default function Home() {
  const pieces = getAllPieces();
  const bySlug = new Map(pieces.map((p) => [p.slug, p]));
  const startHere = pieces.filter((p) => p.startHere);
  const lead = startHere[0] ?? pieces[0];
  const second = startHere[1] ?? pieces[1];
  const alsoInside = pieces.filter((p) => p !== lead && p !== second && (p.section === "articles" || p.section === "blogs"));
  const captions = pieces.filter((p) => sectionOf(p.section).format === "captions");
  const formats = new Set(SECTIONS.map((s) => s.format)).size;

  return (
    <>
      <div className="wrap">
        {/* ---------- Masthead ---------- */}
        <header className="masthead">
          <div className="masthead__top reveal">
            <p className="ear">
              “All the writing
              <br />
              that’s fit to skim.”
            </p>
            <h1 className="masthead__title">Simrah Zahid</h1>
            <p className="ear ear--right">
              The Writing Portfolio
              <br />
              {site.location}
            </p>
          </div>
          <div className="masthead__under reveal reveal-3">
            <span className="kicker">Content writer · Designer · Strategist</span>
            <p className="masthead__tagline">{site.tagline}</p>
            <span className="kicker">
              {pieces.length} pieces · {formats} formats
            </span>
          </div>
        </header>

        <div className="invite reveal reveal-4">
          <span>
            <strong>Short on time?</strong> Switch to Skim. Every piece folds down to its quick answer, its headings and
            the lines Simrah bolded for skimmers.
          </span>
          <ModeToggle label="Reading mode (home)" />
        </div>

        {/* ---------- Cover spread ---------- */}
        <section className="cover" aria-label="Start here">
          <div className="cover__main">
            <Story p={lead} variant="lead" />
          </div>
          <div className="cover__side">
            <Story p={second} variant="side" />
            <div className="also">
              <p className="kicker also__label">Also in this issue</p>
              {alsoInside.map((p) => (
                <Link key={p.slug} href={`/writing/${p.slug}`} className="story also__item">
                  <span className="display story__title">{p.shortTitle}</span>
                  <span className="meta">
                    <span>{p.publication}</span>
                    <Timing p={p} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Contents ---------- */}
        <section className="section" id="contents" aria-labelledby="contents-title">
          <div className="section__head">
            <h2 className="display section__title" id="contents-title">
              In this <em>issue</em>
            </h2>
            <span className="kicker">Filter by who it’s written for, or by format</span>
          </div>
          <ContentsBrowser pieces={pieces.map(toMeta)} />
        </section>

        {/* ---------- Lines worth stealing ---------- */}
        <section className="section" id="lines" aria-labelledby="lines-title">
          <div className="section__head">
            <h2 className="display section__title" id="lines-title">
              Lines worth <em>stealing</em>
            </h2>
            <span className="kicker">Verbatim, from the pieces in this issue</span>
          </div>
          <div className="lines">
            {site.lines.map((l, i) => {
              const p = bySlug.get(l.slug);
              return (
                <Link key={i} href={`/writing/${l.slug}`} className="line">
                  <blockquote>{l.text}</blockquote>
                  <span className="line__src">
                    {p ? `${p.shortTitle} · ${p.publication}` : "Read the piece"} →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ---------- From the feed ---------- */}
        <section className="section" id="feed" aria-labelledby="feed-title">
          <div className="section__head">
            <h2 className="display section__title" id="feed-title">
              From the <em>feed</em>
            </h2>
            <span className="kicker">Instagram captions for PatriotsWithIssues, shown in full</span>
          </div>
          <div className="clippings">
            {captions.map((p) => (
              <article className="clipping" key={p.slug}>
                <div className="clipping__head">
                  <span className="kicker kicker--accent">{sectionOf(p.section).title}</span>
                  <span className="kicker">{p.words} words</span>
                </div>
                <h3 className="clipping__title">
                  <Link href={`/writing/${p.slug}`}>{p.title}</Link>
                </h3>
                <div className="clipping__body" dangerouslySetInnerHTML={{ __html: p.html }} />
                <div className="clipping__foot">
                  <span>{p.credit || p.publication}</span>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      Watch the reel ↗
                    </a>
                  ) : (
                    <span>{p.audiences.map((a) => AUDIENCES[a]).join(", ")}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Editor's letter ---------- */}
        <section className="section section--last" id="letter" aria-labelledby="letter-title">
          <div className="letter">
            <div>
              <span className="kicker kicker--accent">From the writer</span>
              <h2 className="display letter__title" id="letter-title">
                A note before you read
              </h2>
            </div>
            <div>
              <div className="letter__body">
                {site.letter.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <p className="letter__sign">Simrah</p>
            </div>
          </div>
        </section>

        <Correspondence />
      </div>
    </>
  );
}
