import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "01-getting-started",
  config: {
    title: "Getting started",
    description: "Hit the ground running.",
    date: new Date("2024-03-22"),
    draft: false,
    tags: [TAGS.ASTRO, TAGS.TUTORIAL, TAGS.WEB_DEVELOPMENT],
  },
} as const satisfies BlogPostReference;
