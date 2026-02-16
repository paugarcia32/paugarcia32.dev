import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "03-projects-collection",
  config: {
    title: "Projects Collection",
    description: "How to add projects to your portfolio.",
    date: new Date("2024-03-20"),
    draft: false,
    tags: [TAGS.ASTRO, TAGS.CONTENT_COLLECTIONS, TAGS.PORTFOLIO],
  },
} as const satisfies BlogPostReference;
