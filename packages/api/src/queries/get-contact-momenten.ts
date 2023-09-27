import {gql} from '@apollo/client';

export const QUERY_GET_KLANT_CONTACT_MOMENTEN = gql`
  query GetKlantContactMomenten {
    getKlantContactMomenten {
      content {
        tekst
        kanaal
      }
    }
  }
`;
