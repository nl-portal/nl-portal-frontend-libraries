import { gql } from "@apollo/client";

export const MUTATION_UPDATE_DIGITALE_ADRESSEN = gql`
  mutation UpdateUserDigitaleAdres(
    $digitaleAdresId: UUID!
    $digitaleAdresRequestInput: DigitaleAdresRequestInput!
  ) {
    updateUserDigitaleAdres(
      digitaleAdresId: $digitaleAdresId
      digitaleAdresRequest: $digitaleAdresRequestInput
    ) {
      uuid
      waarde
      type
      omschrijving
    }
  }
`;
