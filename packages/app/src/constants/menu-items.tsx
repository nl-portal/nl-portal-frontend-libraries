import {
  ArchiveIcon,
  DocumentIcon,
  GridIcon,
  InboxIcon,
  UserIcon,
} from "@gemeente-denhaag/icons";
import { paths } from "./paths";

export const menuItems = [
  {
    titleTranslationKey: "overview",
    path: paths.overview,
    icon: <GridIcon />,
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
    titleTranslationKey: "forms",
    path: paths.forms,
    icon: <DocumentIcon />,
  },
  {
    titleTranslationKey: "account",
    path: paths.account,
    icon: <UserIcon />,
  },
];
