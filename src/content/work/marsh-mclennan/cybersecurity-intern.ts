import * as TAGS from "@/tags";
import type { WorkPositionConfig } from "@/types";

export const config: WorkPositionConfig = {
  role: "Cybersecurity Intern",
  dateStart: new Date("2024-09-02"),
  dateEnd: new Date("2024-12-09"),
  description: "Contributed to GRC initiatives supporting ISO 22301 and ISO 27001 compliance projects, and performed standards mapping between ENS, NIS, and NIS2 frameworks.",
  tags: [TAGS.CYBERSECURITY, TAGS.PYTHON, TAGS.FLASK, TAGS.POWER_BI],
} as const;
