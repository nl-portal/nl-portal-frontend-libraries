import CasesPage from "../../../pages/CasesPage";
import TestProvider, { testPaths } from "../../../providers/TestProvider";
import { getProduct } from "../data/product.mock";
import { getUnopenedBerichten } from "../data/unopened-berichten";
import { getZaken } from "../data/zaken.mock";

const routes = [
  {
    path: testPaths.cases,
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
      getProduct,
      getUnopenedBerichten,
      getZaken({ pageSize: 10, isOpen: true }),
      getZaken({ pageSize: 10, isOpen: false }),
      getZaken({ pageSize: 10, isOpen: false, page: 1 }),
      getZaken({ pageSize: 10, isOpen: false, page: 1, identificatie: "" }),
    ]}
    routes={routes}
    initialIndex={0}
    initialEntries={[testPaths.cases]}
  ></TestProvider>
);
