import {gql} from '@apollo/client';

export const QUERY_GET_TAKEN = gql`
  query GetTaken {
    getTaken {
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
      }
    }
  }
`;
