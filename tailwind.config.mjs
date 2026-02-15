import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        // Anthropic color palette - Neutrals
        slate: {
          dark: "#191919",
          medium: "#262625",
          light: "#40403E",
        },
        cloud: {
          dark: "#666663",
          medium: "#91918D",
          light: "#BFBFBA",
        },
        ivory: {
          dark: "#E5E4DF",
          medium: "#F0F0EB",
          light: "#FAFAF7",
        },
        // Anthropic color palette - Warm colors
        "book-cloth": "#CC785C",
        kraft: "#D4A27F",
        manilla: "#EBDBBC",
        // System colors
        black: "#000000",
        white: "#FFFFFF",
        focus: "#2A94F2",
        error: "#EF4D43",
        // Semantic colors (for easy theme switching)
        primary: "#CC785C", // book-cloth for accents
        accent: "#D4A27F", // kraft for secondary accents
      },
    },
  },
  plugins: [typography],
};
