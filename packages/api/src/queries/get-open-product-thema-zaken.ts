import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_THEMA_ZAKEN = gql`
  query getOpenProductThemaZaken($id: UUID!, $pageSize: Int) {
    getOpenProductThemaZaken(id: $id, pageSize: $pageSize) {
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
