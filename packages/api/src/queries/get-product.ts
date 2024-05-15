import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCTEN = gql`
  query GetProduct($id: UUID!) {
    getProduct(id: $id) {
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
      taken {
        id
      }
    }
  }
`;
