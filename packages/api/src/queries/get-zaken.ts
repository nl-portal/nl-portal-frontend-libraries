import { gql } from "@apollo/client";

export const QUERY_GET_ZAKEN = gql`
  query GetZaken(
    $page: Int
    $pageSize: Int
    $zaakTypeUrl: String
    $isOpen: Boolean
    $identificatie: String
    $identificatieContains: String
  ) {
    getZaken(
      page: $page
      pageSize: $pageSize
      zaakTypeUrl: $zaakTypeUrl
      isOpen: $isOpen
      identificatie: $identificatie
      identificatieContains: $identificatieContains
    ) {
      content {
        uuid
        omschrijving
        identificatie
        zaaktype {
          identificatie
          omschrijvingGeneriek
        }
        startdatum
        status {
          statustype {
            isEindstatus
            omschrijvingGeneriek
          }
        }
      }
      totalElements
      totalPages
    }
  }
`;
