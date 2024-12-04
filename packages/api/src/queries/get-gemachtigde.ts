import { gql } from "@apollo/client";

export const QUERY_GET_GEMACHTIGDE = gql`
  query GetGemachtigde {
    getGemachtigde {
      persoon {
        naam {
          voornamen
          voorvoegsel
          lastName
          officialLastName
        }
      }
      bedrijf {
        naam
      }
    }
  }
`;
