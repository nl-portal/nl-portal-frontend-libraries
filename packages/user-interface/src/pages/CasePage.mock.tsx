import CasePage from "./CasePage";
import {
  mocksRequestWithAll,
  mocksRequestWithoutContactMomenten,
  mocksRequestWithoutDocuments,
} from "./CasePageRequests.mock";
import TestProvider from "../providers/TestProvider";

const routeCase = "/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb";

const CasePageTestComponent = () => (
  <CasePage
    showContactTimeline
    statusHistoryFacet={<img src="" alt="" />}
    statusHistoryBackground={<img src="" alt="" />}
  />
);

export const MockCasePage = () => (
  <TestProvider mocks={mocksRequestWithAll} route={routeCase}>
    <CasePageTestComponent />
  </TestProvider>
);

export const MockCasePageWithoutDocuments = () => (
  <TestProvider mocks={mocksRequestWithoutDocuments} route={routeCase}>
    <CasePageTestComponent />
  </TestProvider>
);

export const MockCasePageWithoutContactMoments = () => (
  <TestProvider mocks={mocksRequestWithoutContactMomenten} route={routeCase}>
    <CasePageTestComponent />
  </TestProvider>
);
