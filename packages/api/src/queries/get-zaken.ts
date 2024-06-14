import { gql } from "@apollo/client";

export const QUERY_GET_ZAKEN = gql`
  query GetZaken($page: Int, $isOpen: Boolean) {
    getZaken(page: $page, isOpen: $isOpen) {
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
