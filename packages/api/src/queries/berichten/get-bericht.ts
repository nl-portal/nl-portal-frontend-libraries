import { gql } from "@apollo/client";

export const QUERY_GET_BERICHT = gql`
  query GetBericht($id: UUID!) {
    getBericht(id: $id) {
      id
      berichtTekst
      berichtType
      einddatumHandelingstermijn
      geopend
      handelingsperspectief
      identificatie {
        type
        value
      }
      documenten {
        uuid
        documentapi
        identificatie
        creatiedatum
        titel
        formaat
        bestandsnaam
        bestandsomvang
      }
      onderwerp
      publicatiedatum
      referentie
    }
  }
`;
