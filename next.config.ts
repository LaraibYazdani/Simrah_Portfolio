import type { NextConfig } from "next";

// Every page is statically generated at build time from /content,
// so the site deploys to Vercel with zero extra configuration.
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
