import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_BY_THEMA = gql`
  query getOpenProductenByThema($themaId: UUID!) {
    getOpenProductenByThema(themaId: $themaId) {
      uuid
      naam
      startDatum
      eindDatum
      taken {
        id
        titel
        verloopdatum
        koppeling {
          registratie
          value
        }
      }
      zaken {
        uuid
        omschrijving
        identificatie
        status {
          statustype {
            isEindstatus
          }
        }
        zaaktype {
          identificatie
        }
      }
    }
  }
`;
