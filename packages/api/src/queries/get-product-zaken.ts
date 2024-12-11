import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCT_ZAKEN = gql`
  query GetProductZaken(
    $productName: String!
    $pageSize: Int
    $isOpen: Boolean
  ) {
    getProductZaken(
      productName: $productName
      pageSize: $pageSize
      isOpen: $isOpen
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
