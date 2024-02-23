import { ReactElement } from "react";
import { LocalizationProvider } from "@nl-portal/nl-portal-localization";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  createMemoryRouter,
  Outlet,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import UserInformationProvider from "./UserInformationProvider";
import { Paths } from "../interfaces/paths";

export const testPaths: Paths = {
  overview: "/",
  cases: "/zaken",
  case: (id = ":id") => `/zaken/zaak/${id}`,
  tasks: "/taken",
  task: (id = ":id") => `/taken/taak/${id}`,
  notifications: "/berichten",
  themes: "/themas",
  forms: "/formulieren",
  form: (id = ":id") => `/formulieren/formulier/${id}`,
  account: "/account",
  editAccount: "/account/aanpassen",
};

const TestContent = ({
  mocks,
  paths,
}: {
  mocks: MockedResponse<Record<string, any>>[];
  paths: Paths;
}) => (
  <LocalizationProvider>
    <UserInformationProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Outlet context={{ paths }} />
      </MockedProvider>
    </UserInformationProvider>
  </LocalizationProvider>
);

const TestProvider = ({
  mocks,
  paths = testPaths,
  routes,
  initialEntries,
  initialIndex,
}: {
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
