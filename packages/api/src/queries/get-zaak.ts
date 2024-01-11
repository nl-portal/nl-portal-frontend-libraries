import {gql} from '@apollo/client';

export const QUERY_GET_ZAKEN = gql`
  query GetZaak($id: UUID!) {
    getZaak(id: $id) {
      uuid
      url
      omschrijving
      identificatie
      zaaktype {
        identificatie
        omschrijving
      }
      startdatum
      status {
        datumStatusGezet
        statustype {
          omschrijving
          isEindstatus
        }
      }
      statusGeschiedenis {
        datumStatusGezet
        statustype {
          omschrijving
          isEindstatus
        }
      }
      statussen {
        omschrijving
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
      zaakdetails {
        data
        zaak
      }
    }
  }
`;
