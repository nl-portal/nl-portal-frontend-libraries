export type ThemeSlug = "belastingzaken" | "parkeren" | "inkomensondersteuning";
export type ProductTypeSlug =
  | "vergunningen"
  | "bezoekersvergunningen"
  | "belastingzaken";
export type ProductTypeCodes =
  | "PARKEERVERGUNNING"
  | "BEZOEKERSVERGUNNING"
  | "BELASTINGZAKEN";

export type Themes = Record<
  ThemeSlug,
  {
    slug: ThemeSlug;
    productTypeSlugs: Record<string, ProductTypeSlug>;
    productTypeCodes: Record<string, ProductTypeCodes>;
  }
>;

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
      vergunningen: "PARKEERVERGUNNING",
      bezoekersvergunningen: "BEZOEKERSVERGUNNING",
    },
  },
  inkomensondersteuning: {
    slug: "inkomensondersteuning",
    productTypeSlugs: {},
    productTypeCodes: {},
  },
};
