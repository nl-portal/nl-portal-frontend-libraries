import { NavigationItem } from "@nl-portal/nl-portal-user-interface";
import {
  ArchiveIcon,
  DocumentIcon,
  GridIcon,
  InboxIcon,
  ListIcon,
  UserIcon
} from "@gemeente-denhaag/icons";
import { paths } from "./paths";

export const menuItems: NavigationItem[] = [
  {
    titleTranslationKey: "overview",
    path: paths.overview,
    icon: <GridIcon />,
  },
  {
    titleTranslationKey: "forms",
    path: paths.forms,
    icon: <ListIcon />,
  },
  {
    titleTranslationKey: "notifications",
    path: paths.notifications,
    icon: <InboxIcon />,
    hasMessagesCount: true,
  },
  {
    titleTranslationKey: "cases",
    path: paths.cases,
    icon: <ArchiveIcon />,
  },
  {
    titleTranslationKey: "tasks",
    path: paths.tasks,
    icon: <DocumentIcon />,
  },
  {
    titleTranslationKey: "themes",
    path: paths.themes,
    icon: <DocumentIcon />,
  },
  {
    titleTranslationKey: "account",
    path: paths.account,
    icon: <UserIcon />,
  },
];
