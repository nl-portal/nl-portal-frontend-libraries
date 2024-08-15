import { gql } from "@apollo/client";

export const QUERY_GET_BERICHTEN = gql`
  query GetBerichten($pageNumber: Int, $pageSize: Int) {
    getBerichten(pageNumber: $pageNumber, pageSize: $pageSize) {
      content {
        id
        einddatumHandelingstermijn
        geopend
        onderwerp
      }
      totalElements
      totalPages
    }
  }
`;
