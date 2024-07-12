import { gql } from "@apollo/client";

export const MUTATION_UPDATE_PRODUCT_VERBRUIKS_OBJECTEN = gql`
  mutation UpdateProductVerbruiksObject($id: UUID!, $submission: JSON!) {
    updateProductVerbruiksObject(id: $id, submission: $submission) {
      id
      data
      productInstantie
      soort
    }
  }
`;
