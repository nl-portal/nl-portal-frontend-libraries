import { gql } from "@apollo/client";

export const QUERY_GET_GEMACHTIGDE_V2 = gql`
  query GetGemachtigdeV2 {
    getGemachtigdeV2 {
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
