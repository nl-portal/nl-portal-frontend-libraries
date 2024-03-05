import { ReactNode } from "react";

export type NavigationItem =
  | undefined
  | {
      titleTranslationKey: string;
      path: string;
      icon: ReactNode;
      hasMessagesCount?: boolean;
    };
