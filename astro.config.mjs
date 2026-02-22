import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import { mermaidLight } from "./src/lib/colors.ts";
import nanoDark from "./src/lib/shiki-theme-dark.json";
import nanoLight from "./src/lib/shiki-theme-light.json";

export default defineConfig({
  site: "https://astro-nano-demo.vercel.app",
  markdown: {
    shikiConfig: {
      themes: {
        light: nanoLight,
        dark: nanoDark,
      },
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    mermaid({
      theme: "base",
      autoTheme: false,
      mermaidConfig: {
        flowchart: {
          curve: "basis",
        },
        startOnLoad: false,
        logLevel: "error",
        securityLevel: "strict",
        darkMode: false,
        themeVariables: mermaidLight,
      },
    }),
  ],
});
