import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "07-year-sorting-example",
  config: {
    title: "Year sorting example",
    description: "Nano groups posts by year.",
    date: new Date("2023-12-31"),
    draft: false,
    tags: [TAGS.ASTRO, TAGS.TYPESCRIPT, TAGS.TUTORIAL],
  },
} as const satisfies BlogPostReference;
