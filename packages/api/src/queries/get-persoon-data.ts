import { gql } from "@apollo/client";

export const QUERY_GET_PERSOON_DATA = gql`
  query GetPersoonData {
    getPersoon {
      burgerservicenummer
      geslachtsaanduiding
      bewonersAantal
      naam {
        voornamen
        officialLastName
      }
      verblijfplaats {
        straat
        huisnummer
        huisletter
        huisnummertoevoeging
        postcode
        woonplaats
      }
      geboorte {
        datum {
          datum
          jaar
          maand
          dag
        }
        land {
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
