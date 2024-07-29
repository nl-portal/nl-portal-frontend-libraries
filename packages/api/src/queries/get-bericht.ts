import { gql } from "@apollo/client";

export const QUERY_GET_BERICHT = gql`
  query GetBericht($id: UUID!) {
    getBericht(id: $id) {
      id
      berichtTekst
      berichtType
      bijlages
      einddatumHandelingstermijn
      geopend
      handelingsperspectief
      identificatie {
        type
        value
      }
      onderwerp
      publicatiedatum
      referentie
    }
  }
`;
