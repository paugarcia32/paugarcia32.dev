import * as TAGS from "@/tags";

export interface BlogPostReference {
  slug: string;
  tags: string[];
}

export const BLOG_POSTS = {
  gettingStarted: {
    slug: "01-getting-started",
    tags: [TAGS.ASTRO, TAGS.TUTORIAL, TAGS.WEB_DEVELOPMENT],
  },
  blogCollection: {
    slug: "02-blog-collection",
    tags: [TAGS.ASTRO, TAGS.CONTENT_COLLECTIONS, TAGS.TUTORIAL],
  },
  projectsCollection: {
    slug: "03-projects-collection",
    tags: [TAGS.ASTRO, TAGS.CONTENT_COLLECTIONS, TAGS.PORTFOLIO],
  },
  workCollection: {
    slug: "04-work-collection",
    tags: [TAGS.ASTRO, TAGS.CONTENT_COLLECTIONS, TAGS.CAREER],
  },
  markdownSyntax: {
    slug: "05-markdown-syntax",
    tags: [TAGS.MARKDOWN, TAGS.WRITING, TAGS.DOCUMENTATION],
  },
  mdxSyntax: {
    slug: "06-mdx-syntax",
    tags: [TAGS.MDX, TAGS.REACT, TAGS.ASTRO, TAGS.JAVASCRIPT],
  },
  yearSortingExample: {
    slug: "07-year-sorting-example",
    tags: [TAGS.ASTRO, TAGS.TYPESCRIPT, TAGS.TUTORIAL],
  },
  draftExample: {
    slug: "08-draft-example",
    tags: [],
  },
  sixMonthsOfLesson: {
    slug: "six-moths-of-lesson",
    tags: [TAGS.PROJECT_MANAGEMENT, TAGS.LESSONS_LEARNED, TAGS.DEVELOPMENT],
  },
} as const;

// Export type for type safety
export type BlogPostKey = keyof typeof BLOG_POSTS;
