import FormsPage from "../../../pages/FormsPage.tsx";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import {
  mockRequest,
  mockRequestEmpty,
} from "../data/FormsPageRequests.mock.tsx";

const route = [
  {
    path: paths.forms,
    children: [
      {
        index: true,
        element: <FormsPage />,
      },
    ],
  },
];

export const MockFormsPageEmpty = () => (
  <TestProvider
    mocks={mockRequestEmpty}
    routes={route}
    initialIndex={0}
    initialEntries={[paths.forms]}
  ></TestProvider>
);

export const MockFormsPage = () => (
  <TestProvider
    mocks={mockRequest}
    routes={route}
    initialIndex={0}
    initialEntries={[paths.forms]}
  ></TestProvider>
);
