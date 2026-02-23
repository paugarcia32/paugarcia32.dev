import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "full-mobile-redesign",
  config: {
    title: "Full Mobile App Redesign",
    description: "Complete redesign and architectural migration of the MAAT mobile app from Firebase/Firestore to PostgreSQL with a new UI.",
    date: new Date("2025-06-01"),
    draft: true,
    tags: [TAGS.FLUTTER, TAGS.NESTJS, TAGS.TYPESCRIPT, TAGS.POSTGRESQL],
    workPosition: "maat/junior-engineer",
  },
} as const satisfies ProjectReference;
