import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCT_ZAKEN = gql`
  query GetProductZaken($productName: String!, $pageSize: Int) {
    getProductZaken(productName: $productName, pageSize: $pageSize) {
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
