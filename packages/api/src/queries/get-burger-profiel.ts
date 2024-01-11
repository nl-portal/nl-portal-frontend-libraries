import {gql} from '@apollo/client';

export const QUERY_GET_BURGER_PROFIEL = gql`
  query GetBurgerProfiel {
    getBurgerProfiel {
      emailadres
      telefoonnummer
    }
  }
`;
