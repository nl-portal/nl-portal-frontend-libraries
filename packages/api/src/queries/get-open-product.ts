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
      decisions
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
        id
        soort
        koppeling {
          registratie
          value
        }
        url {
          uri
        }
        portaalformulier {
          formulier {
            soort
            value
          }
        }
        ogonebetaling {
          bedrag
          betaalkenmerk
          pspid
        }
        titel
        status
        verloopdatum
      }
    }
  }
`;
