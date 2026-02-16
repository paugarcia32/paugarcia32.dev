import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "02-blog-collection",
  config: {
    title: "Blog Collection",
    description: "How to add posts to your blog.",
    date: new Date("2024-03-21"),
    draft: false,
    tags: [TAGS.ASTRO, TAGS.CONTENT_COLLECTIONS, TAGS.TUTORIAL],
  },
} as const satisfies BlogPostReference;
