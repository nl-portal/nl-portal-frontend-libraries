import CasePage from "../../../pages/CasePage";
import {
  mocksRequestWithAll,
  mocksRequestWithoutContactMomenten,
  mocksRequestWithoutDocuments,
} from "../data/CasePageRequests.mock";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";

const CasePageTestComponent = () => <CasePage showContactTimeline />;

const caseId = "82cb13cf-d2f9-4e3e-ac07-751373035ecb";

const routes = [
  {
    path: paths.cases,
    children: [
      {
        path: paths.case(),
        element: <CasePageTestComponent />,
      },
    ],
  },
];

export const MockCasePage = () => (
  <TestProvider
    mocks={mocksRequestWithAll}
    routes={routes}
    initialIndex={1}
    initialEntries={[paths.cases, paths.case(caseId)]}
  ></TestProvider>
);

export const MockCasePageWithoutDocuments = () => (
  <TestProvider
    mocks={mocksRequestWithoutDocuments}
    routes={routes}
    initialIndex={2}
    initialEntries={[paths.overview, paths.cases, paths.case(caseId)]}
  ></TestProvider>
);

export const MockCasePageWithoutContactMoments = () => (
  <TestProvider
    mocks={mocksRequestWithoutContactMomenten}
    routes={routes}
    initialIndex={2}
    initialEntries={[paths.overview, paths.cases, paths.case(caseId)]}
  ></TestProvider>
);
