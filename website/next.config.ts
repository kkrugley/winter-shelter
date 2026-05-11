import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
    browsersListForSwc: true,
  },
};

export default nextConfig;
