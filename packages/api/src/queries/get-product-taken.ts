import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCT_TAKEN = gql`
  query GetProductTaken($productName: String!, $pageSize: Int) {
    getProductTaken(productName: $productName, pageSize: $pageSize) {
      id
      soort
      koppeling {
        registratie
        value
      }
      url {
        uri
      }
      portaalformulier {
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
