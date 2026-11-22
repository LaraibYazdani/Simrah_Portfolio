import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { rehypeSkim, type SkimStats } from "./skim";
import { AUDIENCES, SECTIONS, type AudienceKey, type SectionKey } from "./taxonomy";

export interface Slide {
  label: string;
  /** Path under /public, e.g. "/slides/karachi-cover.jpg". Empty = placeholder. */
  image?: string;
}

export interface PieceMeta {
  slug: string;
  title: string;
  shortTitle: string;
  section: SectionKey;
  order: number;
  publication: string;
  platform: string;
  date: string;
  dateLabel: string;
  audiences: AudienceKey[];
  note: string;
  takeaway: string;
  startHere: boolean;
  url: string;
  credit: string;
  media: string;
  role: string;
  slides: Slide[];
  words: number;
  skimWords: number;
  skimmable: boolean;
  readLabel: string;
  skimLabel: string;
}

export interface Piece extends PieceMeta {
  html: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");
const WORDS_PER_MINUTE = 230;
/** Pieces shorter than this read in full even in Skim mode. */
const SKIM_THRESHOLD = 320;

function minutesLabel(words: number): string {
  const seconds = (words / WORDS_PER_MINUTE) * 60;
  if (seconds < 60) return `${Math.max(10, Math.round(seconds / 5) * 5)} sec`;
  return `${Math.round(seconds / 60)} min`;
}

function render(markdown: string, enabled: boolean): { html: string; stats: SkimStats } {
  const stats: SkimStats = { words: 0, skimWords: 0 };
  const html = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSkim, { stats, enabled })
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
  return { html, stats };
}

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function loadPiece(file: string): Piece {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const section = data.section as SectionKey;
  if (!SECTIONS.some((s) => s.key === section)) {
    throw new Error(`content/writing/${file}: unknown section "${String(data.section)}"`);
  }
  const audiences = (Array.isArray(data.audiences) ? data.audiences : []).filter(
    (a: unknown): a is AudienceKey => typeof a === "string" && a in AUDIENCES,
  );

  // Decide skimmability on plain word count before rendering.
  const roughWords = content.trim().split(/\s+/).length;
  const skimmable = roughWords >= SKIM_THRESHOLD;
  const { html, stats } = render(content, skimmable);

  const title = str(data.title, slug);
  return {
    slug,
    title,
    shortTitle: str(data.shortTitle, title),
    section,
    order: typeof data.order === "number" ? data.order : 99,
    publication: str(data.publication),
    platform: str(data.platform),
    date: str(data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date),
    dateLabel: str(data.dateLabel),
    audiences,
    note: str(data.note),
    takeaway: str(data.takeaway),
    startHere: data.startHere === true,
    url: str(data.url),
    credit: str(data.credit),
    media: str(data.media),
    role: str(data.role),
    slides: Array.isArray(data.slides)
      ? data.slides.map((s: { label?: unknown; image?: unknown }) => ({ label: str(s.label), image: str(s.image) }))
      : [],
    words: stats.words,
    skimWords: stats.skimWords,
    skimmable,
    readLabel: minutesLabel(stats.words),
    skimLabel: minutesLabel(stats.skimWords),
    html,
  };
}

let cache: Piece[] | null = null;

/** All pieces, in contents order: by section, then the `order` field. */
export function getAllPieces(): Piece[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const sectionIndex = (k: SectionKey) => SECTIONS.findIndex((s) => s.key === k);
  cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(loadPiece)
    .sort((a, b) => sectionIndex(a.section) - sectionIndex(b.section) || a.order - b.order);
  return cache;
}

export function getPiece(slug: string): Piece | undefined {
  return getAllPieces().find((p) => p.slug === slug);
}

/** Metadata only (no HTML), safe to pass to client components. */
export function toMeta({ html: _html, ...meta }: Piece): PieceMeta {
  return meta;
}
