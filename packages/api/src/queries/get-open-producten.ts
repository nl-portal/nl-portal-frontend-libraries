import { gql } from "@apollo/client";

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
        uuid
        url
        naam
        startDatum
        gepubliceerd
        aanmaakDatum
        producttype {
          code
          uniformeProductNaam
          toegestaneStatussen
        }
        prijs
        gepubliceerd
        status
        documenten {
          url
        }
        frequentie
        verbruiksobject
        dataobject
      }
    }
  }
`;
