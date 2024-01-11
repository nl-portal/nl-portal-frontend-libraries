import {gql} from '@apollo/client';

export const QUERY_GET_FORM_BY_ID = gql`
  query GetFormDefinitionById($id: String!) {
    getFormDefinitionById(id: $id) {
      formDefinition
    }
  }
`;
