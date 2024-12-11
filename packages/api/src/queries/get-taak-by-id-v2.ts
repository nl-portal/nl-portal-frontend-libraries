import { gql } from "@apollo/client";

export const QUERY_GET_TAAK_BY_ID_V2 = gql`
  query GetTaakByIdV2($id: UUID!) {
    getTaakByIdV2(id: $id) {
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
        data
      }
      titel
      status
      verloopdatum
      version
    }
  }
`;
