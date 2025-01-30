import { gql } from "@apollo/client";

export const QUERY_GET_ZAKEN = gql`
  query GetZaken(
    $page: Int
    $pageSize: Int
    $zaakTypeUrl: String
    $isOpen: Boolean
    $identificatie: String
  ) {
    getZaken(
      page: $page
      pageSize: $pageSize
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
