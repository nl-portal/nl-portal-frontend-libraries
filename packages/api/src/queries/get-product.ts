import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCTEN = gql`
  query GetProduct($id: UUID!) {
    getProduct(id: $id) {
      id
      verbruiksobjecten {
        id
        soort
      }
      productType {
        id
        naam
        zaaktypen
      }
      productDetails {
        id
        data
      }
      naam
      status
      geldigVan
      geldigTot
      taken {
        id
      }
    }
  }
`;
