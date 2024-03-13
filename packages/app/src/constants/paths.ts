import { Paths } from "@nl-portal/nl-portal-user-interface";

export const paths: Paths = {
  overview: "/",
  cases: "/zaken",
  case: (id = ":id") => `/zaken/zaak/${id}`,
  tasks: "/taken",
  task: (id = ":id") => `/taken/taak/${id}`,
  notifications: "/berichten",
  themeOverview: (type = ":type") => `/${type}`,
  themeDetails: (type = ":type", id = ":id") => `/${type}/${id}`,
  account: "/account",
  editAccount: "/account/aanpassen",
};
