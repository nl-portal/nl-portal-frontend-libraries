export type ThemeSlug = "belastingzaken" | "parkeren" | "inkomensondersteuning";
export type ProductTypeSlug = "vergunningen" | "bezoekersvergunningen";

export type Themes = Record<
  ThemeSlug,
  { slug: ThemeSlug; productTypeSlugs?: Record<string, ProductTypeSlug> }
>;

export const themes: Themes = {
  belastingzaken: {
    slug: "belastingzaken",
  },
  parkeren: {
    slug: "parkeren",
    productTypeSlugs: {
      vergunningen: "vergunningen",
      bezoekersvergunningen: "bezoekersvergunningen",
    },
  },
  inkomensondersteuning: {
    slug: "inkomensondersteuning",
  },
};
