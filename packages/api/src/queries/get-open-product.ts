import { gql } from "@apollo/client";
import { OPEN_PRODUCT_FIELDS } from "../fragments/open-product";

export const QUERY_GET_OPEN_PRODUCT = gql`
  query GetOpenProduct($id: UUID!) {
    getOpenProduct(id: $id) {
      ...openProductFields
      zaken {
        uuid
        omschrijving
        identificatie
        zaaktype {
          identificatie
          omschrijving
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
  ${OPEN_PRODUCT_FIELDS}
`;
