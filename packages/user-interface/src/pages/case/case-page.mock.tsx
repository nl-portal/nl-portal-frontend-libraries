import React, {ReactElement} from 'react';
import {CasePage} from './case-page';
import {
  mocksRequestWithAll,
  mocksRequestWithoutContactMomenten,
  mocksRequestWithoutDocuments,
} from './case-page-requests.mock';
import {TestProviderWrapper} from '../../testUtils/TestProviderWrapper/TestProviderWrapper';

const routeCase = '/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb';

const CasePageTestComponent = ({}): ReactElement => {
  return (
    <CasePage
      showContactTimeline={true}
      statusHistoryFacet={<img src="" alt="" />}
      statusHistoryBackground={<img src="" alt="" />}
    />
  );
};

export const MockCasePage = (): ReactElement => {
  return (
    <TestProviderWrapper mocks={mocksRequestWithAll} route={routeCase}>
      <CasePageTestComponent />
    </TestProviderWrapper>
  );
};

export const MockCasePageWithoutDocuments = (): ReactElement => {
  return (
    <TestProviderWrapper mocks={mocksRequestWithoutDocuments} route={routeCase}>
      <CasePageTestComponent />
    </TestProviderWrapper>
  );
};

export const MockCasePageWithoutContactMoments = (): ReactElement => {
  return (
    <TestProviderWrapper mocks={mocksRequestWithoutContactMomenten} route={routeCase}>
      <CasePageTestComponent />
    </TestProviderWrapper>
  );
};
