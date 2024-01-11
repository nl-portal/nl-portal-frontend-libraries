import {gql} from '@apollo/client';

export const QUERY_GET_FORMS = gql`
  query GetForms {
    getFormList {
      name
      uuid
    }
  }
`;
