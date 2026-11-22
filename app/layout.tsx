import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter_Tight, Newsreader, Playfair_Display } from "next/font/google";
import { site } from "@/content/site";
import { ModeToggle } from "@/components/ModeToggle";
import { ReaderControls } from "@/components/ReaderControls";
import { modeBootScript } from "@/lib/modeBoot";
import { siteUrl } from "@/lib/url";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${site.name} · Writing Portfolio`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.linkedin }],
  openGraph: {
    type: "website",
    siteName: `${site.name} · Writing Portfolio`,
    title: `${site.name} · Writing Portfolio`,
    description: site.description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf6",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${newsreader.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: modeBootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="folio">
          <div className="wrap folio__inner">
            <Link href="/" className="folio__name">
              Simrah Zahid<span>.</span>
            </Link>
            <nav className="folio__nav" aria-label="Sections">
              <Link href="/#contents">Contents</Link>
              <Link href="/#lines">Lines</Link>
              <Link href="/#letter">About</Link>
              <Link href="/#contact">Contact</Link>
            </nav>
            <div className="folio__mode">
              <ModeToggle />
            </div>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="colophon">
          <div className="wrap colophon__inner">
            <span>
              {site.name}, {site.location}
            </span>
            <span>
              <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={site.linkedin}>{site.linkedinLabel}</a>
            </span>
            <span>Set in Playfair Display, Newsreader and Inter Tight. Press S to skim.</span>
          </div>
        </footer>
        <ReaderControls />
      </body>
    </html>
  );
}
