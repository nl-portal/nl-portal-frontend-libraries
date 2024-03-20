import CasesPage from "../../../pages/CasesPage";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { mockRequest } from "../data/CasesPageRequests.mock";

const routes = [
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
    initialIndex={0}
    initialEntries={[paths.cases]}
  ></TestProvider>
);
