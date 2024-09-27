import { gql } from "@apollo/client";
import { FORMULIER_FIELDS } from "../fragments/formulier";

export const QUERY_GET_TAAK_BY_ID = gql`
  ${FORMULIER_FIELDS}
  query GetTaakById($id: UUID!) {
    getTaakById(id: $id) {
      id
      formulier {
        ...FormulierFields
      }
      status
      date
      data
      zaak
    }
  }
`;
