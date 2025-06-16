import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_THEMA_ZAKEN = gql`
  query getOpenProductThemaZaken(
    $id: UUID!
    $language: String!
    $pageSize: Int
  ) {
    getOpenProductThemaZaken(
      id: $id
      language: $language
      pageSize: $pageSize
    ) {
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
