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

export const menuItems: NavigationItem[] = [
  {
    titleTranslationKey: "overview",
    path: paths.overview,
    icon: <GridIcon />,
  },
  undefined,
  {
    titleTranslationKey: "tasks",
    path: paths.tasks,
    icon: <CheckCircleIcon />,
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
  undefined,
  {
    titleTranslationKey: "themes",
    path: paths.themes,
    icon: <DocumentIcon />,
  },
  undefined,
  {
    titleTranslationKey: "account",
    path: paths.account,
    icon: <UserIcon />,
  },
];
