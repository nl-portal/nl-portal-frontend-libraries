import { gql } from "@apollo/client";

export const QUERY_GET_PERSOON_V2 = gql`
  query GetPersoonV2 {
    getPersoonV2 {
      burgerservicenummer
      geslacht {
        omschrijving
      }
      bewonersAantal
      naam {
        voornamen
        officialLastName
      }
      verblijfplaats {
        verblijfadres {
          officieleStraatnaam
          huisnummer
          huisletter
          huisnummertoevoeging
          postcode
          woonplaats
        }
        datumVan {
          datum
          langFormaat
          type
        }
      }
      geboorte {
        datum {
          datum
          langFormaat
          type
        }
        land {
          code
          omschrijving
        }
        plaats {
          code
          omschrijving
        }
      }
      nationaliteiten {
        nationaliteit {
          code
          omschrijving
        }
      }
    }
  }
`;
