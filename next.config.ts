import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.sbs.co.kr", "182.172.181.90", "lh3.googleusercontent.com"],
  },
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
