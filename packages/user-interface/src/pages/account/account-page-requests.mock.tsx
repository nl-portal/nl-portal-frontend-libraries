import {
  QUERY_GET_BURGER_PROFIEL,
  QUERY_GET_PERSOON_DATA,
  QUERY_GET_BEWONER_AANTAL,
} from "@nl-portal/nl-portal-api";

const getPersoon = {
  request: {
    query: QUERY_GET_PERSOON_DATA,
    variables: {},
  },
  result: {
    data: {
      getPersoon: {
        burgerservicenummer: "999991954",
        geslachtsaanduiding: "vrouw",
        naam: {
          aanhef: null,
          voorletters: "S.",
          voornamen: "Sierra",
          voorvoegsel: null,
          geslachtsnaam: "Kooyman",
          __typename: "PersoonNaam",
        },
        verblijfplaats: {
          straat: "Leyweg",
          huisnummer: "61",
          huisletter: "e",
          huisnummertoevoeging: null,
          postcode: "2545CC",
          woonplaats: "'s-Gravenhage",
          __typename: "PersoonVerblijfplaats",
        },
        geboorte: {
          datum: {
            datum: "2003-03-03",
            jaar: 2003,
            maand: 3,
            dag: 3,
            __typename: "PersoonGeboorteDatum",
          },
          land: {
            code: "6030",
            omschrijving: "Nederland",
            __typename: "PersoonGeboorteLand",
          },
          __typename: "PersoonGeboorte",
        },
        nationaliteiten: [
          {
            nationaliteit: {
              code: "0001",
              omschrijving: "Nederlandse",
              __typename: "PersoonNationaliteit",
            },
            __typename: "PersoonNationaliteiten",
          },
          {
            nationaliteit: {
              code: "0002",
              omschrijving: "Portugees",
              __typename: "PersoonNationaliteit",
            },
            __typename: "PersoonNationaliteiten",
          },
        ],
        __typename: "Persoon",
      },
    },
  },
};

const getBurgerProfiel = {
  request: {
    query: QUERY_GET_BURGER_PROFIEL,
    variables: {},
  },
  result: {
    data: {
      getBurgerProfiel: {
        emailadres: "testmijn+1299@denhaag.nl",
        telefoonnummer: "0629751475",
        __typename: "Klant",
      },
    },
  },
};

const getBewonersAantal = {
  request: {
    query: QUERY_GET_BEWONER_AANTAL,
    variables: {},
  },
  result: {
    data: {
      getBewonersAantal: null,
    },
  },
};

export const mocksRequestBurgerGegevens = [
  getPersoon,
  getBurgerProfiel,
  getBewonersAantal,
];
