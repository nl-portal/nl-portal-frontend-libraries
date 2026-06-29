import { Paths } from "@nl-portal/nl-portal-user-interface";

export const paths: Paths = {
  noMatch: "/pagina-niet-gevonden",
  overview: "/",
  cases: "/zaken",
  case: (id = ":id") => `/zaken/zaak/${id}`,
  tasks: "/taken",
  task: (id = ":id") => `/taken/taak/${id}`,
  messages: "/berichten",
  message: (id = ":id") => `/berichten/bericht/${id}`,
  products: "/producten",
  themeOverview: (themeSlug: string) => `/${themeSlug}`,
  themeList: (themeSlug: string, productTypeSlug = ":productTypeSlug") =>
    `/${themeSlug}/${productTypeSlug}/lijst`,
  themeDetails: (
    themeSlug: string,
    productTypeSlug = ":productTypeSlug",
    id = ":id",
  ) => `/${themeSlug}/${productTypeSlug}/${id}`,
  themeHistory: (
    themeSlug: string,
    productTypeSlug = ":productTypeSlug",
    id = ":id",
  ) => `/${themeSlug}/${productTypeSlug}/${id}/geschiedenis`,
  themeMutate: (
    themeSlug: string,
    productTypeSlug = ":productTypeSlug",
    id = ":id",
  ) => `/${themeSlug}/${productTypeSlug}/${id}/wijzigen`,
  account: "/account",
  changeContactInfo: (type = ":type") => `/account/wijzig/${type}`,
};
