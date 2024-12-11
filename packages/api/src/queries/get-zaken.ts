import { gql } from "@apollo/client";

export const QUERY_GET_ZAKEN = gql`
  query GetZaken(
    $page: Int
    $zaakTypeUrl: String
    $isOpen: Boolean
    $identificatie: String
  ) {
    getZaken(
      page: $page
      zaakTypeUrl: $zaakTypeUrl
      isOpen: $isOpen
      identificatie: $identificatie
    ) {
      content {
        uuid
        omschrijving
        identificatie
        zaaktype {
          identificatie
        }
        startdatum
        status {
          statustype {
            isEindstatus
          }
        }
      }
      totalElements
      totalPages
    }
  }
`;
