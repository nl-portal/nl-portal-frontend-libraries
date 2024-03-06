import { gql } from "@apollo/client";
import { FORMULIER_FIELDS } from "../fragments/formulier";

export const QUERY_GET_TAKEN = gql`
  query GetTaken($zaakId: UUID, $pageNumber: Int, $pageSize: Int) {
    getTaken(zaakUUID: $zaakId, pageNumber: $pageNumber, pageSize: $pageSize) {
      results {
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
      totalElements
      totalPages
    }
  }
  ${FORMULIER_FIELDS}
`;
