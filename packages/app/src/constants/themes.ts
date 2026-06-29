import { Themes } from "@nl-portal/nl-portal-user-interface";

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

/**
 * Slug: for URL paths and translation keys
 * ProductType -> slug: for url paths and for translation keys
 * ProductType -> code: for mapping to product types in the API responses
 */

export const themes: Themes<ThemeSlug, ProductTypeSlug, ProductTypeCodes> = {
  belastingzaken: {
    slug: "belastingzaken",
    productTypes: {
      belastingzaken: {
        slug: "belastingzaken",
        code: "BELASTINGZAKEN",
      },
    },
  },
  parkeren: {
    slug: "parkeren",
    productTypes: {
      vergunningen: {
        slug: "vergunningen",
        code: "PARKEREN",
      },
      bezoekersvergunningen: {
        slug: "bezoekersvergunningen",
        code: "BEZOEKERSVERGUNNING",
      },
    },
  },
  inkomensondersteuning: {
    slug: "inkomensondersteuning",
    productTypes: {
      stadspas: {
        slug: "stadspas",
        code: "STADSPAS",
      },
    },
  },
};
