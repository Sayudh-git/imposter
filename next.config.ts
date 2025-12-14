import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // Required for static export to GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // We use an environment variable for the base path to support both Vercel (root) and GitHub Pages (subpath)
  // Vercel: BASE_PATH is undefined (or "") -> serves at root /
  // GitHub Pages: BASE_PATH is set to "/imposter" in output -> serves at /imposter
  basePath: process.env.BASE_PATH || "",
  assetPrefix: process.env.BASE_PATH || "",
};

export default nextConfig;
