import {gql} from '@apollo/client';

export const QUERY_GET_DOCUMENTEN = gql`
  query GetDocumenten($id: UUID!) {
    getZaak(id: $id) {
      zaaktype {
        identificatie
      }
      documenten {
        documentapi
        bestandsnaam
        bestandsomvang
        creatiedatum
        formaat
        identificatie
        titel
        uuid
      }
    }
  }
`;
