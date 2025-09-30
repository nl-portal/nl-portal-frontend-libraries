import {
  AccountPage,
  CaseDetailsPage,
  CasesPage,
  MessageDetailsPage,
  NoMatchPage,
  OverviewPage,
  TasksPage,
  TaskDetailsPage,
  MessagesPage,
  EditContactInfoPage,
  ThemeOverviewPage,
  ThemeDetailsPage,
  currencyFormat,
  capitalizeFirstLetter,
  TableList,
  PortalLink,
  ThemeMutatePage,
  NotifyOnMount,
} from "@nl-portal/nl-portal-user-interface";
import { OidcCallbackPage } from "@nl-portal/nl-portal-authentication";
import { paths } from "./paths";
import { config } from "./config";
import {
  Navigate,
  RouteObject as ReactRouteObject,
  useSearchParams,
} from "react-router";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { Link } from "@gemeente-denhaag/link";
import { OpenProductProduct } from "@nl-portal/nl-portal-api";
import StatusBadge from "@gemeente-denhaag/status-badge";
import { useDateFormatter } from "@nl-portal/nl-portal-localization";

export type RouteObject = ReactRouteObject & {
  handle: {
    label: string;
  };
  children?: RouteObject[];
};

export const routes: RouteObject[] = [
  {
    path: paths.overview,
    handle: { label: "breadcrumb.overview" },
    element: <OverviewPage showIntro showNoEmailAlert />,
  },
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
        element: <CaseDetailsPage showContactTimeline />,
      },
    ],
  },
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
  {
    path: paths.themeOverview("belastingzaken"),
    handle: { label: "breadcrumb.belastingzaken" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.belastingzaken" },
        element: (
          <ThemeOverviewPage
            slug="belastingzaken"
            productenSettings={[
              {
                productTypeCodes: ["BELASTINGZAKEN"],
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
  {
    path: paths.themeOverview("parkeren"),
    handle: { label: "breadcrumb.parkeren" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.parkeren" },
        element: (
          <ThemeOverviewPage
            slug="parkeren"
            productenSettings={[
              {
                productTypeCodes: ["PARKEERVERGUNNING"],
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
              },
              {
                productTypeCodes: ["BEZOEKERSVERGUNNING"],
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
              },
            ]}
          >
            <NotifyOnMount
              id="showThemeInfo"
              variant="info"
              title={<FormattedMessage id="theme.sample.infoTitle" />}
              text={<FormattedMessage id="theme.sample.infoTitle" />}
            />
          </ThemeOverviewPage>
        ),
      },
      {
        path: paths.themeDetails("parkeren"),
        handle: { label: "breadcrumb.parkeren.details" },
        element: (
          <ThemeDetailsPage
            productSettings={{
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
          >
            {({ loading, data }) => {
              const { formatDate } = useDateFormatter();
              const product = data?.getOpenProduct as
                | OpenProductProduct
                | undefined;

              return (
                <>
                  {Boolean(product?.verbruiksobject) && (
                    <TableList
                      loading={loading}
                      titleTranslationId={"Voertuigen"}
                      headers={[
                        <FormattedMessage key="kenteken" id={`Kenteken`} />,
                        "",
                      ]}
                      rows={product?.verbruiksobject?.data?.kentekens?.map(
                        (kenteken: string) => [
                          { children: kenteken },
                          {
                            children: (
                              <Link
                                href={`${paths.themeMutate(
                                  "parkeren",
                                  product?.uuid,
                                )}?kenteken=${kenteken}`}
                                Link={PortalLink}
                              >
                                <FormattedMessage id={`Aanmelden`} />
                              </Link>
                            ),
                          },
                        ],
                      )}
                    />
                  )}
                  {Boolean(product?.verbruiksobject) && (
                    <TableList
                      loading={loading}
                      titleTranslationId={"Periodes"}
                      headers={[
                        <FormattedMessage key="datum" id={`Datum`} />,
                        <FormattedMessage key="kenteken" id={`Kenteken`} />,
                        <FormattedMessage key="status" id={`Status`} />,
                      ]}
                      rows={product?.verbruiksobject?.data?.periodes?.map(
                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (periode: any) => [
                          {
                            children: formatDate({
                              date: periode?.datetimeStart,
                              namedDays: false,
                            }),
                          },
                          { children: periode?.kenteken },
                          {
                            children: (
                              <StatusBadge>{periode?.status}</StatusBadge>
                            ),
                          },
                        ],
                      )}
                    />
                  )}
                </>
              );
            }}
          </ThemeDetailsPage>
        ),
      },
      {
        path: paths.themeMutate("parkeren"),
        handle: { label: "breadcrumb.parkeren.details" },
        element: (
          <ThemeMutatePage slug="parkeren">
            {() => {
              const [searchParams] = useSearchParams();
              return <div>Mutate parkeren: {searchParams.get("kenteken")}</div>;
            }}
          </ThemeMutatePage>
        ),
      },
    ],
  },
  {
    path: paths.themeOverview("inkomensondersteuning"),
    handle: { label: "breadcrumb.inkomensondersteuning" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.inkomensondersteuning" },
        element: (
          <ThemeOverviewPage
            slug="inkomensondersteuning"
            productenSettings={[
              {
                productTypeCodes: ["INKOMENSONDERSTEUNING"],
                titleTranslationId: "Vergunningen",
                headerTranslationIds: ["Naam", "Startdatum", "Einddatum"],
                dataMapping: ["naam", "startDatum", "eindDatum"],
              },
            ]}
          />
        ),
      },
      {
        path: paths.themeDetails("inkomensondersteuning"),
        handle: { label: "breadcrumb.inkomensondersteuning.details" },
        element: <ThemeDetailsPage />,
      },
    ],
  },
  {
    path: paths.account,
    handle: { label: "breadcrumb.account" },
    children: [
      {
        index: true,
        handle: { label: "breadcrumb.account" },
        element: (
          <AccountPage
            showInhabitantAmount={config.SHOW_INHABITANT_AMOUNT}
            addressResearchUrl={config.ADDRESS_RESEARCH_URL}
            reportChangeOfAddressUrl={config.REPORT_CHANGE_OF_ADDRESS_URL}
            changeInUseOfSurnameUrl={config.CHANGE_IN_USE_OF_SURNAME_URL}
            changeRegisteredGenderUrl={config.CHANGE_REGISTERED_GENDER_URL}
            addressResearchMoreInfoUrl={config.ADDRESS_RESEARCH_MORE_INFO_URL}
            requestForChangeBrpInfoUrl={config.REQUEST_FOR_CHANGE_BRP_INFO_URL}
            requestConfidentialityOfDataUrl={
              config.REQUEST_CONFIDENTIALITY_OF_DATA_URL
            }
          />
        ),
      },
      {
        path: paths.changeContactInfo,
        handle: { label: "breadcrumb.account.editContactInfo" },
        element: <EditContactInfoPage />,
      },
    ],
  },
  {
    path: new URL(window.OIDC_REDIRECT_URI).pathname,
    handle: { label: "breadcrumb.oidc" },
    element: <OidcCallbackPage />,
  },
  {
    path: paths.noMatch,
    handle: { label: "breadcrumb.noMatch" },
    element: <NoMatchPage contactLink={{ target: "_blank" }} />,
  },
  {
    path: "*",
    handle: { label: "breadcrumb.noMatch" },
    element: <Navigate to={paths.noMatch} />,
  },
];
