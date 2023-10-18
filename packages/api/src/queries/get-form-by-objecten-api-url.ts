import {gql} from '@apollo/client';

export const QUERY_GET_FORM_BY_OBJECTEN_API_URL = gql`
  query GetFormDefinitionByObjectenApiUrl($url: String!) {
    getFormDefinitionByObjectenApiUrl(url: $url) {
      formDefinition
    }
  }
`;
