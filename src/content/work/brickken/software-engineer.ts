import * as TAGS from "@/tags";
import type { WorkPositionConfig } from "@/types";

export const config: WorkPositionConfig = {
  role: "Software Engineer",
  dateStart: new Date("2026-07-07"),
  dateEnd: "Present",
  description:
    "Backend engineering for a digital asset tokenization platform, building event-driven services with Node.js, AWS Lambda, and PostgreSQL.",
  tags: [
    TAGS.NODEJS,
    TAGS.TYPESCRIPT,
    TAGS.AWS,
    TAGS.LAMBDAS,
    TAGS.POSTGRESQL,
    TAGS.BACKEND,
  ],
} as const;
