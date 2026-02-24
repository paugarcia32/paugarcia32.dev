/**
 * Centralized blog posts exports
 * Import configs and create type-safe references
 */

// Import all blog post configs (default exports)
import dualBootUbuntuWindows from "./dual-boot-ubuntu-windows/config";
import introductionToEmbeddedSystems from "./introduction-to-embedded-systems/config";
import sixMonthsLesson from "./six-moths-of-lesson/config";

/**
 * Type-safe blog post references
 * Use these in showcases for autocomplete and type checking
 */
export const blogPosts = {
  sixMonthsLesson,
  introductionToEmbeddedSystems,
  dualBootUbuntuWindows,
} as const;

export type BlogPostKey = keyof typeof blogPosts;
