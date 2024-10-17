import { gql } from "@apollo/client";

export const QUERY_GET_UNOPENED_BERICHTEN_COUNT = gql`
  query GetUnopenedBerichtenCount {
    getUnopenedBerichtenCount
  }
`;
