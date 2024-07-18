import { NavigationItem } from "@nl-portal/nl-portal-user-interface";
import {
  ArchiveIcon,
  CheckCircleIcon,
  DocumentIcon,
  GridIcon,
  InboxIcon,
  UserIcon,
} from "@gemeente-denhaag/icons";
import { paths } from "./paths";

export const menuItems: NavigationItem[][] = [
  [
    {
      titleTranslationKey: "overview",
      path: paths.overview,
      icon: <GridIcon />,
    },
  ],
  [
    {
      titleTranslationKey: "tasks",
      path: paths.tasks,
      icon: <CheckCircleIcon />,
    },
    {
      titleTranslationKey: "messages",
      path: paths.messages,
      icon: <InboxIcon />,
      hasMessagesCount: true,
    },
    {
      titleTranslationKey: "cases",
      path: paths.cases,
      icon: <ArchiveIcon />,
    },
  ],
  [
    {
      titleTranslationKey: "sample",
      path: paths.themeOverview("sample"),
      icon: <DocumentIcon />,
    },
  ],
  [
    {
      titleTranslationKey: "account",
      path: paths.account,
      icon: <UserIcon />,
    },
  ],
];
