/**
 * Centralized blog posts exports
 * Import configs and create type-safe references
 */

// Import all blog post configs (default exports)
import gettingStarted from "./01-getting-started/config";
import blogCollection from "./02-blog-collection/config";
import projectsCollection from "./03-projects-collection/config";
import workCollection from "./04-work-collection/config";
import markdownSyntax from "./05-markdown-syntax/config";
import mdxSyntax from "./06-mdx-syntax/config";
import yearSorting from "./07-year-sorting-example/config";
import draftExample from "./08-draft-example/config";
import sixMonthsLesson from "./six-moths-of-lesson/config";

/**
 * Type-safe blog post references
 * Use these in showcases for autocomplete and type checking
 */
export const blogPosts = {
  gettingStarted,
  blogCollection,
  projectsCollection,
  workCollection,
  markdownSyntax,
  mdxSyntax,
  yearSorting,
  draftExample,
  sixMonthsLesson,
} as const;

export type BlogPostKey = keyof typeof blogPosts;
