import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";
import { tailwindColors } from "./src/lib/colors.ts";

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
      colors: tailwindColors,
    },
  },
  plugins: [typography],
};
