import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCTEN = gql`
  query GetProducten($productName: String!, $pageNumber: Int, $pageSize: Int) {
    getProducten(
      productName: $productName
      pageNumber: $pageNumber
      pageSize: $pageSize
    ) {
      content {
        id
        productType {
          id
          naam
          zaaktypen
        }
        naam
        status
        geldigVan
        geldigTot
      }
      totalElements
      totalPages
    }
  }
`;
