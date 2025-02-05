import CasesPage from "../../../pages/CasesPage";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { getZaken } from "../data/zaken.mock";

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
    mocks={[
      getZaken({ pageSize: 10, isOpen: true }),
      getZaken({ pageSize: 10, isOpen: false }),
    ]}
    routes={routes}
    initialIndex={0}
    initialEntries={[paths.cases]}
  ></TestProvider>
);
