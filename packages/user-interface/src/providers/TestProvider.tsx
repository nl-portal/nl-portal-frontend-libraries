import { ReactElement } from "react";
import { MockWrapper } from "@nl-portal/nl-portal-localization";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import { Paths } from "../interfaces/paths";

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
  themeSub: (type = ":type", slug = ":slug") => `/${type}/${slug}`,
  account: "/account",
  editAccount: "/account/aanpassen",
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
      <Outlet context={{ paths }} />
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
