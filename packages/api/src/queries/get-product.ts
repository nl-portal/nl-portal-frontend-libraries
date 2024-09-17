import { gql } from "@apollo/client";

export const QUERY_GET_PRODUCTEN = gql`
  query GetProduct($id: UUID!) {
    getProduct(id: $id) {
      id
      verbruiksobjecten {
        id
        soort
        data
      }
      productDetails {
        id
        data
      }
      naam
      status
      geldigVan
      geldigTot
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
          uuid
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
        titel
        status
        verloopdatum
        version
      }
    }
  }
`;
