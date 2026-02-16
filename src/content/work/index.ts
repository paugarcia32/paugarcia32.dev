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
