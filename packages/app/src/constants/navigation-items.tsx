import { NavigationItem } from "@nl-portal/nl-portal-user-interface";
import {
  ArchiveIcon,
  CarIcon,
  CheckCircleIcon,
  EuroIcon,
  FileTextIcon,
  GridIcon,
  InboxIcon,
  UserIcon,
} from "@gemeente-denhaag/icons";
import { paths } from "./paths";
import { themes } from "./themes";
import {} from "@gemeente-denhaag/icons";

export const navigationItems: NavigationItem[][] = [
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
    {
      titleTranslationKey: "products",
      path: paths.products,
      icon: <FileTextIcon />,
    },
  ],
  [
    {
      titleTranslationKey: themes.belastingzaken.slug,
      path: paths.themeOverview(themes.belastingzaken.slug),
      icon: <EuroIcon />,
      themeSlug: themes.belastingzaken.slug,
    },
    {
      titleTranslationKey: themes.parkeren.slug,
      path: paths.themeOverview(themes.parkeren.slug),
      icon: <CarIcon />,
      themeSlug: themes.parkeren.slug,
    },
    {
      titleTranslationKey: themes.inkomensondersteuning.slug,
      path: paths.themeOverview(themes.inkomensondersteuning.slug),
      icon: <EuroIcon />,
      themeSlug: themes.inkomensondersteuning.slug,
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
