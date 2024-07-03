import { gql } from "@apollo/client";
import { FORMULIER_FIELDS } from "../fragments/formulier";

export const QUERY_GET_TAAK_BY_ID = gql`
  ${FORMULIER_FIELDS}
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
