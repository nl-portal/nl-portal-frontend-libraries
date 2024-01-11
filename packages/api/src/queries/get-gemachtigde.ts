import {gql} from '@apollo/client';

export const QUERY_GET_GEMACHTIGDE = gql`
  query GetGemachtigde {
    getGemachtigde {
      persoon {
        aanhef
        voorletters
        voornamen
        voorvoegsel
        geslachtsnaam
      }
      bedrijf {
        naam
      }
    }
  }
`;
