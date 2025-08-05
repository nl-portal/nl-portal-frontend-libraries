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
  themeOverview: (slug = ":slug") => `/${slug}`,
  themeDetails: (slug = ":slug", id = ":id") => `/${slug}/${id}`,
  account: "/account",
  changeContactInfo: "/account/wijzig/contact",
  changeNotifications: "/account/wijzig/notificaties",
};
