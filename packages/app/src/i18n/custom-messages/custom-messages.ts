import { Messages } from "@nl-portal/nl-portal-localization";
import { NL_NL_MESSAGES } from "./nl-nl";
import { EN_GB_MESSAGES } from "./en-gb";

export const CUSTOM_MESSAGES: Messages = {
  ...NL_NL_MESSAGES,
  ...EN_GB_MESSAGES,
};
