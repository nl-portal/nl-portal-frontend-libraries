import { gql } from "@apollo/client";

export const QUERY_GET_ERFPACHT_CONTRACTEN = gql`
  query GetErfpachtContracten($pageNumber: Int) {
    getErfpachtContracten(pageNumber: $pageNumber) {
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
