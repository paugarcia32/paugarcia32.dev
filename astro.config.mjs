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
      theme: "base",
      autoTheme: false,
      mermaidConfig: {
        flowchart: {
          curve: "basis",
        },
        startOnLoad: false,
        logLevel: "error",
        securityLevel: "strict",
        // Modo claro por defecto - CSS se encargará del modo oscuro
        darkMode: false,
        themeVariables: {
          // Colores principales
          primaryColor: "#D4A27F", // kraft - fondo de nodos
          primaryTextColor: "#191919", // slate-dark - texto en nodos
          primaryBorderColor: "#CC785C", // book-cloth - bordes principales
          // Líneas y conexiones
          lineColor: "#CC785C", // book-cloth
          // Colores secundarios
          secondaryColor: "#EBDBBC", // manilla
          secondaryTextColor: "#191919",
          secondaryBorderColor: "#D4A27F", // kraft
          // Colores terciarios
          tertiaryColor: "#E5E4DF", // ivory-dark
          tertiaryTextColor: "#191919",
          tertiaryBorderColor: "#D4A27F",
          // Fondos generales
          background: "#FAFAF7", // ivory-light
          mainBkg: "#F0F0EB", // ivory-medium
          secondBkg: "#E5E4DF", // ivory-dark
          // Texto
          textColor: "#191919", // slate-dark
          labelTextColor: "#191919",
          // Bordes
          border1: "#CC785C", // book-cloth
          border2: "#D4A27F", // kraft
          // Nodos
          nodeBkg: "#FAFAF7", // ivory-light
          nodeBorder: "#CC785C",
          nodeTextColor: "#191919",
          // Clusters
          clusterBkg: "#EBDBBC", // manilla
          clusterBorder: "#D4A27F", // kraft
          // Rellenos específicos por tipo
          fillType0: "#D4A27F", // kraft
          fillType1: "#EBDBBC", // manilla
          fillType2: "#E5E4DF", // ivory-dark
          fillType3: "#F0F0EB", // ivory-medium
          fillType4: "#FAFAF7", // ivory-light
          fillType5: "#CC785C", // book-cloth
          fillType6: "#BFBFBA", // cloud-light
          fillType7: "#91918D", // cloud-medium
          // Tipografía
          fontFamily: "Inter, sans-serif",
        },
      },
    }),
  ],
});
