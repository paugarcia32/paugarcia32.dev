#!/usr/bin/env tsx

import { checkbox, confirm, input, select } from "@inquirer/prompts";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as TAGS from "../src/tags.js";

const contentDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/content");
const allTags = Object.values(TAGS).sort().map((tag) => ({ name: tag, value: tag }));

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function askSlug(parent: string, defaultSlug: string): Promise<string> {
  return input({
    message: "Slug:",
    default: defaultSlug,
    validate: (value) =>
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && !fs.existsSync(path.join(parent, value))
        ? true
        : "Use a unique lowercase slug (letters, digits and hyphens).",
  });
}

async function askDate(message: string, optional = false): Promise<string> {
  return input({
    message,
    default: optional ? new Date().toISOString().slice(0, 10) : undefined,
    validate: (value) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Use YYYY-MM-DD.";
      const date = new Date(`${value}T00:00:00Z`);
      return date.toISOString().slice(0, 10) === value || "Invalid date.";
    },
  });
}

function yaml(value: unknown): string {
  return JSON.stringify(value);
}

async function askTags(): Promise<string[]> {
  return checkbox({ message: "Select tags:", choices: allTags, pageSize: 15 });
}

function writeContent(file: string, fields: Record<string, unknown>, body: string): void {
  const frontmatter = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}: ${yaml(value)}`)
    .join("\n");
  fs.writeFileSync(file, `---\n${frontmatter}\n---\n\n${body}\n`);
}

async function createPostOrProject(kind: "blog" | "projects"): Promise<void> {
  const title = await input({ message: "Title:", required: true });
  const parent = path.join(contentDir, kind);
  const slug = await askSlug(parent, slugify(title));
  const description = await input({ message: "Description:", required: true });
  const date = await askDate("Date (YYYY-MM-DD):", true);
  const draft = await confirm({ message: "Is this a draft?", default: false });
  const tags = await askTags();
  const fields: Record<string, unknown> = { title, description, date, draft, tags };

  if (kind === "projects") {
    fields.demoURL = await input({ message: "Demo URL (optional):" });
    fields.repoURL = await input({ message: "Repository URL (optional):" });
    const workDir = path.join(contentDir, "work");
    const positions = fs.readdirSync(workDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .flatMap((company) => fs.readdirSync(path.join(workDir, company.name))
        .filter((file) => file.endsWith(".md") && file !== "company.md")
        .map((file) => `${company.name}/${file.slice(0, -3)}`));
    if (positions.length && await confirm({ message: "Link to a work position?", default: false })) {
      fields.workPosition = await select({
        message: "Position:",
        choices: positions.map((value) => ({ name: value, value })),
      });
    }
  }

  const extension = await select({
    message: "File format:",
    choices: [
      { name: "Markdown", value: "md" },
      { name: "MDX", value: "mdx" },
    ],
  });
  const directory = path.join(parent, slug);
  fs.mkdirSync(directory);
  writeContent(path.join(directory, `index.${extension}`), fields, "## Overview\n\nYour content here...");
  console.log(`Created src/content/${kind}/${slug}/index.${extension}`);
}

async function createWork(): Promise<void> {
  const workDir = path.join(contentDir, "work");
  const companyName = await input({ message: "Company name:", required: true });
  const companySlug = slugify(companyName);
  const companyDir = path.join(workDir, companySlug);
  if (!fs.existsSync(companyDir)) {
    fs.mkdirSync(companyDir);
    const url = await input({ message: "Company URL (optional):" });
    writeContent(path.join(companyDir, "company.md"), { type: "company", company: companyName, url }, "");
  }

  const role = await input({ message: "Role:", required: true });
  const slug = await input({
    message: "Position slug:",
    default: slugify(role),
    validate: (value) =>
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) &&
      !fs.existsSync(path.join(companyDir, `${value}.md`)) && value !== "company"
        ? true
        : "Use a unique lowercase position slug.",
  });
  const description = await input({ message: "Description:", required: true });
  const start = await askDate("Start date (YYYY-MM-DD):");
  const current = await confirm({ message: "Current position?", default: false });
  let end = "Present";
  if (!current) {
    end = await askDate("End date (YYYY-MM-DD):");
    if (end < start) throw new Error("End date must not precede start date.");
  }
  const tags = await askTags();
  const toWorkDate = (date: string) => date.split("-").reverse().join("/");
  writeContent(path.join(companyDir, `${slug}.md`), {
    type: "position", role, description,
    dateStart: toWorkDate(start),
    dateEnd: current ? "Present" : toWorkDate(end), tags,
  }, "Your work description here...");
  console.log(`Created src/content/work/${companySlug}/${slug}.md`);
}

const kind = await select({
  message: "What would you like to create?",
  choices: [
    { name: "Blog post", value: "blog" },
    { name: "Project", value: "projects" },
    { name: "Work position", value: "work" },
  ],
});
if (kind === "work") await createWork();
else if (kind === "blog" || kind === "projects") await createPostOrProject(kind);
