import { gql } from "@apollo/client";

export const QUERY_GET_DIGITALE_ADRESSEN = gql`
  query GetUserDigitaleAdressen {
    getUserDigitaleAdresen {
      uuid
      waarde
      type
      omschrijving
    }
  }
`;
