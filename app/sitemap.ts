import type { MetadataRoute } from "next";
import { getAllPieces } from "@/lib/content";
import { siteUrl } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...getAllPieces().map((p) => ({
      url: `${base}/writing/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
