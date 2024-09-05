import CaseDetailsPage from "../../../pages/CaseDetailsPage";
import {
  mocksRequestWithAll,
  mocksRequestWithoutContactMomenten,
  mocksRequestWithoutDocuments,
} from "../data/CaseDetailsPageRequests.mock";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";

const CaseDetailsPageTestComponent = () => (
  <CaseDetailsPage showContactTimeline />
);

const caseId = "82cb13cf-d2f9-4e3e-ac07-751373035ecb";

const routes = [
  {
    path: paths.cases,
    children: [
      {
        path: paths.case(),
        element: <CaseDetailsPageTestComponent />,
      },
    ],
  },
];

export const MockCaseDetailsPage = () => (
  <TestProvider
    mocks={mocksRequestWithAll}
    routes={routes}
    initialIndex={1}
    initialEntries={[paths.cases, paths.case(caseId)]}
  ></TestProvider>
);

export const MockCaseDetailsPageWithoutDocuments = () => (
  <TestProvider
    mocks={mocksRequestWithoutDocuments}
    routes={routes}
    initialIndex={2}
    initialEntries={[paths.overview, paths.cases, paths.case(caseId)]}
  ></TestProvider>
);

export const MockCaseDetailsPageWithoutContactMoments = () => (
  <TestProvider
    mocks={mocksRequestWithoutContactMomenten}
    routes={routes}
    initialIndex={2}
    initialEntries={[paths.overview, paths.cases, paths.case(caseId)]}
  ></TestProvider>
);
