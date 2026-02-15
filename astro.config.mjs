import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";

export default defineConfig({
  site: "https://astro-nano-demo.vercel.app",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    mermaid({
      theme: "default",
      autoTheme: true,
      mermaidConfig: {
        flowchart: {
          curve: "basis",
        },
        startOnLoad: false,
        logLevel: "error",
        securityLevel: "strict",
      },
    }),
  ],
});
