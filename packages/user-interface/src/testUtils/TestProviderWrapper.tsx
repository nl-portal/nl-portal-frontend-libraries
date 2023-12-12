import {LocalizationProvider} from '@nl-portal/nl-portal-localization';
import {ReactElement} from 'react';
import {UserInformationProvider} from '../providers';
import React from 'react';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import {MemoryRouter} from 'react-router-dom';
import {CUSTOM_MESSAGES} from './../../../app/src/i18n/custom-messages/custom-messages';

export const TestProviderWrapper = ({
  children,
  mocks,
  route,
}: {
  children: React.ReactNode;
  mocks: MockedResponse<Record<string, any>>[];
  route: string;
}): ReactElement => {
  return (
    <LocalizationProvider customMessages={CUSTOM_MESSAGES}>
      <UserInformationProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </MockedProvider>
      </UserInformationProvider>
    </LocalizationProvider>
  );
};
