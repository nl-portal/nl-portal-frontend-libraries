import { NavigationItem } from "@nl-portal/nl-portal-user-interface";
import {
  ArchiveIcon,
  CarIcon,
  CheckCircleIcon,
  EuroIcon,
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
      titleTranslationKey: "cases",
      path: paths.cases,
      icon: <ArchiveIcon />,
    },
    {
      titleTranslationKey: "messages",
      path: paths.messages,
      icon: <InboxIcon />,
      hasMessagesCount: true,
    },
  ],
  [
    {
      titleTranslationKey: "belastingzaken",
      path: paths.themeOverview("belastingzaken"),
      icon: <EuroIcon />,
      themeSlug: "belastingzaken",
    },
    {
      titleTranslationKey: "parkeren",
      path: paths.themeOverview("parkeren"),
      icon: <CarIcon />,
      themeSlug: "parkeren",
    },
    {
      titleTranslationKey: "inkomensondersteuning",
      path: paths.themeOverview("inkomensondersteuning"),
      icon: <EuroIcon />,
      themeSlug: "inkomensondersteuning",
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
