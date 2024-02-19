import CasePage from "./CasePage";
import {
  mocksRequestWithAll,
  mocksRequestWithoutContactMomenten,
  mocksRequestWithoutDocuments,
} from "./CasePageRequests.mock";
import TestProvider, { testPaths as paths } from "../providers/TestProvider";

const CasePageTestComponent = () => <CasePage showContactTimeline />;

const caseId = "82cb13cf-d2f9-4e3e-ac07-751373035ecb";

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
        element: <></>,
      },
      {
        path: paths.case,
        element: <CasePageTestComponent />,
      },
    ],
  },
];

export const MockCasePage = () => (
  <TestProvider
    mocks={mocksRequestWithAll}
    routes={routes}
    initialIndex={2}
    initialEntries={[
      paths.overview,
      paths.cases,
      paths.case.replace(":id", caseId),
    ]}
  ></TestProvider>
);

export const MockCasePageWithoutDocuments = () => (
  <TestProvider
    mocks={mocksRequestWithoutDocuments}
    routes={routes}
    initialIndex={2}
    initialEntries={[
      paths.overview,
      paths.cases,
      paths.case.replace(":id", caseId),
    ]}
  ></TestProvider>
);

export const MockCasePageWithoutContactMoments = () => (
  <TestProvider
    mocks={mocksRequestWithoutContactMomenten}
    routes={routes}
    initialIndex={2}
    initialEntries={[
      paths.overview,
      paths.cases,
      paths.case.replace(":id", caseId),
    ]}
  ></TestProvider>
);
