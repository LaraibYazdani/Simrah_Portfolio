# Simrah Zahid · Writing Portfolio

An editorial-magazine portfolio built with Next.js. Every page is generated as static HTML at build time from the Markdown files in `content/writing/`, so it deploys to Vercel with no configuration.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # the same production build Vercel runs
```

Requires Node 20.9 or newer.

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository.
2. In Vercel, choose **Add New → Project**, import the repository and keep the defaults. Vercel detects Next.js.
3. Optional: once you have a custom domain, add the environment variable `NEXT_PUBLIC_SITE_URL=https://your-domain.com` so the sitemap and social previews use it. Without it, Vercel's production URL is used automatically.

## How Skim / Deep read works

The toggle in the header (or the **S** key) switches the whole site between two modes. Nothing in the text is ever rewritten. Skim mode only hides and shows what Simrah already wrote:

| Shown in Skim | Folded behind "Show N more words" |
| --- | --- |
| Headings and pull quotes | Paragraphs with no bold text |
| The first paragraph, or one starting "Quick answer" | Lists with no bold text |
| Paragraphs with **bold** text, cut down to the bold line, with a "more" toggle | |

So **the bold you use in a piece decides what skimmers see.** Pieces under 320 words read in full in both modes.

Skim links can be shared: add `?mode=skim` to any URL. Filtered contents can be shared too, e.g. `/?for=business-owners` or `/?format=blogs`.

## Add a new piece

Create `content/writing/your-slug.md`. The file name becomes the URL (`/writing/your-slug`).

```markdown
---
title: "Full headline as published"
shortTitle: "Shorter headline for the contents list"   # optional
section: blogs            # articles | blogs | short-captions | long-captions | editorials
order: 3                  # position within the section
publication: SocioOn
platform: Blog            # LinkedIn article, Instagram caption, Instagram carousel…
date: "2026-10-01"
dateLabel: "Oct 1, 2026"
audiences: [business-owners]   # engineering-leaders | business-owners | young-audiences
note: "One line on what the piece does (shown under the headline)."
takeaway: "The piece's best line, verbatim (shown in Skim mode and the 'In one line' box)."
startHere: false          # true = featured on the cover with a 'Start here' stamp
url: ""                   # link to the original post; leave empty to hide the link
role: ""                  # editorials: e.g. "Research, writing and content planning"
credit: ""                # captions: e.g. "Video via @handle"
slides: []                # carousels, see below
---

Body text in Markdown. Use **bold** for the lines skimmers should see.
```

New sections, audiences or formats go in `lib/taxonomy.ts`. Site-wide copy (intro letter, contact details, "Lines worth stealing") lives in `content/site.ts`.

## Carousel slides

Slide images live in `public/slides/` and are listed in the piece's front matter, in order:

```yaml
slides:
  - label: "Cover"
    image: "/slides/karachi-1-cover.jpg"
```

Readers can click a slide to open it full size (arrow keys or swipe to move, Esc to close). The first slide also appears as a thumbnail in the contents. A slide with no `image` shows a typeset placeholder.

## Links to the originals

Each piece's `url:` field becomes "Read on LinkedIn ↗", "Read on Nexivo ↗" or "Watch on Instagram ↗" on its page, and "Watch the reel ↗" on the home-page caption cards. Leave it empty to hide the link. The two editorials don't have links yet.

## Still to check

- **Notes on captions and editorials.** The PDF had one-line notes only for the articles and blogs. The `note:` lines on the four captions and two editorials are drafts and should be checked by Simrah.
- The `docs/` folder holds the original photo files and isn't used by the site; it can be deleted.
