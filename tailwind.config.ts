/**
 * Tailwind CSS Config — WeJustice Demo
 *
 * Gray family: SLATE (blue-gray undertone, institutional/trustworthy).
 * gray-* scale is defined ONCE in @theme block (wejustice-theme.css).
 * DO NOT remap gray here — it conflicts with Tailwind CSS 4's @theme tokens.
 * Flowbite React components use gray-* internally → they get slate via @theme.
 */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // gray → slate is handled in @theme block (wejustice-theme.css)
        // DO NOT add gray: colors.slate here — causes double-definition in CSS 4
        primary: {
          50: "#FDE2E8", 100: "#FBC5D0", 200: "#FF7A8F", 300: "#FF5E75",
          400: "#FB3049", 500: "#FB3049", 600: "#E0102F", 700: "#C20520",
          800: "#9B0A22", 900: "#740C1E", 950: "#42050F",
        },
        secondary: {
          50: "#f0f4f8", 100: "#d9e2ec", 200: "#bcccdc", 300: "#9fb3c8",
          400: "#829ab1", 500: "#627d98", 600: "#486581", 700: "#334e68",
          800: "#243b53", 900: "#051C3C", 950: "#03111f",
        },
      },
      fontFamily: {
        campton: ["var(--font-campton)", "Campton", "system-ui", "sans-serif"],
        sans: ["var(--font-campton)", "Campton", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
