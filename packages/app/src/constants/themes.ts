export type ThemeSlug = "belastingzaken" | "parkeren" | "inkomensondersteuning";
export type ProductTypeSlug =
  | "vergunningen"
  | "bezoekersvergunningen"
  | "belastingzaken"
  | "stadspas";
export type ProductTypeCodes =
  | "PARKEREN"
  | "BEZOEKERSVERGUNNING"
  | "BELASTINGZAKEN"
  | "STADSPAS";

export type Themes = Record<
  ThemeSlug,
  {
    slug: ThemeSlug;
    productTypeSlugs: Record<string, ProductTypeSlug>;
    productTypeCodes: Record<string, ProductTypeCodes>;
  }
>;

/**
 * Slug: for URL paths and translation keys
 * ProductTypeSlug: for url paths and for translation keys
 * ProductTypeCodes: for mapping to product types in the API responses
 */

export const themes: Themes = {
  belastingzaken: {
    slug: "belastingzaken",
    productTypeSlugs: { belastingzaken: "belastingzaken" },
    productTypeCodes: { belastingzaken: "BELASTINGZAKEN" },
  },
  parkeren: {
    slug: "parkeren",
    productTypeSlugs: {
      vergunningen: "vergunningen",
      bezoekersvergunningen: "bezoekersvergunningen",
    },
    productTypeCodes: {
      vergunningen: "PARKEREN",
      bezoekersvergunningen: "BEZOEKERSVERGUNNING",
    },
  },
  inkomensondersteuning: {
    slug: "inkomensondersteuning",
    productTypeSlugs: { stadspas: "stadspas" },
    productTypeCodes: { stadspas: "STADSPAS" },
  },
};
