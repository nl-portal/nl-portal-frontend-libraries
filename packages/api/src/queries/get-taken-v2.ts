import { gql } from "@apollo/client";
import { FORMULIER_FIELDS } from "../fragments/formulier";

export const QUERY_GET_TAKEN = gql`
  query GetTakenV2($zaakId: UUID, $pageNumber: Int, $pageSize: Int) {
    getTakenV2(
      zaakUUID: $zaakId
      pageNumber: $pageNumber
      pageSize: $pageSize
    ) {
      content {
        id
        soort
        koppeling {
          registratie
          uuid
        }
        url {
          uri
        }
        formtaak {
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
      totalElements
      totalPages
    }
  }
  ${FORMULIER_FIELDS}
`;
