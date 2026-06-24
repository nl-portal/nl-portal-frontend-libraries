import { gql } from "@apollo/client";

export const QUERY_GET_PORTAALFORMULIER_BY_ID_V2 = gql`
  query GetPortaalFormulierByIdV2($id: UUID!) {
    getTaakByIdV2(id: $id) {
      id
      portaalformulier {
        data
      }
      titel
      status
      verloopdatum
    }
  }
`;
