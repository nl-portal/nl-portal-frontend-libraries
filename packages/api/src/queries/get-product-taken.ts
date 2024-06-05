import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCT_TAKEN = gql`
  query GetProductTaken($productName: String!, $pageSize: Int) {
    getProductTaken(productName: $productName, pageSize: $pageSize) {
      id
      objectId
      formulier {
        ...FormulierFields
      }
      title
      status
      date
      verloopdatum
    }
  }
`;
