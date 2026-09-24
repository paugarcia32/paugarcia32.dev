import { getCollection, type CollectionEntry } from "astro:content";

export async function getVisibleBlog(): Promise<CollectionEntry<"blog">[]> {
  return getCollection("blog", ({ data }) => !data.draft || !import.meta.env.PROD);
}

export async function getVisibleProjects(): Promise<CollectionEntry<"projects">[]> {
  return getCollection("projects", ({ data }) => !data.draft || !import.meta.env.PROD);
}

export function validateWorkReferences(
  projects: CollectionEntry<"projects">[],
  work: CollectionEntry<"work">[],
): void {
  const companies = new Set(
    work.filter((entry) => entry.data.type === "company").map((entry) => entry.id.split("/")[0]),
  );
  const positions = new Set(
    work.filter((entry) => entry.data.type === "position").map((entry) => entry.id),
  );
  for (const position of positions) {
    if (!companies.has(position.split("/")[0])) {
      throw new Error(`Work position ${position} has no company.md`);
    }
  }
  for (const project of projects) {
    if (project.data.workPosition && !positions.has(project.data.workPosition)) {
      throw new Error(
        `Project ${project.id} references missing work position ${project.data.workPosition}`,
      );
    }
  }
}
