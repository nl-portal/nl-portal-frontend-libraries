import { gql } from "@apollo/client";

export const MUTATION_SUBMIT_TAAK = gql`
  mutation SubmitTaakV2($id: UUID!, $submission: JSON!) {
    submitTaakV2(id: $id, submission: $submission) {
      id
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
    }
  }
`;
