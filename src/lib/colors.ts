/**
 * Color palette constants
 * Single source of truth for all colors used across the site
 */

// Anthropic color palette - Neutrals
export const slate = {
  dark: "#191919",
  medium: "#262625",
  light: "#40403E",
} as const;

export const cloud = {
  dark: "#666663",
  medium: "#91918D",
  light: "#BFBFBA",
} as const;

export const ivory = {
  dark: "#E5E4DF",
  medium: "#F0F0EB",
  light: "#FAFAF7",
} as const;

// Anthropic color palette - Warm colors
export const bookCloth = "#CC785C";
export const kraft = "#D4A27F";
export const manilla = "#EBDBBC";

// System colors
export const black = "#000000";
export const white = "#FFFFFF";
export const focus = "#2A94F2";
export const error = "#EF4D43";

// Semantic colors
export const primary = bookCloth;
export const accent = kraft;

// Tailwind color configuration
export const tailwindColors = {
  slate,
  cloud,
  ivory,
  "book-cloth": bookCloth,
  kraft,
  manilla,
  black,
  white,
  focus,
  error,
  primary,
  accent,
} as const;

// Mermaid theme colors for light mode
export const mermaidLight = {
  primaryColor: kraft,
  primaryTextColor: slate.dark,
  primaryBorderColor: bookCloth,
  lineColor: bookCloth,
  secondaryColor: manilla,
  secondaryTextColor: slate.dark,
  secondaryBorderColor: kraft,
  tertiaryColor: ivory.dark,
  tertiaryTextColor: slate.dark,
  tertiaryBorderColor: kraft,
  background: ivory.light,
  mainBkg: ivory.medium,
  secondBkg: ivory.dark,
  textColor: slate.dark,
  labelTextColor: slate.dark,
  border1: bookCloth,
  border2: kraft,
  nodeBkg: ivory.light,
  nodeBorder: bookCloth,
  nodeTextColor: slate.dark,
  clusterBkg: manilla,
  clusterBorder: kraft,
  fillType0: kraft,
  fillType1: manilla,
  fillType2: ivory.dark,
  fillType3: ivory.medium,
  fillType4: ivory.light,
  fillType5: bookCloth,
  fillType6: cloud.light,
  fillType7: cloud.medium,
  fontFamily: "Inter, sans-serif",
} as const;

// Mermaid theme colors for dark mode
export const mermaidDark = {
  primaryColor: kraft,
  primaryTextColor: ivory.light,
  primaryBorderColor: bookCloth,
  lineColor: kraft,
  secondaryColor: slate.light,
  secondaryTextColor: ivory.light,
  secondaryBorderColor: kraft,
  tertiaryColor: slate.medium,
  tertiaryTextColor: ivory.light,
  tertiaryBorderColor: kraft,
  background: slate.dark,
  mainBkg: slate.medium,
  secondBkg: slate.light,
  textColor: ivory.light,
  labelTextColor: ivory.light,
  border1: bookCloth,
  border2: kraft,
  nodeBkg: slate.medium,
  nodeBorder: bookCloth,
  nodeTextColor: ivory.light,
  clusterBkg: slate.light,
  clusterBorder: kraft,
  fillType0: kraft,
  fillType1: slate.light,
  fillType2: slate.medium,
  fillType3: bookCloth,
  fillType4: manilla,
  fillType5: cloud.dark,
  fillType6: cloud.medium,
  fillType7: cloud.light,
  fontFamily: "Inter, sans-serif",
} as const;
