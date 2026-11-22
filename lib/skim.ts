/**
 * rehype plugin that prepares an article for Skim mode.
 *
 * Simrah's writing is built for skimmers: a "quick answer" lede, framework
 * headings, and bolded key lines. Skim mode surfaces exactly that structure
 * without editing a word:
 *
 *  - headings and pull quotes always stay visible
 *  - the lede (first paragraph, or one starting "Quick answer") stays in full
 *  - paragraphs with bold text collapse to just the bold line, with a "more" toggle
 *  - everything else folds into an inline "Show N more words" button
 *
 * In Deep mode all of these wrappers are invisible (display: contents), so the
 * piece reads exactly as written.
 */
import type { Element, ElementContent, Root, RootContent } from "hast";

export interface SkimStats {
  words: number;
  skimWords: number;
}

const WHITESPACE = /^\s*$/;

function textOf(node: RootContent | ElementContent | Root): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map((c) => textOf(c as ElementContent)).join("");
  return "";
}

export function countWords(text: string): number {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

function hasStrong(node: ElementContent): boolean {
  if (node.type !== "element") return false;
  if (node.tagName === "strong") return true;
  return node.children.some(hasStrong);
}

function el(tagName: string, className: string[], children: ElementContent[], extra: Record<string, string> = {}): Element {
  return { type: "element", tagName, properties: { className, ...extra }, children };
}

/** Wrap every non-bold run inside a block in <span class="rest">; return visible word count. */
function splitKeyBlock(block: Element): number {
  const out: ElementContent[] = [];
  let run: ElementContent[] = [];
  let hiddenText = "";
  let visible = 0;

  const flush = () => {
    if (!run.length) return;
    const t = run.map(textOf).join("");
    if (WHITESPACE.test(t)) out.push(...run);
    else {
      out.push(el("span", ["rest"], run));
      hiddenText += t;
    }
    run = [];
  };

  for (const child of block.children) {
    if (child.type === "element" && child.tagName === "strong") {
      flush();
      out.push(child);
      visible += countWords(textOf(child));
    } else {
      run.push(child);
    }
  }
  flush();

  // A bold line that starts mid-paragraph gets a leading "…" in Skim mode.
  const first = out.find((n) => n.type === "element" || (n.type === "text" && !WHITESPACE.test(n.value)));
  if (first && first.type === "element" && first.tagName === "span") {
    out.splice(out.indexOf(first) + 1, 0, el("span", ["skim-ellipsis"], [{ type: "text", value: "… " }]));
  }

  if (countWords(hiddenText) > 0) {
    out.push(
      el("button", ["rest-toggle"], [{ type: "text", value: "more" }], {
        type: "button",
        ariaExpanded: "false",
        ariaLabel: "Show the full paragraph",
      }),
    );
  }
  block.children = out;
  return visible;
}

type Classified = { visible: true; words: number } | { visible: false };

function addClass(node: Element, name: string) {
  const existing = node.properties.className;
  const list = Array.isArray(existing) ? existing : existing ? [String(existing)] : [];
  node.properties.className = [...list.map(String), name];
}

export function rehypeSkim(options: { stats: SkimStats; enabled: boolean }) {
  return (tree: Root) => {
    const { stats } = options;
    stats.words = countWords(textOf(tree));

    if (!options.enabled) {
      // Short pieces read in full in both modes.
      stats.skimWords = stats.words;
      const firstP = tree.children.find((c): c is Element => c.type === "element" && c.tagName === "p");
      if (firstP) addClass(firstP, "lede");
      return;
    }

    let seenParagraph = false;

    const classify = (node: Element): Classified => {
      const text = textOf(node);
      switch (node.tagName) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "blockquote":
        case "hr":
          return { visible: true, words: countWords(text) };
        case "p": {
          const isFirst = !seenParagraph;
          seenParagraph = true;
          if (isFirst || /^\s*quick answer/i.test(text)) {
            addClass(node, "lede");
            return { visible: true, words: countWords(text) };
          }
          if (node.children.some(hasStrong)) {
            addClass(node, "key");
            return { visible: true, words: splitKeyBlock(node) };
          }
          return { visible: false };
        }
        case "ul":
        case "ol": {
          const items = node.children.filter((c): c is Element => c.type === "element" && c.tagName === "li");
          if (!items.some((li) => li.children.some(hasStrong))) return { visible: false };
          let words = 0;
          for (const li of items) {
            if (li.children.some(hasStrong)) {
              addClass(li, "key");
              words += splitKeyBlock(li);
            } else addClass(li, "skim-hidden");
          }
          return { visible: true, words };
        }
        default:
          return { visible: false };
      }
    };

    const out: RootContent[] = [];
    let fold: ElementContent[] = [];
    let foldWords = 0;
    let skimWords = 0;

    const flush = () => {
      if (!fold.some((n) => n.type === "element")) {
        out.push(...fold);
      } else {
        out.push(
          el("div", ["fold"], [
            el("button", ["fold-toggle"], [{ type: "text", value: `Show ${foldWords} more words` }], {
              type: "button",
              ariaExpanded: "false",
              dataWords: String(foldWords),
            }),
            el("div", ["fold-body"], fold),
          ]),
        );
      }
      fold = [];
      foldWords = 0;
    };

    for (const child of tree.children) {
      if (child.type !== "element") {
        (fold.length ? fold : out).push(child as ElementContent);
        continue;
      }
      const c = classify(child);
      if (c.visible) {
        flush();
        out.push(child);
        skimWords += c.words;
      } else {
        fold.push(child);
        foldWords += countWords(textOf(child));
      }
    }
    flush();

    tree.children = out;
    stats.skimWords = skimWords;
  };
}
