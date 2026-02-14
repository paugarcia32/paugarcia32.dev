import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";

interface SearchItem {
  id: string;
  type: "blog" | "work" | "project";
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
      id: post.slug,
      type: "blog",
      title: post.data.title,
      description: post.data.description,
      excerpt: extractExcerpt(post.body),
      url: `/blog/${post.slug}`,
      date: post.data.date.toISOString(),
    });
  }

  // Get all projects (exclude drafts)
  const projects = await getCollection("projects", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  for (const project of projects) {
    searchItems.push({
      id: project.slug,
      type: "project",
      title: project.data.title,
      description: project.data.description,
      excerpt: extractExcerpt(project.body),
      url: `/projects/${project.slug}`,
      date: project.data.date.toISOString(),
    });
  }

  // Get all work positions (only positions, not companies)
  const allWork = await getCollection("work");
  const positions = allWork.filter(
    (entry): entry is CollectionEntry<"work"> & { data: { type: "position" } } =>
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
      excerpt: extractExcerpt(position.body),
      url: `/work#${companyFolder}`,
      date: position.data.dateStart.toISOString(),
      company: companyName,
      role: position.data.role,
    });
  }

  // Sort by date (most recent first)
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
