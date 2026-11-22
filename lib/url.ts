/**
 * Absolute site URL for metadata, sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists; otherwise Vercel's
 * production URL is used automatically.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
