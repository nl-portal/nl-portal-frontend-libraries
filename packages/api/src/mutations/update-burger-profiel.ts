import {gql} from '@apollo/client';

export const MUTATION_UPDATE_BURGER_PROFIEL = gql`
  mutation UpdateBurgerProfiel($klant: KlantUpdateInput!) {
    updateBurgerProfiel(klant: $klant) {
      emailadres
      telefoonnummer
    }
  }
`;
