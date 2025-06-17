import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_BY_THEMA = gql`
  query getOpenProductenByThema($themaId: UUID!) {
    getOpenProductenByThema(themaId: $themaId) {
      uuid
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
        titel
        status
        verloopdatum
        version
      }
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
    }
  }
`;
