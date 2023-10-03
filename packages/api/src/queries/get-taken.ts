import {gql} from '@apollo/client';

export const QUERY_GET_TAKEN = gql`
  query GetTaken($zaakId: UUID) {
    getTaken(zaakUUID: $zaakId) {
      content {
        id
        objectId
        formulier {
          type
          value
        }
        formId
        title
        status
        date
        data
        verloopdatum
      }
    }
  }
`;
