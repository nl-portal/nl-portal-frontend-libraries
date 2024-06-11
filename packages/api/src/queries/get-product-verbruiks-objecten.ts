import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCT_ZAKEN = gql`
  query GetProductVerbruiksObjecten($productId: UUID!) {
    getProductVerbruiksObjecten(productId: $productId) {
      id
      soort
      productInstantie
      data
    }
  }
`;
