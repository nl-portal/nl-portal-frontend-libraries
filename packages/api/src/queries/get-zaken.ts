import { gql } from "@apollo/client";

export const QUERY_GET_ZAKEN = gql`
  query GetZaken($page: Int) {
    getZaken(page: $page) {
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
