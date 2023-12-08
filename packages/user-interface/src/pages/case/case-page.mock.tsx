import React, {ReactElement} from 'react';
import {MemoryRouter} from 'react-router-dom';
import {MockedProvider} from '@apollo/client/testing';
import {CasePage} from './case-page';
import {
  mocksRequestWithAll,
  mocksRequestWithoutContactMomenten,
  mocksRequestWithoutDocuments,
} from './case-page-requests.mock';
import {TestProviderWrapper} from '../../testUtils/TestProviderWrapper/TestProviderWrapper';

const route = '/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb';

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
    <TestProviderWrapper>
      <MockedProvider mocks={mocksRequestWithAll} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>
          <CasePageTestComponent />
        </MemoryRouter>
      </MockedProvider>
    </TestProviderWrapper>
  );
};

export const MockCasePageWithoutDocuments = (): ReactElement => {
  return (
    <TestProviderWrapper>
      <MockedProvider mocks={mocksRequestWithoutDocuments} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>
          <CasePageTestComponent />
        </MemoryRouter>
      </MockedProvider>
    </TestProviderWrapper>
  );
};

export const MockCasePageWithoutContactMoments = (): ReactElement => {
  return (
    <TestProviderWrapper>
      <MockedProvider mocks={mocksRequestWithoutContactMomenten} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>
          <CasePageTestComponent />
        </MemoryRouter>
      </MockedProvider>
    </TestProviderWrapper>
  );
};
