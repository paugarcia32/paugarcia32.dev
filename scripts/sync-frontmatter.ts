#!/usr/bin/env tsx
/**
 * Sync Frontmatter Script
 * Synchronizes frontmatter in .md files with config.ts metadata
 *
 * Usage: pnpm sync-frontmatter
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "../src/content");

interface BlogPostConfig {
  title: string;
  description: string;
  date: Date;
  draft?: boolean;
  tags: readonly string[];
}

interface ProjectConfig extends BlogPostConfig {
  demoURL?: string;
  repoURL?: string;
}

interface WorkPositionConfig {
  role: string;
  description: string;
  dateStart: Date;
  dateEnd: Date | string;
  tags: readonly string[];
}

interface WorkCompanyConfig {
  company: string;
  url?: string;
}

/**
 * Format date to "Mon DD YYYY" format for frontmatter
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format date to dd/mm/yyyy format for work positions
 */
function formatDateDDMMYYYY(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Generate frontmatter string from config
 */
function generateBlogFrontmatter(config: BlogPostConfig): string {
  const lines = [
    "---",
    `title: "${config.title}"`,
    `description: "${config.description}"`,
    `date: "${formatDate(config.date)}"`,
  ];

  if (config.draft) {
    lines.push(`draft: ${config.draft}`);
  }

  if (config.tags && config.tags.length > 0) {
    const tagsStr = config.tags.map((tag) => `"${tag}"`).join(", ");
    lines.push(`tags: [${tagsStr}]`);
  }

  lines.push("---");
  return lines.join("\n");
}

/**
 * Generate frontmatter string for projects
 */
function generateProjectFrontmatter(config: ProjectConfig): string {
  const lines = [
    "---",
    `title: "${config.title}"`,
    `description: "${config.description}"`,
    `date: "${formatDate(config.date)}"`,
  ];

  if (config.draft) {
    lines.push(`draft: ${config.draft}`);
  }

  if (config.demoURL) {
    lines.push(`demoURL: "${config.demoURL}"`);
  }

  if (config.repoURL) {
    lines.push(`repoURL: "${config.repoURL}"`);
  }

  if (config.tags && config.tags.length > 0) {
    const tagsStr = config.tags.map((tag) => `"${tag}"`).join(", ");
    lines.push(`tags: [${tagsStr}]`);
  }

  lines.push("---");
  return lines.join("\n");
}

/**
 * Generate frontmatter for work position
 */
function generateWorkPositionFrontmatter(config: WorkPositionConfig): string {
  const lines = [
    "---",
    `type: "position"`,
    `role: "${config.role}"`,
    `dateStart: "${formatDateDDMMYYYY(config.dateStart)}"`,
    `dateEnd: "${typeof config.dateEnd === "string" ? config.dateEnd : formatDateDDMMYYYY(config.dateEnd)}"`,
    `description: "${config.description}"`,
  ];

  if (config.tags && config.tags.length > 0) {
    const tagsStr = config.tags.map((tag) => `"${tag}"`).join(", ");
    lines.push(`tags: [${tagsStr}]`);
  }

  lines.push("---");
  return lines.join("\n");
}

/**
 * Generate frontmatter for work company
 */
function generateWorkCompanyFrontmatter(config: WorkCompanyConfig): string {
  const lines = [
    "---",
    `type: "company"`,
    `company: "${config.company}"`,
  ];

  if (config.url) {
    lines.push(`url: "${config.url}"`);
  }

  lines.push("---");
  return lines.join("\n");
}

/**
 * Update frontmatter in a markdown file
 */
function updateMarkdownFile(
  filePath: string,
  newFrontmatter: string,
): boolean {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract content without frontmatter
    const frontmatterRegex = /^---\n[\s\S]*?\n---\n/;
    const contentWithoutFrontmatter = content.replace(frontmatterRegex, "");

    // Write new file with updated frontmatter
    const newContent = `${newFrontmatter}\n${contentWithoutFrontmatter}`;
    fs.writeFileSync(filePath, newContent, "utf-8");

    return true;
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
}

/**
 * Sync blog posts
 */
async function syncBlogPosts() {
  console.log("📝 Syncing blog posts...");
  const blogDir = path.join(contentDir, "blog");
  const dirs = fs
    .readdirSync(blogDir)
    .filter((d) => fs.statSync(path.join(blogDir, d)).isDirectory());

  let synced = 0;

  for (const dir of dirs) {
    const configPath = path.join(blogDir, dir, "config.ts");
    const mdPath = path.join(blogDir, dir, "index.md");
    const mdxPath = path.join(blogDir, dir, "index.mdx");

    if (!fs.existsSync(configPath)) continue;

    const markdownPath = fs.existsSync(mdPath) ? mdPath : mdxPath;
    if (!fs.existsSync(markdownPath)) continue;

    try {
      // Dynamic import the config
      const configModule = await import(`file://${configPath}`);
      const { slug, config } = configModule.default;

      const frontmatter = generateBlogFrontmatter(config);
      if (updateMarkdownFile(markdownPath, frontmatter)) {
        console.log(`  ✅ ${dir}`);
        synced++;
      }
    } catch (error) {
      console.error(`  ❌ ${dir}:`, error);
    }
  }

  console.log(`  Synced ${synced} blog posts\n`);
}

/**
 * Sync projects
 */
async function syncProjects() {
  console.log("🚀 Syncing projects...");
  const projectsDir = path.join(contentDir, "projects");
  const dirs = fs
    .readdirSync(projectsDir)
    .filter((d) => fs.statSync(path.join(projectsDir, d)).isDirectory());

  let synced = 0;

  for (const dir of dirs) {
    const configPath = path.join(projectsDir, dir, "config.ts");
    const mdPath = path.join(projectsDir, dir, "index.md");
    const mdxPath = path.join(projectsDir, dir, "index.mdx");

    if (!fs.existsSync(configPath)) continue;

    const markdownPath = fs.existsSync(mdPath) ? mdPath : mdxPath;
    if (!fs.existsSync(markdownPath)) continue;

    try {
      const configModule = await import(`file://${configPath}`);
      const { slug, config } = configModule.default;

      const frontmatter = generateProjectFrontmatter(config);
      if (updateMarkdownFile(markdownPath, frontmatter)) {
        console.log(`  ✅ ${dir}`);
        synced++;
      }
    } catch (error) {
      console.error(`  ❌ ${dir}:`, error);
    }
  }

  console.log(`  Synced ${synced} projects\n`);
}

/**
 * Sync work positions and companies
 */
async function syncWork() {
  console.log("💼 Syncing work experience...");
  const workDir = path.join(contentDir, "work");
  const companies = fs
    .readdirSync(workDir)
    .filter((d) => fs.statSync(path.join(workDir, d)).isDirectory());

  let synced = 0;

  for (const company of companies) {
    const companyDir = path.join(workDir, company);

    // Sync company.md
    const companyConfigPath = path.join(companyDir, "company.ts");
    const companyMdPath = path.join(companyDir, "company.md");

    if (fs.existsSync(companyConfigPath) && fs.existsSync(companyMdPath)) {
      try {
        const configModule = await import(`file://${companyConfigPath}`);
        const config = configModule.config;

        const frontmatter = generateWorkCompanyFrontmatter(config);
        if (updateMarkdownFile(companyMdPath, frontmatter)) {
          console.log(`  ✅ ${company}/company.md`);
          synced++;
        }
      } catch (error) {
        console.error(`  ❌ ${company}/company.md:`, error);
      }
    }

    // Sync position files
    const files = fs.readdirSync(companyDir);
    for (const file of files) {
      if (file === "company.ts" || file === "company.md") continue;
      if (!file.endsWith(".ts")) continue;

      const positionName = file.replace(".ts", "");
      const positionConfigPath = path.join(companyDir, file);
      const positionMdPath = path.join(companyDir, `${positionName}.md`);

      if (fs.existsSync(positionMdPath)) {
        try {
          const configModule = await import(`file://${positionConfigPath}`);
          const config = configModule.config;

          const frontmatter = generateWorkPositionFrontmatter(config);
          if (updateMarkdownFile(positionMdPath, frontmatter)) {
            console.log(`  ✅ ${company}/${positionName}.md`);
            synced++;
          }
        } catch (error) {
          console.error(`  ❌ ${company}/${positionName}.md:`, error);
        }
      }
    }
  }

  console.log(`  Synced ${synced} work files\n`);
}

/**
 * Main function
 */
async function main() {
  console.log("\n🔄 Syncing frontmatter from config.ts files...\n");

  await syncBlogPosts();
  await syncProjects();
  await syncWork();

  console.log("✨ Done! All frontmatters are synced.\n");
}

main().catch((error) => {
  console.error("Error running sync script:", error);
  process.exit(1);
});
