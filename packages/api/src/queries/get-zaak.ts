import { gql } from "@apollo/client";

export const QUERY_GET_ZAAK = gql`
  query GetZaak($id: UUID!) {
    getZaak(id: $id) {
      uuid
      url
      omschrijving
      identificatie
      zaaktype {
        identificatie
        omschrijvingGeneriek
      }
      startdatum
      status {
        datumStatusGezet
        statustype {
          omschrijvingGeneriek
          isEindstatus
        }
        substatussen {
          uuid
          omschrijving
          tijdstip
        }
      }
      statusGeschiedenis {
        datumStatusGezet
        statustype {
          omschrijvingGeneriek
          isEindstatus
        }
        substatussen {
          uuid
          omschrijving
          tijdstip
        }
      }
      statussen {
        omschrijvingGeneriek
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
      resultaat {
        toelichting
        resultaattype {
          omschrijvingGeneriek
        }
      }
    }
  }
`;
