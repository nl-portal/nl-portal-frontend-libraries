import { gql } from "@apollo/client";

export const QUERY_GET_GEMACHTIGDE = gql`
  query GetGemachtigde {
    getGemachtigde {
      persoon {
        naam {
          voornamen
          officialLastName
        }
      }
      bedrijf {
        naam
      }
    }
  }
`;
