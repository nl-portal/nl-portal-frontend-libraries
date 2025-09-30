export type ThemeSlug = "belastingzaken" | "parkeren" | "inkomensondersteuning";

export type Themes = Record<ThemeSlug, { slug: ThemeSlug }>;

export const themes: Themes = {
  belastingzaken: {
    slug: "belastingzaken",
  },
  parkeren: {
    slug: "parkeren",
  },
  inkomensondersteuning: {
    slug: "inkomensondersteuning",
  },
};
