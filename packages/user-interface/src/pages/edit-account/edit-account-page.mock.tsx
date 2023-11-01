import React, {ReactElement} from 'react';
import {MemoryRouter} from 'react-router-dom';
import {MockedProvider} from '@apollo/client/testing';
import {gql} from '@apollo/client';
import {LocalizationProvider} from '@nl-portal/nl-portal-localization';
import {UserInformationProvider} from '../../providers';
import {EditAccountPage} from './edit-account-page';

export const MockEditAccountPage = (): ReactElement => {
  const route = '/account/aanpassen?prop=telefoonnummer';

  const EXAMPLE_QUERY = gql`
    mutation SubmitTask($id: UUID!, $submission: JSON!) {
      submitTask(id: $id, submission: $submission) {
        id
        objectId
        formId
        title
        status
        date
      }
    }
  `;

  const mocks = [
    {
      request: {
        query: EXAMPLE_QUERY,
        variables: {
          name: 'Test',
        },
      },
      result: {
        data: {
          task: {id: '1', name: 'Informatie aanvraag', zaakId: '23jfdi45-2345-2345-jf45k323oi12'},
        },
      },
    },
  ];

  return (
    <LocalizationProvider>
      <UserInformationProvider>
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[route]}>
            <EditAccountPage />
          </MemoryRouter>
        </MockedProvider>
      </UserInformationProvider>
    </LocalizationProvider>
  );
};
