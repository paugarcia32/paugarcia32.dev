import type { CollectionEntry } from "astro:content";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

type WorkPosition = CollectionEntry<"work"> & {
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
