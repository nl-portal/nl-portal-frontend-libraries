import React, { ReactElement } from "react";
import { LocalizationProvider } from "@nl-portal/nl-portal-localization";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import UserInformationProvider from "./UserInformationProvider";

const TestProvider = ({
  children,
  mocks,
  route,
}: {
  children: React.ReactNode;
  mocks: MockedResponse<Record<string, any>>[];
  route: string;
}): ReactElement => (
  <LocalizationProvider>
    <UserInformationProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </MockedProvider>
    </UserInformationProvider>
  </LocalizationProvider>
);

export default TestProvider;
