import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "04-work-collection",
  config: {
    title: "Work Collection",
    description: "How to add work experience.",
    date: new Date("2024-03-19"),
    draft: false,
    tags: [TAGS.ASTRO, TAGS.CONTENT_COLLECTIONS, TAGS.CAREER],
  },
} as const satisfies BlogPostReference;
