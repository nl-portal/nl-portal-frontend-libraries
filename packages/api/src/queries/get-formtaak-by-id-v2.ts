import { gql } from "@apollo/client";

export const QUERY_GET_FORMTAAK_BY_ID_V2 = gql`
  query GetFormTaakByIdV2($id: UUID!) {
    getTaakByIdV2(id: $id) {
      id
      formtaak {
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
