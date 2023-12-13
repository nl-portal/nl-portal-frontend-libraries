import {LocalizationProvider} from '@nl-portal/nl-portal-localization';
import {ReactElement} from 'react';
import {UserInformationProvider} from '../providers';
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
  return (
    <LocalizationProvider>
      <UserInformationProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
        </MockedProvider>
      </UserInformationProvider>
    </LocalizationProvider>
  );
};
