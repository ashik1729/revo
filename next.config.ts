import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DESIGN_VARIANT: process.env.DESIGN_VARIANT || "v2",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "realpackpackaging.com",
      },
    ],
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
