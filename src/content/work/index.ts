/**
 * Centralized work experience exports
 * Import configs and create type-safe references
 */

// Import MAAT configs
import { config as maatCompanyConfig } from "./maat/company";
import { config as maatInternConfig } from "./maat/intern";
import { config as maatJuniorConfig } from "./maat/junior-engineer";

// Import Marsh McLennan configs
import { config as marshCompanyConfig } from "./marsh-mclennan/company";
import { config as marshInternConfig } from "./marsh-mclennan/cybersecurity-intern";

/**
 * Type-safe work experience references
 * Use these in showcases for autocomplete and type checking
 */
export const companies = {
  maat: {
    slug: "maat",
    companyConfig: maatCompanyConfig,
    positions: {
      intern: {
        slug: "intern",
        config: maatInternConfig,
      },
      juniorEngineer: {
        slug: "junior-engineer",
        config: maatJuniorConfig,
      },
    },
  },

  marshMclennan: {
    slug: "marsh-mclennan",
    companyConfig: marshCompanyConfig,
    positions: {
      cybersecurityIntern: {
        slug: "cybersecurity-intern",
        config: marshInternConfig,
      },
    },
  },
} as const;

export type CompanyKey = keyof typeof companies;

/**
 * All valid work position IDs, derived directly from the companies object.
 * Stays in sync automatically — adding a position to `companies` adds it here too.
 * Example: "maat/junior-engineer" | "maat/intern" | "marsh-mclennan/cybersecurity-intern"
 */
type ExtractPositionIds<T> = T extends {
  slug: infer CompanySlug;
  positions: infer Positions;
}
  ? Positions extends Record<string, { slug: infer PositionSlug }>
    ? `${CompanySlug & string}/${PositionSlug & string}`
    : never
  : never;

export type WorkPositionId = ExtractPositionIds<
  (typeof companies)[keyof typeof companies]
>;
