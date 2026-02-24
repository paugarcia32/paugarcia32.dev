import * as TAGS from "@/tags";
import type { WorkPositionConfig } from "@/types";

export const config: WorkPositionConfig = {
  role: "Junior Software Engineer",
  dateStart: new Date("2025-02-15"),
  dateEnd: new Date("2026-02-28"),
  description:
    "Full-stack development for a SaaS platform serving martial arts academies, working with Flutter (mobile), NestJS/TypeScript (backend), and Firestore.",
  tags: [
    TAGS.FLUTTER,
    TAGS.NESTJS,
    TAGS.TYPESCRIPT,
    TAGS.FIRESTORE,
    TAGS.FULL_STACK,
  ],
} as const;
