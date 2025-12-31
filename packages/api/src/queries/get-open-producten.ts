import { gql } from "@apollo/client";
import { OPEN_PRODUCT_FIELDS } from "../fragments/open-product";

export const QUERY_GET_OPEN_PRODUCTEN = gql`
  query GetOpenProducten(
    $pageNumber: Int
    $pageSize: Int
    $status: String
    $productTypeCode: String
    $productTypeId: String
    $productTypeCodes: [String!]
    $productTypeIds: [String!]
  ) {
    getOpenProducten(
      pageNumber: $pageNumber
      pageSize: $pageSize
      status: $status
      productTypeCode: $productTypeCode
      productTypeId: $productTypeId
      productTypeCodes: $productTypeCodes
      productTypeIds: $productTypeIds
    ) {
      number
      size
      totalElements
      numberOfElements
      totalPages
      content {
        ...openProductFields
      }
    }
  }
  ${OPEN_PRODUCT_FIELDS}
`;
