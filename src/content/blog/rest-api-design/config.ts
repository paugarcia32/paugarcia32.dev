import * as TAGS from "@/tags";
import type { BlogPostReference } from "@/types";

export default {
  slug: "rest-api-design",
  config: {
    title: "REST API Design Principles",
    description:
      "A practical guide to designing REST APIs: endpoints, status codes, versioning, and security.",
    date: new Date("2026-03-06"),
    draft: false,
    tags: [TAGS.BACKEND, TAGS.REST_API, TAGS.SYSTEM_DESIGN],
  },
} as const satisfies BlogPostReference;
