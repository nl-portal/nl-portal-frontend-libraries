import { gql } from "@apollo/client";

export const QUERY_FIND_PARTIJ = gql`
  query FindUserPartij {
    findUserPartij {
      betrokkenen {
        uuid
        url
      }
      bezoekadres {
        adresregel1
        adresregel2
        adresregel3
        land
        nummeraanduidingId
      }
      categorieRelaties {
        beginDatum
        categorieNaam
        eindDatum
        url
        uuid
      }
      correspondentieadres {
        adresregel1
        adresregel2
        adresregel3
        land
        nummeraanduidingId
      }
      digitaleAdressen {
        uuid
        url
      }
      indicatieActief
      indicatieGeheimhouding
      interneNotitie
      nummer
      partijIdentificatoren {
        uuid
        url
      }
      rekeningnummers {
        uuid
        url
      }
      soortPartij
      url
      uuid
      vertegenwoordigden {
        uuid
        url
      }
      voorkeursDigitaalAdres {
        uuid
        url
      }
      voorkeursRekeningnummer {
        uuid
        url
      }
      voorkeurstaal
      partijIdentificatie {
        ... on PersoonsIdentificatie {
          contactnaam {
            voorletters
            voornaam
            voorvoegselAchternaam
            achternaam
          }
          volledigeNaam
        }
        ... on ContactpersoonIdentificatie {
          uuid
          werkteVoorPartij {
            uuid
            url
          }
          contactnaam {
            voorletters
            voornaam
            voorvoegselAchternaam
            achternaam
          }
          volledigeNaam
        }
        ... on OrganisatieIdentificatie {
          naam
        }
      }
    }
  }
`;
