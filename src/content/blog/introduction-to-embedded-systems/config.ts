import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "introduction-to-embedded-systems",
  config: {
    title: "Introduction to Embedded Systems",
    description:
      "A practical starting point for embedded systems: setting up the environment, choosing hardware, and learning by building.",
    date: new Date("2024-04-28"),
    draft: false,
    tags: [TAGS.IOT, TAGS.ARDUINO, TAGS.ESP32],
  },
} as const satisfies BlogPostReference;
