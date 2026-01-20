import { gql } from "@apollo/client";

export const MUTATION_VERIFY_VERIFICATIE = gql`
  mutation VerifyVerificatie($verificatieVerifyInput: VerificatieVerifyInput!) {
    verifyVerificatie(verificatieVerifyInput: $verificatieVerifyInput) {
      verified
      errorMessage
    }
  }
`;
