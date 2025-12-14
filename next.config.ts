import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: We removed output: "export" because:
  // - Vercel handles Next.js natively and doesn't need static export
  // - GitHub Pages deployment uses a separate workflow that sets output: "export" via env
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" && {
    output: "export",
    images: {
      unoptimized: true,
    },
  }),
  // We use an environment variable for the base path to support both Vercel (root) and GitHub Pages (subpath)
  // Vercel: BASE_PATH is undefined (or "") -> serves at root /
  // GitHub Pages: BASE_PATH is set to "/imposter" -> serves at /imposter
  basePath: process.env.BASE_PATH || "",
  assetPrefix: process.env.BASE_PATH || "",
};

export default nextConfig;
