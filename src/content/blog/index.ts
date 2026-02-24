/**
 * Centralized blog posts exports
 * Import configs and create type-safe references
 */

// Import all blog post configs (default exports)
import introductionToEmbeddedSystems from "./introduction-to-embedded-systems/config";
import sixMonthsLesson from "./six-moths-of-lesson/config";

/**
 * Type-safe blog post references
 * Use these in showcases for autocomplete and type checking
 */
export const blogPosts = {
  sixMonthsLesson,
  introductionToEmbeddedSystems,
} as const;

export type BlogPostKey = keyof typeof blogPosts;
