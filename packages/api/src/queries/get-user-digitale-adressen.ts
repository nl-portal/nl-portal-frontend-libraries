import { gql } from "@apollo/client";

export const QUERY_GET_USER_DIGITALE_ADRESSEN = gql`
  query GetUserDigitaleAdressen {
    getUserDigitaleAdressen {
      uuid
      waarde
      type
      omschrijving
      referentie
      verificatieDatum
      verificatieNeeded
    }
  }
`;
