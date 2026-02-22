import { type CollectionEntry, getCollection } from "astro:content";
import { getAllTags, normalizeEntryId } from "@lib/utils";
import type { APIRoute } from "astro";

interface SearchItem {
  id: string;
  type: "blog" | "work" | "project" | "tag";
  title: string;
  description: string;
  excerpt: string;
  url: string;
  date?: string;
  company?: string;
  role?: string;
  tags?: string[];
}

// Helper to extract plain text excerpt from markdown
function extractExcerpt(body: string, maxLength = 200): string {
  // Remove frontmatter if present
  const withoutFrontmatter = body.replace(/^---[\s\S]*?---\n/, "");

  // Remove markdown syntax
  const plainText = withoutFrontmatter
    .replace(/#{1,6}\s+/g, "") // headers
    .replace(/\*\*(.+?)\*\*/g, "$1") // bold
    .replace(/\*(.+?)\*/g, "$1") // italic
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // links
    .replace(/`(.+?)`/g, "$1") // inline code
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/\n+/g, " ") // newlines to spaces
    .trim();

  return plainText.length > maxLength
    ? plainText.substring(0, maxLength).trim() + "..."
    : plainText;
}

export const GET: APIRoute = async () => {
  const searchItems: SearchItem[] = [];

  // Get all blog posts (exclude drafts)
  const blogPosts = await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  for (const post of blogPosts) {
    searchItems.push({
      id: normalizeEntryId(post),
      type: "blog",
      title: post.data.title,
      description: post.data.description,
      excerpt: extractExcerpt(post.body ?? ""),
      url: `/blog/${normalizeEntryId(post)}`,
      date: post.data.date.toISOString(),
      tags: post.data.tags,
    });
  }

  // Get all projects (exclude drafts)
  const projects = await getCollection("projects", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  for (const project of projects) {
    searchItems.push({
      id: normalizeEntryId(project),
      type: "project",
      title: project.data.title,
      description: project.data.description,
      excerpt: extractExcerpt(project.body ?? ""),
      url: `/projects/${normalizeEntryId(project)}`,
      date: project.data.date.toISOString(),
      tags: project.data.tags,
    });
  }

  // Get all work positions (only positions, not companies)
  const allWork = await getCollection("work");
  const positions = allWork.filter(
    (
      entry,
    ): entry is CollectionEntry<"work"> & { data: { type: "position" } } =>
      entry.data.type === "position",
  );

  for (const position of positions) {
    // Extract company name from folder structure
    const companyFolder = position.id.split("/")[0];
    const companyEntry = allWork.find(
      (entry) =>
        entry.id.startsWith(companyFolder + "/") &&
        entry.data.type === "company",
    );

    const companyName =
      companyEntry?.data.type === "company"
        ? companyEntry.data.company
        : companyFolder;

    searchItems.push({
      id: position.id,
      type: "work",
      title: position.data.role,
      description: position.data.description,
      excerpt: extractExcerpt(position.body ?? ""),
      url: `/work#${companyFolder}`,
      date: position.data.dateStart.toISOString(),
      company: companyName,
      role: position.data.role,
      tags: position.data.tags,
    });
  }

  // Add tag search items
  const allTags = getAllTags(blogPosts, projects, allWork);
  for (const [slug, displayName] of allTags) {
    // Count how many items have this tag
    const count = searchItems.filter((item) =>
      item.tags?.some((tag) => tag.toLowerCase() === displayName.toLowerCase()),
    ).length;

    searchItems.push({
      id: `tag-${slug}`,
      type: "tag",
      title: displayName,
      description: `View all content tagged with "${displayName}" (${count} item${count !== 1 ? "s" : ""})`,
      excerpt: `Tag: ${displayName}`,
      url: `/tags/${slug}`,
    });
  }

  // Sort by date (most recent first) - tags without dates go to the end
  searchItems.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return new Response(JSON.stringify(searchItems), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
