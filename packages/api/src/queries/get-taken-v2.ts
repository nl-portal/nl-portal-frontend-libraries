import { gql } from "@apollo/client";

export const QUERY_GET_TAKEN_V2 = gql`
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
        portaalformulier {
          formulier {
            soort
            value
          }
        }
        ogonebetaling {
          bedrag
          betaalkenmerk
          pspid
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
`;
