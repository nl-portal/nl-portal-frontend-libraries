import { gql } from "@apollo/client";

export const QUERY_GET_START_FORMS = gql`
  query GetStartForms {
    allStartForms {
      name
      id
    }
  }
`;
