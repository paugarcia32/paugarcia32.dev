import * as TAGS from "@/tags";

export interface CompanyReference {
  company: string;
  limit?: number;
}

export const COMPANIES = {
  maat: {
    company: "maat",
    positions: [
      {
        slug: "intern",
        tags: [TAGS.FLUTTER, TAGS.MOBILE_DEVELOPMENT],
      },
      {
        slug: "junior-engineer",
        tags: [TAGS.FLUTTER, TAGS.NESTJS, TAGS.TYPESCRIPT, TAGS.POSTGRESQL, TAGS.FULL_STACK],
      },
    ],
  },
  marshMclennan: {
    company: "marsh-mclennan",
    positions: [
      {
        slug: "cybersecurity-intern",
        tags: [TAGS.CYBERSECURITY, TAGS.PYTHON, TAGS.FLASK, TAGS.POWER_BI],
      },
    ],
  },
} as const;

// Export type for type safety
export type CompanyKey = keyof typeof COMPANIES;
