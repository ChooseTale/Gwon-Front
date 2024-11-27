import type { Config } from "tailwindcss";
// import sharedConfig from "@repo/tailwind-config";

export const colors = {
  white: "#ffffff",
  "background-dark": "#191919",
  "font-dark": "#f2f2f2",
  black: "#111111",
  "grey-50": "#efefef",
  "grey-100": "#d2d2d2",
  "grey-200": "#bbbbbb",
  "grey-300": "#a4a4a4",
  "grey-400": "#8e8e8e",
  "grey-500": "#777777",
  "grey-600": "#636363",
  "grey-700": "#4f4f4f",
  "grey-800": "#3c3c3c",
  "grey-900": "#282828",
  "green-100": "#b5ecc9",
  "green-200": "#91e2af",
  "green-300": "#6cd894",
  "green-400": "#47cf79",
  "green-500": "#22c55e",
  "green-600": "#1ca44e",
  "green-700": "#17833f",
  "green-800": "#11632f",
  "green-900": "#0b421f",
  "system-red": "#ff3b30",
  "system-blue": "#007aff",
  "system-yellow": "#ffcc00",
};

const config: Pick<Config, "content" | "presets" | "plugins" | "theme"> = {
  content: ["./src/**/*.{ts,tsx}"],
  // presets: [sharedConfig],
  // plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        ...colors,
      },
      fontSize: {
        title1: "1.25rem",
        title2: "1.125rem",
        headline: "1rem",
        body: "0.875rem",
        caption: "0.75rem",
      },
      lineHeight: {
        "140": "1.4",
      },
    },
  },
  plugins: [
    ({ addComponents }: { addComponents: any }) => {
      addComponents({
        ".title1-sb": {
          fontSize: "20px",
          fontWeight: "600",
          lineHeight: "1.4",
        },
        ".title1-md": {
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "1.4",
        },
        ".title1-rg": {
          fontSize: "20px",
          fontWeight: "400",
          lineHeight: "1.4",
        },
        ".title2-sb": {
          fontSize: "18px",
          fontWeight: "600",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".title2-md": {
          fontSize: "18px",
          fontWeight: "500",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".title2-rg": {
          fontSize: "18px",
          fontWeight: "400",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".headline-sb": {
          fontSize: "16px",
          fontWeight: "600",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".headline-md": {
          fontSize: "16px",
          fontWeight: "500",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".headline-rg": {
          fontSize: "16px",
          fontWeight: "400",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".body-sb": {
          fontSize: "14px",
          fontWeight: "600",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".body-md": {
          fontSize: "14px",
          fontWeight: "500",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".body-rg": {
          fontSize: "14px",
          fontWeight: "400",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".caption-sb": {
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".caption-md": {
          fontSize: "12px",
          fontWeight: "500",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
        ".caption-rg": {
          fontSize: "12px",
          fontWeight: "400",
          letterSpacing: "-0.025em",
          lineHeight: "1.4",
        },
      });
    },
  ],
};

export default config;
