import { gql } from "@apollo/client";

export const MUTATION_DELETE_DIGITALE_ADRESSEN = gql`
  mutation DeleteUserDigitaleAdres($digitaleAdresId: UUID!) {
    deleteUserDigitaleAdres(digitaleAdresId: $digitaleAdresId)
  }
`;
