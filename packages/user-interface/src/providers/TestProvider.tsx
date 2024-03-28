import { ReactElement } from "react";
import { MockWrapper } from "@nl-portal/nl-portal-localization";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import UserInformationProvider from "./UserInformationProvider";
import { Paths } from "../interfaces/paths";

//eslint-disable-next-line react-refresh/only-export-components
export const testPaths: Paths = {
  overview: "/",
  cases: "/zaken",
  case: (id = ":id") => `/zaken/zaak/${id}`,
  tasks: "/taken",
  task: (id = ":id") => `/taken/taak/${id}`,
  notifications: "/berichten",
  themeOverview: (type = ":type") => `/${type}`,
  themeDetails: (type = ":type", id = ":id") => `/${type}/${id}`,
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
    <UserInformationProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Outlet context={{ paths }} />
      </MockedProvider>
    </UserInformationProvider>
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
