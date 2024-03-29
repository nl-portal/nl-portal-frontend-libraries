import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { mockRequest } from "../data/CasesPageRequests.mock";
import CasesPage from "../../../pages/CasesPage";

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
