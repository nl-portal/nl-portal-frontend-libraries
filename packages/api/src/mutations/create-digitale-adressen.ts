import { gql } from "@apollo/client";

export const MUTATION_CREATE_DIGITALE_ADRESSEN = gql`
  mutation CreateUserDigitaleAdres(
    $digitaleAdresRequest: DigitaleAdresRequestInput!
  ) {
    createUserDigitaleAdres(digitaleAdresRequest: $digitaleAdresRequest) {
      uuid
      waarde
      type
      omschrijving
      referentie
    }
  }
`;
