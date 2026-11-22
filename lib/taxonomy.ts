// Shared between server and client components. No Node imports here.

export type SectionKey = "articles" | "blogs" | "short-captions" | "long-captions" | "editorials";
export type FormatKey = "articles" | "blogs" | "captions" | "editorials";
export type AudienceKey = "engineering-leaders" | "business-owners" | "young-audiences";

export interface Section {
  key: SectionKey;
  number: string;
  title: string;
  format: FormatKey;
  /** One-line description shown under the section heading in the contents. */
  blurb: string;
}

export const SECTIONS: Section[] = [
  {
    key: "articles",
    number: "01",
    title: "Articles",
    format: "articles",
    blurb: "Long-form LinkedIn essays that take a side and leave the reader with a framework.",
  },
  {
    key: "blogs",
    number: "02",
    title: "Blogs",
    format: "blogs",
    blurb: "Research and rulings turned into plain language, quick answer first.",
  },
  {
    key: "short-captions",
    number: "03",
    title: "Short-form captions",
    format: "captions",
    blurb: "Around a hundred words, written to stop the scroll.",
  },
  {
    key: "long-captions",
    number: "04",
    title: "Long-form captions",
    format: "captions",
    blurb: "Civic explainers that fit inside a caption.",
  },
  {
    key: "editorials",
    number: "05",
    title: "Editorials",
    format: "editorials",
    blurb: "Research-led carousels on what young Pakistanis are living through.",
  },
];

export const FORMATS: Record<FormatKey, string> = {
  articles: "Articles",
  blogs: "Blogs",
  captions: "Captions",
  editorials: "Editorials",
};

export const AUDIENCES: Record<AudienceKey, string> = {
  "engineering-leaders": "Engineering leaders",
  "business-owners": "Business owners",
  "young-audiences": "Young audiences",
};

/** "Read on LinkedIn", "Watch on Instagram", or "Read on <publication>". */
export function originalLinkLabel(url: string, publication: string): string {
  let host = "";
  try {
    host = new URL(url).hostname;
  } catch {
    /* fall through to the publication name */
  }
  if (host.includes("linkedin.")) return "Read on LinkedIn";
  if (host.includes("instagram.")) return "Watch on Instagram";
  return `Read on ${publication}`;
}

export function sectionOf(key: SectionKey): Section {
  return SECTIONS.find((s) => s.key === key)!;
}
