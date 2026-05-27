import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_THEMA_ZAKEN = gql`
  query getOpenProductThemaZaken($id: UUID!, $pageSize: Int, $isOpen: Boolean) {
    getOpenProductThemaZaken(id: $id, pageSize: $pageSize, isOpen: $isOpen) {
      uuid
      omschrijving
      identificatie
      zaaktype {
        identificatie
        omschrijving
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
