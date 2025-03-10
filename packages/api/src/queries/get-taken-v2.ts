import { gql } from "@apollo/client";

export const QUERY_GET_TAKEN_V2 = gql`
  query GetTakenV2(
    $zaakId: UUID
    $title: String
    $pageNumber: Int
    $pageSize: Int
  ) {
    getTakenV2(
      zaakUUID: $zaakId
      title: $title
      pageNumber: $pageNumber
      pageSize: $pageSize
    ) {
      content {
        id
        soort
        koppeling {
          registratie
          value
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
