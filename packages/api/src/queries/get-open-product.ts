import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT = gql`
  query GetOpenProduct($id: UUID!) {
    getOpenProduct(id: $id) {
      uuid
      url
      naam
      startDatum
      gepubliceerd
      aanmaakDatum
      producttype {
        code
        uniformeProductNaam
        toegestaneStatussen
      }
      prijs
      gepubliceerd
      status
      documenten {
        url
      }
      frequentie
      verbruiksobject
      dataobject
      zaken {
        uuid
        omschrijving
        identificatie
        zaaktype {
          identificatie
        }
        startdatum
        status {
          statustype {
            isEindstatus
          }
        }
      }
      taken {
        titel
      }
      acties {
        uuid
        naam
        url
      }
    }
  }
`;
