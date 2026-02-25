import { gql } from "@apollo/client";

export const MUTATION_UPDATE_DIGITALE_ADRESSEN = gql`
  mutation UpdateUserDigitaleAdres(
    $digitaleAdresRequest: DigitaleAdresRequestInput!
  ) {
    updateUserDigitaleAdres(digitaleAdresRequest: $digitaleAdresRequest) {
      uuid
      waarde
      type
      omschrijving
      referentie
      verificatieDatum
      verificatieNeeded
      verificatieCodeVerified
    }
  }
`;
