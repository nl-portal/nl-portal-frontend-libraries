import React, {ReactElement} from 'react';
import {MemoryRouter} from 'react-router-dom';
import {MockedProvider} from '@apollo/client/testing';
import {AccountPage} from './account-page';
import {TestProviderWrapper} from '../../testUtils/TestProviderWrapper/TestProviderWrapper';
import {mocksRequestBurgerGegevens} from './account-page-requests.mock';

const route = '/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb';

const AccountPageTestComponent = ({}): ReactElement => {
  return <AccountPage showNotificationSubSection="false" />;
};

export const MockAccountPage = (): ReactElement => {
  return (
    <TestProviderWrapper>
      <MockedProvider mocks={mocksRequestBurgerGegevens} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>
          <AccountPageTestComponent />
        </MemoryRouter>
      </MockedProvider>
    </TestProviderWrapper>
  );
};
