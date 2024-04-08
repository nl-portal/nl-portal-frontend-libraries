import { gql } from "@apollo/client";

export const QUERY_GET_ERFPACHT_CONTRACTEN = gql`
  query GetErfpachtContracten($pageNumber: Int, $pageSize: Int) {
    getErfpachtContracten(pageNumber: $pageNumber, pageSize: $pageSize) {
      content {
        id
        adressen {
          straatnaam
          huisnummer
          woonplaats
          nummeraanduidingId
        }
      }
      totalElements
      totalPages
    }
  }
`;
