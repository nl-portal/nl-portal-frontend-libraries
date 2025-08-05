import { ReactElement } from "react";
import {
  LocalizationProvider,
  MockWrapper,
} from "@nl-portal/nl-portal-localization";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { Outlet, RouteObject } from "react-router";
import { Paths } from "../interfaces/paths";
import { NotificationProvider } from "../contexts/NotificationContext";
import { AppProvider } from "../contexts/AppContext";
import { RouterProvider } from "../contexts/RouterContext";
import { NavigationItem } from "../interfaces/navigation-item";
import {
  ArchiveIcon,
  CarIcon,
  CheckCircleIcon,
  EuroIcon,
  GridIcon,
  InboxIcon,
  UserIcon,
} from "@gemeente-denhaag/icons";
import PageMetaData from "../components/PageMetaData";
import { UserProvider } from "../contexts/UserContext";

export const testPaths: Paths = {
  noMatch: "/404",
  overview: "/",
  cases: "/zaken",
  case: (id = ":id") => `/zaken/zaak/${id}`,
  tasks: "/taken",
  task: (id = ":id") => `/taken/taak/${id}`,
  messages: "/berichten",
  message: (id = ":id") => `/berichten/bericht/${id}`,
  themeOverview: (type = ":type") => `/${type}`,
  themeDetails: (type = ":type", id = ":id") => `/${type}/${id}`,
  account: "/account",
  changeContactInfo: "/account/wijzig/contact",
  changeNotifications: "/account/wijzig/notificaties",
};

export const testNavigationItems: NavigationItem[][] = [
  [
    {
      titleTranslationKey: "overview",
      path: testPaths.overview,
      icon: <GridIcon />,
    },
  ],
  [
    {
      titleTranslationKey: "tasks",
      path: testPaths.tasks,
      icon: <CheckCircleIcon />,
    },
    {
      titleTranslationKey: "cases",
      path: testPaths.cases,
      icon: <ArchiveIcon />,
    },
    {
      titleTranslationKey: "messages",
      path: testPaths.messages,
      icon: <InboxIcon />,
      hasMessagesCount: true,
    },
  ],
  [
    {
      titleTranslationKey: "belastingzaken",
      path: testPaths.themeOverview("belastingzaken"),
      icon: <EuroIcon />,
      themeSlug: "belastingzaken",
    },
    {
      titleTranslationKey: "parkeren",
      path: testPaths.themeOverview("parkeren"),
      icon: <CarIcon />,
      themeSlug: "parkeren",
    },
    {
      titleTranslationKey: "inkomensondersteuning",
      path: testPaths.themeOverview("inkomensondersteuning"),
      icon: <EuroIcon />,
      themeSlug: "inkomensondersteuning",
    },
  ],
  [
    {
      titleTranslationKey: "account",
      path: testPaths.account,
      icon: <UserIcon />,
    },
  ],
];

const TestContent = ({
  mocks,
  paths,
}: {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  mocks: MockedResponse<Record<string, any>>[];
  paths: Paths;
}) => {
  return (
    <MockWrapper>
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocalizationProvider>
          <NotificationProvider>
            <UserProvider>
              <AppProvider>
                <PageMetaData />
                <Outlet context={{ paths }} />
              </AppProvider>
            </UserProvider>
          </NotificationProvider>
        </LocalizationProvider>
      </MockedProvider>
    </MockWrapper>
  );
};

const TestProvider = ({
  mocks,
  paths = testPaths,
  routes,
  initialIndex,
  initialEntries,
}: {
  mocks: MockedResponse<Record<string, unknown>>[];
  paths?: Paths;
  routes: RouteObject[];
  initialIndex?: number;
  initialEntries?: string[];
}): ReactElement => {
  return (
    <RouterProvider
      element={<TestContent mocks={mocks} paths={paths} />}
      routes={routes}
      navigationItems={testNavigationItems}
      test={{
        initialIndex,
        initialEntries,
      }}
    />
  );
};

export default TestProvider;
