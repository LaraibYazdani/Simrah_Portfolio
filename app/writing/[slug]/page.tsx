import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPieces, getPiece } from "@/lib/content";
import { AUDIENCES, originalLinkLabel, sectionOf } from "@/lib/taxonomy";
import { Slides } from "@/components/Slides";
import { Correspondence } from "@/components/Correspondence";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return getAllPieces().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPiece(slug);
  if (!p) return {};
  return {
    title: p.shortTitle,
    description: p.note,
    alternates: { canonical: `/writing/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.note,
      publishedTime: p.date || undefined,
      authors: ["Simrah Zahid"],
    },
  };
}

export default async function PiecePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getPiece(slug);
  if (!p) notFound();

  const all = getAllPieces();
  const index = all.findIndex((x) => x.slug === p.slug);
  const prev = all[index - 1];
  const next = all[index + 1];
  const section = sectionOf(p.section);
  const handle = p.publication.toLowerCase().replace(/\s+/g, "");

  return (
    <article>
      <div className="wrap">
        <header className="piece-head">
          <div className="piece-head__crumbs kicker reveal">
            <Link href="/#contents">Contents</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/?format=${section.format}#contents`} className="kicker--accent">
              {section.number} {section.title}
            </Link>
          </div>
          <h1 className="display piece-head__title reveal reveal-2">{p.title}</h1>
          <p className="piece-head__dek reveal reveal-3">{p.note}</p>
          <div className="piece-head__meta reveal reveal-4">
            <span>
              <b>{p.publication}</b>, {p.platform}
            </span>
            <span>{p.dateLabel}</span>
            {p.skimmable ? (
              <span className="timer">
                <span className="only-deep">
                  <b>{p.readLabel}</b> read <span className="timer__alt">· {p.skimLabel} skim</span>
                </span>
                <span className="only-skim">
                  <b>{p.skimLabel}</b> skim <span className="timer__alt">· {p.readLabel} full read</span>
                </span>
              </span>
            ) : (
              <span>
                <b>{p.words}</b> words
              </span>
            )}
            {p.url && (
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                {originalLinkLabel(p.url, p.publication)} ↗
              </a>
            )}
          </div>
        </header>

        <div className="piece-layout">
          <div>
            {p.skimmable ? (
              <div className="skim-banner only-skim" role="note">
                <strong>You’re skimming.</strong> This shows the lede, the headings and the lines Simrah bolded,{" "}
                {p.skimWords} of {p.words} words. Open any fold to read a passage in place, or press S for the full
                piece.
              </div>
            ) : (
              <div className="skim-banner only-skim" role="note">
                <strong>Short enough to read in full.</strong> At {p.words} words, this one is the same in both modes.
              </div>
            )}

            <Slides slides={p.slides} title={p.title} handle={handle} />

            <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
          </div>

          <aside className="piece-aside" aria-label="About this piece">
            <div className="piece-aside__block">
              <span className="kicker">In one line</span>
              <p className="piece-aside__line">{p.takeaway}</p>
            </div>
            <div className="piece-aside__block">
              <span className="kicker">Written for</span>
              <div className="piece-aside__tags">
                {p.audiences.map((a) => (
                  <Link key={a} href={`/?for=${a}#contents`} className="tag">
                    {AUDIENCES[a]}
                  </Link>
                ))}
              </div>
            </div>
            {p.role && (
              <div className="piece-aside__block">
                <span className="kicker">Role</span>
                <p>{p.role}</p>
              </div>
            )}
            {p.credit && (
              <div className="piece-aside__block">
                <span className="kicker">Posted with</span>
                <p>{p.credit}</p>
              </div>
            )}
            {p.url && (
              <div className="piece-aside__block">
                <span className="kicker">Original</span>
                <p>
                  <a className="piece-aside__link" href={p.url} target="_blank" rel="noopener noreferrer">
                    {originalLinkLabel(p.url, p.publication)} ↗
                  </a>
                </p>
              </div>
            )}
          </aside>
        </div>

        <nav className="next" aria-label="Keep reading">
          {prev ? (
            <Link href={`/writing/${prev.slug}`}>
              <span className="kicker">← Previous</span>
              <div className="next__title">{prev.shortTitle}</div>
            </Link>
          ) : (
            <Link href="/#contents">
              <span className="kicker">← Back</span>
              <div className="next__title">All contents</div>
            </Link>
          )}
          {next ? (
            <Link href={`/writing/${next.slug}`}>
              <span className="kicker">Next →</span>
              <div className="next__title">{next.shortTitle}</div>
            </Link>
          ) : (
            <Link href="/#contents">
              <span className="kicker">Back to →</span>
              <div className="next__title">All contents</div>
            </Link>
          )}
        </nav>

        <Correspondence />
      </div>
    </article>
  );
}
