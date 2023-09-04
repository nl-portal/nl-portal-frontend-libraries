import {gql} from '@apollo/client';

export const QUERY_GET_TASK_BY_ID = gql`
  query GetTaskById($id: UUID!) {
    getTaakById(id: $id) {
      id
      formId
      status
      date
      data
    }
  }
`;
