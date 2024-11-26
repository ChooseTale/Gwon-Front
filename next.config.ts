import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.sbs.co.kr", "i.pinimg.com", "www.shutterstock.com"],
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
