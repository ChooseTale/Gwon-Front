import type { Config } from "tailwindcss";
// import sharedConfig from "@repo/tailwind-config";

export const colors = {
  white: "#ffffff",
  "background-dark": "#191919",
  "font-dark": "#f2f2f2",
  black: "#111111",

  "gray-10": "#f7f7f7",
  "gray-50": "#efefef",
  "gray-100": "#d2d2d2",
  "gray-200": "#bbbbbb",
  "gray-300": "#a4a4a4",
  "gray-400": "#8e8e8e",
  "gray-500": "#777777",
  "gray-600": "#636363",
  "gray-700": "#4f4f4f",
  "gray-800": "#3c3c3c",
  "gray-900": "#282828",
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
  "ending-gradiant": "linear-gradient(90deg, #40FC6C, #45DCD2, #61D2FF)",
};

export const boxShadows = {};

const config: Pick<Config, "content" | "presets" | "plugins" | "theme"> = {
  content: ["./src/**/*.{ts,tsx}"],
  // presets: [sharedConfig],
  // plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s ease-out",
      },
      screens: {
        xs: "320px",
        cardScreen1: "458px",
        cardScreen2: "596px",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        ...colors,
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      boxShadow: {
        ...boxShadows,
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    ({ addComponents }: { addComponents: any }) => {
      addComponents({
        ".title1-sb": {
          fontSize: "20px",
          fontWeight: "600",
          lineHeight: "28px",
        },
        ".title1-md": {
          fontSize: "20px",
          fontWeight: "500",
          lineHeight: "28px",
        },
        ".title1-rg": {
          fontSize: "20px",
          fontWeight: "400",
          lineHeight: "28px",
        },
        ".title2-sb": {
          fontSize: "18px",
          fontWeight: "600",
          letterSpacing: "-0.025em",
          lineHeight: "25.2px",
        },
        ".title2-md": {
          fontSize: "18px",
          fontWeight: "500",
          letterSpacing: "-0.025em",
          lineHeight: "25.2px",
        },
        ".title2-rg": {
          fontSize: "18px",
          fontWeight: "400",
          letterSpacing: "-0.025em",
          lineHeight: "25.2px",
        },
        ".headline-sb": {
          fontSize: "16px",
          fontWeight: "600",
          lineHeight: "22.4px",
        },
        ".headline-md": {
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "22.4px",
        },
        ".headline-rg": {
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "22.4px",
        },
        ".body-sb": {
          fontSize: "14px",
          fontWeight: "600",
          letterSpacing: "-2.5%",
          lineHeight: "19.6px",
        },
        ".body-md": {
          fontSize: "14px",
          fontWeight: "500",
          letterSpacing: "-2.5%",
          lineHeight: "19.6px",
        },
        ".body-rg": {
          fontSize: "14px",
          fontWeight: "400",
          letterSpacing: "-2.5%",
          lineHeight: "19.6px",
        },
        ".caption-sb": {
          fontSize: "12px",
          fontWeight: "600",
          letterSpacing: "-2.5%",
          lineHeight: "16.8px",
        },
        ".caption-md": {
          fontSize: "12px",
          fontWeight: "500",
          letterSpacing: "-2.5%",
          lineHeight: "16.8px",
        },
        ".caption-rg": {
          fontSize: "12px",
          fontWeight: "400",
          letterSpacing: "-2.5%",
          lineHeight: "16.8px",
        },
        ".ending-gradiant": {
          background: "linear-gradient(90deg, #40FC6C, #45DCD2, #61D2FF)",
        },
        ".ending-gradiant-90": {
          background: "linear-gradient(180deg, #40FC6C, #45DCD2, #61D2FF)",
        },
        ".bottom-sheet": {
          background:
            "linear-gradient(180deg, rgba(40, 40, 40, 0), rgba(40, 40, 40, 0.5), rgba(40, 40, 40, 1))",
        },
        ".drop-shadow": {
          boxShadow: "0px -2px 8px 0px #6363631A",
        },
        ".drop-shadow-2": {
          boxShadow: "0px 0px 16px 0px #40404026",
        },
      });
    },
    require("tailwindcss-animate"),
  ],
};

export default config;
