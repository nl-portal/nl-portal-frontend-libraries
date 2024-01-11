import {gql} from '@apollo/client';

export const QUERY_GET_PERSOON = gql`
  query GetPersoon {
    getPersoon {
      naam {
        voornamen
        voorvoegsel
        geslachtsnaam
      }
    }
  }
`;
