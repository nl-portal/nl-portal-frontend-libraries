import { gql } from "@apollo/client";

export const FORMULIER_FIELDS = gql`
  fragment FormulierFields on TaakFormulier {
    formuliertype
    value
  }
`;
