import {gql} from '@apollo/client';

export const QUERY_GET_TAAK_BY_ID = gql`
  query GetTaakById($id: UUID!) {
    getTaakById(id: $id) {
      id
      formulier {
        type
        value
      }
      formId
      status
      date
      data
    }
  }
`;
