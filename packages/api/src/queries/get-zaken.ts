import { gql } from "@apollo/client";

export const QUERY_GET_ZAKEN = gql`
  query GetZaken($pageNumber: Int, $pageSize: Int) {
    getZaken(pageNumber: $pageNumber, pageSize: $pageSize) {
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
  }
`;
