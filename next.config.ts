import type { NextConfig } from "next";

// Redirects live in redirects.mjs; Apache applies them via out/.htaccess.
const nextConfig: NextConfig = {
  // Bluehost's WordPress plan can't run Node, so the site ships as static files.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    // YouTube thumbnails for the "Watch & Connect" section.
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
