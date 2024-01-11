import {gql} from '@apollo/client';

export const QUERY_GET_BEDRIJF = gql`
  query GetBedrijf {
    getBedrijf {
      naam
    }
  }
`;
