import { Paths } from "@nl-portal/nl-portal-user-interface";

export const paths: Paths = {
  overview: "/",
  forms: "/formulieren",
  form: (id = ":id") => `/formulieren/formulier/${id}`,
  cases: "/zaken",
  case: (id = ":id") => `/zaken/zaak/${id}`,
  tasks: "/taken",
  task: (id = ":id") => `/taken/taak/${id}`,
  notifications: "/berichten",
  themes: "/themas",
  account: "/account",
  editAccount: "/account/aanpassen",
};
