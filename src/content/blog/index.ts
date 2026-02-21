/**
 * Centralized blog posts exports
 * Import configs and create type-safe references
 */

// Import all blog post configs (default exports)
import sixMonthsLesson from "./six-moths-of-lesson/config";

/**
 * Type-safe blog post references
 * Use these in showcases for autocomplete and type checking
 */
export const blogPosts = {
  sixMonthsLesson,
} as const;

export type BlogPostKey = keyof typeof blogPosts;
