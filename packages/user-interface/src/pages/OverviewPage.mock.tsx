import TestProvider, { testPaths as paths } from "../providers/TestProvider";
import { mockRequest } from "./CasesPageRequests.mock";
import CasesPage from "./CasesPage";

//const route = "/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb";

const route = [
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

export const MockOverviewPage = () => (
  <TestProvider
  mocks={mockRequest}
  routes={route}
  initialIndex={1}
  initialEntries={[paths.overview, paths.cases]}
></TestProvider>
);
