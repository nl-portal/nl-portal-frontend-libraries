import {
  AccountPage,
  CaseDetailsPage,
  CasesPage,
  MessageDetailsPage,
  NoMatchPage,
  OverviewPage,
  ProductsPage,
  TasksPage,
  TaskDetailsPage,
  MessagesPage,
  EditContactInfoPage,
  ThemeOverviewPage,
  ThemeDetailsPage,
  ThemeMutatePage,
  ThemeListPage,
  capitalizeFirstLetter,
  currencyFormat,
} from "@nl-portal/nl-portal-user-interface";
import { OidcCallbackPage } from "@nl-portal/nl-portal-authentication";
import { paths } from "./paths";
import { Navigate, useSearchParams } from "react-router";
import { themes } from "./themes";
import ParkerenOverview from "../pages/ParkerenOverview";
import ParkerenDetails from "../pages/ParkerenDetails";
import ParkerenHistory from "../pages/ParkerenHistory";
import { FormattedNumber } from "react-intl";

export const routes = [
  {
    path: paths.overview,
    handle: { label: "breadcrumb.overview" },
    element: <OverviewPage showNoEmailAlert />,
  },
  // Zaken
  {
    path: paths.cases,
    handle: { label: "breadcrumb.cases" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.cases" },
        element: <CasesPage />,
      },
      {
        path: paths.case(),
        handle: { label: "breadcrumb.cases.details" },
        element: <CaseDetailsPage />,
      },
    ],
  },
  // Taken
  {
    path: paths.tasks,
    handle: { label: "breadcrumb.tasks" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.tasks" },
        element: <TasksPage />,
      },
      {
        path: paths.task(),
        handle: { label: "breadcrumb.tasks.details" },
        element: <TaskDetailsPage />,
      },
    ],
  },
  // Berichten
  {
    path: paths.messages,
    handle: { label: "breadcrumb.messages" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.messages" },
        element: <MessagesPage />,
      },
      {
        path: paths.message(),
        handle: { label: "breadcrumb.messages.details" },
        element: <MessageDetailsPage />,
      },
    ],
  },
  // Producten
  {
    path: paths.products,
    handle: { label: "breadcrumb.products" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.products" },
        element: <ProductsPage />,
      },
    ],
  },
  // Belastingzaken
  {
    path: paths.themeOverview(themes.belastingzaken.slug),
    handle: { label: `breadcrumb.${themes.belastingzaken.slug}` },
    children: [
      {
        index: true,
        handle: { label: `breadcrumb.${themes.belastingzaken.slug}` },
        element: (
          <ThemeOverviewPage
            slug={themes.belastingzaken.slug}
            productenSettings={[
              {
                productTypeCodes: [
                  themes.belastingzaken.productTypes.belastingzaken?.code,
                ],
                titleTranslationId: "Producten",
                headerTranslationIds: ["Naam", "Startdatum", "Einddatum"],
                dataMapping: ["naam", "startDatum", "eindDatum"],
              },
            ]}
          />
        ),
      },
    ],
  },
  // Parkeren
  {
    path: paths.themeOverview(themes.parkeren.slug),
    handle: { label: `breadcrumb.${themes.parkeren.slug}` },
    children: [
      {
        index: true,
        handle: { label: `breadcrumb.${themes.parkeren.slug}` },
        element: <ParkerenOverview />,
      },
      {
        path: `${paths.themeList(themes.parkeren.slug, themes.parkeren.productTypes.vergunningen?.slug)}`,
        handle: { label: `breadcrumb.${themes.parkeren.slug}` },
        element: (
          <ThemeListPage
            slug={themes.parkeren.slug}
            productSettings={{
              productTypeCodes: [
                themes.parkeren.productTypes.vergunningen?.code,
              ],
              titleTranslationId: "Vergunningen",
              headerTranslationIds: [
                "Naam",
                "Startdatum",
                "Einddatum",
                "Status",
                "Prijs",
              ],
              dataMapping: [
                "naam",
                "startDatum",
                "eindDatum",
                (product) =>
                  capitalizeFirstLetter(product?.status.toLowerCase() ?? ""),
                (product) => {
                  return (
                    <FormattedNumber
                      value={product?.prijs ?? 0}
                      {...currencyFormat}
                    />
                  );
                },
              ],
            }}
          />
        ),
      },
      {
        path: `${paths.themeList(themes.parkeren.slug, themes.parkeren.productTypes.bezoekersvergunningen?.slug)}`,
        handle: { label: `breadcrumb.${themes.parkeren.slug}` },
        element: (
          <ThemeListPage
            slug={themes.parkeren.slug}
            productSettings={{
              productTypeCodes: [
                themes.parkeren.productTypes.bezoekersvergunningen?.code,
              ],
              titleTranslationId: "Bezoekersvergunningen",
              headerTranslationIds: ["Naam", "Startdatum", "Status", "Prijs"],
              dataMapping: [
                "naam",
                "startDatum",
                (product) =>
                  capitalizeFirstLetter(product?.status.toLowerCase() ?? ""),
                (product) => {
                  return (
                    <FormattedNumber
                      value={product?.prijs ?? 0}
                      {...currencyFormat}
                    />
                  );
                },
              ],
            }}
          />
        ),
      },
      {
        path: paths.themeDetails(
          themes.parkeren.slug,
          themes.parkeren.productTypes.bezoekersvergunningen?.slug,
        ),
        handle: { label: `breadcrumb.${themes.parkeren.slug}.details` },
        element: <ParkerenDetails />,
      },
      {
        path: paths.themeHistory(
          themes.parkeren.slug,
          themes.parkeren.productTypes.bezoekersvergunningen?.slug,
        ),
        handle: { label: `breadcrumb.${themes.parkeren.slug}.details` },
        element: <ParkerenHistory />,
      },
      {
        path: paths.themeMutate(
          themes.parkeren.slug,
          themes.parkeren.productTypes.bezoekersvergunningen?.slug,
        ),
        handle: { label: `breadcrumb.${themes.parkeren.slug}.details` },
        element: (
          <ThemeMutatePage slug={themes.parkeren.slug}>
            {() => {
              const [searchParams] = useSearchParams();
              return <div>Mutate parkeren: {searchParams.get("kenteken")}</div>;
            }}
          </ThemeMutatePage>
        ),
      },
    ],
  },
  // Inkomenondersteuning
  {
    path: paths.themeOverview(themes.inkomensondersteuning.slug),
    handle: { label: `breadcrumb.${themes.inkomensondersteuning.slug}` },
    children: [
      {
        index: true,
        handle: { label: `breadcrumb.${themes.inkomensondersteuning.slug}` },
        element: (
          <ThemeOverviewPage
            slug={themes.inkomensondersteuning.slug}
            productenSettings={[
              {
                productTypeCodes: [
                  themes.inkomensondersteuning.productTypes.stadspas?.code,
                ],
                titleTranslationId: "Vergunningen",
                headerTranslationIds: ["Naam", "Startdatum", "Einddatum"],
                dataMapping: ["naam", "startDatum", "eindDatum"],
              },
            ]}
          />
        ),
      },
      {
        path: paths.themeDetails(
          themes.inkomensondersteuning.slug,
          themes.inkomensondersteuning.productTypes.stadspas?.slug,
        ),
        handle: {
          label: `breadcrumb.${themes.inkomensondersteuning.slug}.details`,
        },
        element: <ThemeDetailsPage />,
      },
    ],
  },
  // Account
  {
    path: paths.account,
    handle: { label: "breadcrumb.account" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.account" },
        element: <AccountPage />,
      },
      {
        path: paths.changeContactInfo(),
        handle: { label: "breadcrumb.account.editContactInfo" },
        element: <EditContactInfoPage />,
      },
    ],
  },
  // OIDC Callback
  {
    path: new URL(window.OIDC_REDIRECT_URI).pathname,
    element: <OidcCallbackPage />,
  },
  // No Match
  {
    path: paths.noMatch,
    handle: { label: "breadcrumb.noMatch" },
    element: <NoMatchPage contactLink={{ target: "_blank" }} />,
  },
  // Catch All
  {
    path: "*",
    handle: { label: "breadcrumb.noMatch" },
    element: <Navigate to={paths.noMatch} />,
  },
];
