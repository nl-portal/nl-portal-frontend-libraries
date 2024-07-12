import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCT_TAKEN = gql`
  query GetProductTaken($productName: String!, $pageSize: Int) {
    getProductTaken(productName: $productName, pageSize: $pageSize) {
      id
      soort
      koppeling {
        registratie
        uuid
      }
      url {
        uri
      }
      formtaak {
        formulier {
          soort
          value
        }
      }
      titel
      status
      verloopdatum
      version
    }
  }
`;
