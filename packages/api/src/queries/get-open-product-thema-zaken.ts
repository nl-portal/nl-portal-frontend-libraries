import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_THEMA_ZAKEN = gql`
  query getOpenProductThemaZaken($id: UUID!) {
    getOpenProductThemaZaken(id: $id) {
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
