import { gql } from "@apollo/client";

export const QUERY_GET_BERICHTEN = gql`
  query GetBerichten($pageNumber: Int, $pageSize: Int, $onderwerp: String) {
    getBerichten(
      pageNumber: $pageNumber
      pageSize: $pageSize
      onderwerp: $onderwerp
    ) {
      content {
        id
        einddatumHandelingstermijn
        publicatiedatum
        geopend
        onderwerp
      }
      totalElements
      totalPages
    }
  }
`;
