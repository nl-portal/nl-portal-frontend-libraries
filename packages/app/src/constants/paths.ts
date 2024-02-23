import { Paths } from "@nl-portal/nl-portal-user-interface";

export const paths: Paths = {
  overview: "/",
  cases: "/zaken",
  case: (id = ":id") => `/zaken/zaak/${id}`,
  tasks: "/taken",
  task: (id = ":id") => `/taken/taak/${id}`,
  notifications: "/berichten",
  themes: "/themas",
  forms: "/formulieren",
  form: (id = ":id") => `/formulieren/formulier/${id}`,
  account: "/account",
  editAccount: "/account/aanpassen",
};
