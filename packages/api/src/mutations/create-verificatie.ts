import { gql } from "@apollo/client";

export const MUTATION_CREATE_VERIFICATIE = gql`
  mutation CreateVerificatie($verificatieCreateInput: VerificatieCreateInput!) {
    createVerificatie(verificatieCreateInput: $verificatieCreateInput) {
      success
      errorMessage
    }
  }
`;
