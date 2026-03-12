import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "vector-databases",
  config: {
    title: "Vector Databases",
    description:
      "How vector databases store and search unstructured data using embeddings and similarity search.",
    date: new Date("2026-03-12"),
    draft: false,
    tags: [TAGS.AI, TAGS.SYSTEM_DESIGN, TAGS.DATABASES],
  },
} as const satisfies BlogPostReference;
