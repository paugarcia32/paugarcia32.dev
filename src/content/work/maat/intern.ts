import * as TAGS from "@/tags";
import type { WorkPositionConfig } from "@/types";

export const config: WorkPositionConfig = {
  role: "Software Engineering Intern",
  dateStart: new Date("2024-12-09"),
  dateEnd: new Date("2025-02-14"),
  description:
    "Part-time internship while completing my bachelor's degree, focused on learning Flutter mobile app development.",
  tags: [TAGS.FLUTTER, TAGS.MOBILE_DEVELOPMENT],
} as const;
