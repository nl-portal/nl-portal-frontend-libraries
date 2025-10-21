import { gql } from "@apollo/client";

export const FORMULIER_FIELDS = gql`
  fragment FormulierFields on TaakFormulierV2 {
    value
  }
`;
