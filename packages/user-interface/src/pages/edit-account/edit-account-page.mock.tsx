import React, {ReactElement} from 'react';
import {gql} from '@apollo/client';
import {EditAccountPage} from './edit-account-page';
import {TestProvider} from '../../providers/TestProvider';

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
    <TestProvider mocks={mocks} route={route}>
      <EditAccountPage />
    </TestProvider>
  );
};
