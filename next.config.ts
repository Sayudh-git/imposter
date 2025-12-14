import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // Required for static export to GitHub Pages
  images: {
    unoptimized: true, // Required for static export
  },
  // We assume the repo name is 'imposter' based on the git URL
  // If the user renames the repo to 'kolkata-imposter', this needs to change to '/kolkata-imposter'
  basePath: "/imposter",
  assetPrefix: "/imposter",
};

export default nextConfig;
