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
        objectId
        formulier {
          ...FormulierFields
        }
        title
        status
        date
        verloopdatum
      }
    }
  }
`;
