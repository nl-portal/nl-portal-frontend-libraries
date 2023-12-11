import {Locales, LocalizationProvider} from '@nl-portal/nl-portal-localization';
import {ReactElement} from 'react';
import {UserInformationProvider} from '../../providers';
import {CUSTOM_MESSAGES} from '../custom-messages/custom-messages';
import React from 'react';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import {MemoryRouter} from 'react-router-dom';

export const TestProviderWrapper = ({
  children,
  mocks,
  route,
}: {
  children: React.ReactNode;
  mocks: MockedResponse<Record<string, any>>[];
  route: string;
}): ReactElement => {
  const LOCALES_TEST: Locales = {
    DUTCH: 'nl-NL',
  };

  return (
    <LocalizationProvider customMessages={CUSTOM_MESSAGES} customLocales={LOCALES_TEST}>
      <UserInformationProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </MockedProvider>
      </UserInformationProvider>
    </LocalizationProvider>
  );
};
