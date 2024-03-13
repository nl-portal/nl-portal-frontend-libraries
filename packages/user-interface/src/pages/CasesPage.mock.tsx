import CasesPage from "./CasesPage";
import TestProvider, { testPaths as paths } from "../providers/TestProvider";
import { mockRequest } from "./CasesPageRequests.mock";

const routes = [
  {
    path: paths.overview,
    element: <></>,
  },
  {
    path: paths.cases,
    children: [
      {
        index: true,
        element: <CasesPage />,
      },
    ],
  },
];

export const MockCasesPage = () => (
  <TestProvider
    mocks={mockRequest}
    routes={routes}
    initialIndex={1}
    initialEntries={[paths.overview, paths.cases]}
  ></TestProvider>
);
