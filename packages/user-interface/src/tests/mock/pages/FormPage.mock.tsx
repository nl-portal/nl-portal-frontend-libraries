import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider.tsx";
import FormPage from "../../../pages/FormPage.tsx";
import {
  mockRequestEmpty,
  mockRequest,
} from "../data/FormPageRequests.mock.tsx";

const formId = "startForm";
const route = [
  {
    path: paths.forms,
    children: [
      {
        path: paths.form(),
        element: <FormPage />,
      },
    ],
  },
];

export const MockFormPageEmpty = () => (
  <TestProvider
    mocks={mockRequestEmpty}
    routes={route}
    initialIndex={1}
    initialEntries={[paths.forms, paths.form(formId)]}
  ></TestProvider>
);

export const MockFormPage = () => (
  <TestProvider
    mocks={mockRequest}
    routes={route}
    initialIndex={1}
    initialEntries={[paths.forms, paths.form(formId)]}
  ></TestProvider>
);
