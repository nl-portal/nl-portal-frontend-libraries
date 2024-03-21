import { ReactNode } from "react";

export type NavigationItem = {
  titleTranslationKey: string;
  path: string;
  icon: ReactNode;
  hasMessagesCount?: boolean;
};
