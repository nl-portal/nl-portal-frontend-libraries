import React, {ReactElement} from 'react';
import {CasePage} from './case-page';
import {
  mocksRequestWithAll,
  mocksRequestWithoutContactMomenten,
  mocksRequestWithoutDocuments,
} from './case-page-requests.mock';
import {TestProvider} from '../../providers/TestProvider';

const routeCase = '/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb';

const CasePageTestComponent = ({}): ReactElement => (
  <CasePage
    showContactTimeline
    statusHistoryFacet={<img src="" alt="" />}
    statusHistoryBackground={<img src="" alt="" />}
  />
);

export const MockCasePage = (): ReactElement => (
  <TestProvider mocks={mocksRequestWithAll} route={routeCase}>
    <CasePageTestComponent />
  </TestProvider>
);

export const MockCasePageWithoutDocuments = (): ReactElement => (
  <TestProvider mocks={mocksRequestWithoutDocuments} route={routeCase}>
    <CasePageTestComponent />
  </TestProvider>
);

export const MockCasePageWithoutContactMoments = (): ReactElement => (
  <TestProvider mocks={mocksRequestWithoutContactMomenten} route={routeCase}>
    <CasePageTestComponent />
  </TestProvider>
);
