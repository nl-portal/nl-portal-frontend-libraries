import { ReactNode } from "react";

export interface NavigationItem {
  titleTranslationKey: string;
  path: string;
  icon: ReactNode;
  hasMessagesCount?: boolean;
}
