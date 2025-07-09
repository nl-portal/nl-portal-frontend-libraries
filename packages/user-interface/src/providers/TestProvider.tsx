import { ReactElement } from "react";
import {
  LocalizationProvider,
  MockWrapper,
} from "@nl-portal/nl-portal-localization";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  RouteObject,
} from "react-router";
import { Paths } from "../interfaces/paths";
import { NotificationProvider } from "../contexts/NotificationContext";
import { AppProvider } from "../contexts/AppContext";

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

const TestContent = ({
  mocks,
  paths,
}: {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  mocks: MockedResponse<Record<string, any>>[];
  paths: Paths;
}) => (
  <MockWrapper>
    <MockedProvider mocks={mocks} addTypename={false}>
      <LocalizationProvider>
        <NotificationProvider>
          <AppProvider>
            <Outlet context={{ paths }} />
          </AppProvider>
        </NotificationProvider>
      </LocalizationProvider>
    </MockedProvider>
  </MockWrapper>
);

const TestProvider = ({
  mocks,
  paths = testPaths,
  routes,
  initialEntries,
  initialIndex,
}: {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  mocks: MockedResponse<Record<string, any>>[];
  paths?: Paths;
  routes: RouteObject[];
  initialEntries: string[];
  initialIndex: number;
}): ReactElement => {
  const testRouter = [
    { element: <TestContent mocks={mocks} paths={paths} />, children: routes },
  ];
  const router = createMemoryRouter(testRouter, {
    initialEntries,
    initialIndex,
  });

  return <RouterProvider router={router} />;
};

export default TestProvider;
