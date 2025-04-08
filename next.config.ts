import type { NextConfig } from "next";
import withPWA from "next-pwa";

// next-pwa 버전 8 이상용 설정
const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  /* config options here */
  api: {
    bodyParser: {
      sizeLimit: "10mb", // 기본값 1mb에서 10mb로 증가
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default pwaConfig(nextConfig as any);
