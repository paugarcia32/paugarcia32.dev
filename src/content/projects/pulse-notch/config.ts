import * as TAGS from "@/tags";
import type { ProjectReference } from "@/types";

export default {
  slug: "pulse-notch",
  config: {
    title: "Pulse Notch",
    description:
      "A MacBook notch app for coding agents, GitHub activity, and your next event.",
    date: new Date("2026-07-27"),
    draft: false,
    tags: [TAGS.SWIFT, TAGS.SWIFTUI, TAGS.MACOS],
    repoURL: "https://github.com/paugarcia32/pulse-notch",
  },
} as const satisfies ProjectReference;
