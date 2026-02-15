import type { CollectionEntry } from "astro:content";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date parsing and formatting utilities

/**
 * Parse a date string in dd/mm/yyyy format to a Date object
 * Used by content collections for work experience dates
 */
export function parseDDMMYYYY(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format a Date object to dd/mm/yyyy format
 * Example: 15/02/2026
 */
export function formatDateDDMMYYYY(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Format a Date object to short format (Mon YYYY)
 * Example: Feb 2026
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/**
 * Legacy format function (Mon DD, YYYY)
 * Example: Feb 22, 2024
 */
export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export function dateRange(startDate: Date, endDate?: Date | string): string {
  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const startYear = startDate.getFullYear().toString();
  let endMonth;
  let endYear;

  if (endDate) {
    if (typeof endDate === "string") {
      endMonth = "";
      endYear = endDate;
    } else {
      endMonth = endDate.toLocaleString("default", { month: "short" });
      endYear = endDate.getFullYear().toString();
    }
  }

  return `${startMonth}${startYear} - ${endMonth}${endYear}`;
}

export function getTotalDateRange(
  positions: Array<{ dateStart: Date; dateEnd: Date | string }>,
): string {
  const sortedPositions = [...positions].sort(
    (a, b) => new Date(a.dateStart).valueOf() - new Date(b.dateStart).valueOf(),
  );

  const earliestStart = sortedPositions[0].dateStart;
  const latestEnd = sortedPositions[sortedPositions.length - 1].dateEnd;

  return dateRange(earliestStart, latestEnd);
}

export function getTotalDuration(
  positions: Array<{ dateStart: Date; dateEnd: Date | string }>,
): string {
  const sortedPositions = [...positions].sort(
    (a, b) => new Date(a.dateStart).valueOf() - new Date(b.dateStart).valueOf(),
  );

  const earliestStart = sortedPositions[0].dateStart;
  const latestEnd = sortedPositions[sortedPositions.length - 1].dateEnd;

  // Convert endDate to Date object if it's a string (like "Present")
  const endDate =
    typeof latestEnd === "string" ? new Date() : new Date(latestEnd);
  const startDate = new Date(earliestStart);

  // Calculate the difference in months
  const yearsDiff = endDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = endDate.getMonth() - startDate.getMonth();
  const totalMonths = yearsDiff * 12 + monthsDiff;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Format the output in English
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} year${years > 1 ? "s" : ""}`);
  }
  if (months > 0) {
    parts.push(`${months} month${months > 1 ? "s" : ""}`);
  }

  return parts.length > 0 ? parts.join(" and ") : "Less than a month";
}

export type WorkPosition = CollectionEntry<"work"> & {
  data: { type: "position" };
};

export interface CompanyWithPositions {
  company: string;
  url?: string;
  positions: WorkPosition[];
  sortedPositions: WorkPosition[];
  totalDuration: string;
}

export function groupPositionsByCompany(
  allWork: CollectionEntry<"work">[],
): CompanyWithPositions[] {
  // Separate positions and companies by type
  const positions = allWork.filter(
    (entry): entry is WorkPosition => entry.data.type === "position",
  );
  const companies = allWork.filter((entry) => entry.data.type === "company");

  // Group positions by company folder
  const grouped = positions.reduce(
    (acc, position) => {
      const companyFolder = position.id.split("/")[0];
      if (!acc[companyFolder]) acc[companyFolder] = [];
      acc[companyFolder].push(position);
      return acc;
    },
    {} as Record<string, WorkPosition[]>,
  );

  // Map to CompanyWithPositions structure
  return Object.entries(grouped)
    .map(([folder, positions]) => {
      // Find corresponding company metadata
      const companyMeta = companies.find((c) => c.id.startsWith(folder + "/"));

      // Sort positions by dateStart (most recent first)
      const sortedPositions = [...positions].sort(
        (a, b) =>
          new Date(b.data.dateStart).valueOf() -
          new Date(a.data.dateStart).valueOf(),
      );

      return {
        company:
          companyMeta?.data.type === "company"
            ? companyMeta.data.company
            : folder,
        url:
          companyMeta?.data.type === "company"
            ? companyMeta.data.url
            : undefined,
        positions,
        sortedPositions,
        totalDuration: getTotalDuration(
          sortedPositions.map((p) => ({
            dateStart: p.data.dateStart,
            dateEnd: p.data.dateEnd,
          })),
        ),
      };
    })
    .sort((a, b) => {
      // Sort companies by most recent position
      const aLatest = a.sortedPositions[0];
      const bLatest = b.sortedPositions[0];
      return (
        new Date(bLatest.data.dateStart).valueOf() -
        new Date(aLatest.data.dateStart).valueOf()
      );
    });
}

// Tag utility functions

/**
 * Normalizes a tag string for use in URLs
 * Converts to lowercase, replaces spaces with hyphens, removes special characters
 */
export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Extracts all unique tags from blog posts, projects, and work positions
 * Returns a Map of slug -> displayName
 * First occurrence's casing is preserved for display
 */
export function getAllTags(
  blog: CollectionEntry<"blog">[],
  projects: CollectionEntry<"projects">[],
  work: CollectionEntry<"work">[],
): Map<string, string> {
  const tagMap = new Map<string, string>();

  // Helper to add tags from an entry
  const addTags = (tags?: string[]) => {
    if (!tags) return;
    for (const tag of tags) {
      const slug = slugifyTag(tag);
      if (!tagMap.has(slug)) {
        tagMap.set(slug, tag); // Preserve first occurrence's casing
      }
    }
  };

  // Extract tags from blog posts
  for (const post of blog) {
    addTags(post.data.tags);
  }

  // Extract tags from projects
  for (const project of projects) {
    addTags(project.data.tags);
  }

  // Extract tags from work positions only
  for (const entry of work) {
    if (entry.data.type === "position") {
      addTags(entry.data.tags);
    }
  }

  return tagMap;
}

export interface TaggedContent {
  type: "blog" | "project" | "work";
  entry:
    | CollectionEntry<"blog">
    | CollectionEntry<"projects">
    | WorkPosition;
  date: Date;
}

/**
 * Filters all content that has a specific tag
 * Returns an array of tagged content sorted by date (most recent first)
 */
export function getContentByTag(
  tag: string,
  blog: CollectionEntry<"blog">[],
  projects: CollectionEntry<"projects">[],
  work: CollectionEntry<"work">[],
): TaggedContent[] {
  const targetSlug = slugifyTag(tag);
  const results: TaggedContent[] = [];

  // Helper to check if tags include the target tag
  const hasTag = (tags?: string[]): boolean => {
    if (!tags) return false;
    return tags.some((t) => slugifyTag(t) === targetSlug);
  };

  // Filter blog posts
  for (const post of blog) {
    if (hasTag(post.data.tags)) {
      results.push({
        type: "blog",
        entry: post,
        date: post.data.date,
      });
    }
  }

  // Filter projects
  for (const project of projects) {
    if (hasTag(project.data.tags)) {
      results.push({
        type: "project",
        entry: project,
        date: project.data.date,
      });
    }
  }

  // Filter work positions
  for (const entry of work) {
    if (entry.data.type === "position" && hasTag(entry.data.tags)) {
      results.push({
        type: "work",
        entry: entry as WorkPosition,
        date: entry.data.dateStart,
      });
    }
  }

  // Sort by date, most recent first
  return results.sort((a, b) => b.date.getTime() - a.date.getTime());
}
