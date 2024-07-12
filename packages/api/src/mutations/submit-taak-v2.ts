import { gql } from "@apollo/client";

export const MUTATION_SUBMIT_TAAK = gql`
  mutation SubmitTaakV2(
    $id: UUID!
    $submission: JSON!
    $version: TaakVersion!
  ) {
    submitTaakV2(id: $id, submission: $submission, version: $version) {
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
