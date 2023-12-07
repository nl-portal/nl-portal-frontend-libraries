import React, {ReactElement} from 'react';
import {MemoryRouter} from 'react-router-dom';
import {MockedProvider} from '@apollo/client/testing';
import {Locales, LocalizationProvider} from '@nl-portal/nl-portal-localization';
import {UserInformationProvider} from '../../providers';
import {CasePage} from './case-page';
import {CUSTOM_MESSAGES} from '../../testUtils/custom-messages/custom-messages';
import {
  mocksRequestWithAll,
  mocksRequestWithoutContactMomenten,
  mocksRequestWithoutDocuments,
} from './case-page-requests.mock';

export const MockCasePage = (): ReactElement => {
  const route = '/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb';

  const LOCALES_TEST: Locales = {
    DUTCH: 'nl-NL',
  };

  let showCTline = true;

  return (
    <LocalizationProvider customMessages={CUSTOM_MESSAGES} customLocales={LOCALES_TEST}>
      <UserInformationProvider>
        <MockedProvider mocks={mocksRequestWithAll} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>
            <CasePage
              showContactTimeline={showCTline}
              statusHistoryFacet={<img src={''} alt="" />}
              statusHistoryBackground={<img src={''} alt="" />}
            />
          </MemoryRouter>
        </MockedProvider>
      </UserInformationProvider>
    </LocalizationProvider>
  );
};

export const MockCasePageWithoutDocuments = (): ReactElement => {
  const route = '/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb';

  const LOCALES_TEST: Locales = {
    DUTCH: 'nl-NL',
  };

  let showCTline = true;

  return (
    <LocalizationProvider customMessages={CUSTOM_MESSAGES} customLocales={LOCALES_TEST}>
      <UserInformationProvider>
        <MockedProvider mocks={mocksRequestWithoutDocuments} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>
            <CasePage
              showContactTimeline={showCTline}
              statusHistoryFacet={<img src={''} alt="" />}
              statusHistoryBackground={<img src={''} alt="" />}
            />
          </MemoryRouter>
        </MockedProvider>
      </UserInformationProvider>
    </LocalizationProvider>
  );
};

export const MockCasePageWithoutContactMoments = (): ReactElement => {
  const route = '/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb';

  const LOCALES_TEST: Locales = {
    DUTCH: 'nl-NL',
  };

  let showCTline = true;

  return (
    <LocalizationProvider customMessages={CUSTOM_MESSAGES} customLocales={LOCALES_TEST}>
      <UserInformationProvider>
        <MockedProvider mocks={mocksRequestWithoutContactMomenten} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>
            <CasePage
              showContactTimeline={showCTline}
              statusHistoryFacet={<img src={''} alt="" />}
              statusHistoryBackground={<img src={''} alt="" />}
            />
          </MemoryRouter>
        </MockedProvider>
      </UserInformationProvider>
    </LocalizationProvider>
  );
};
