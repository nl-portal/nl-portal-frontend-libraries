import { QUERY_GET_PERSOON_DATA } from "@nl-portal/nl-portal-api";

export const getPersoon = {
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
          voornamen: "Sierra",
          officialLastName: "de Kooyman - van der Maassen",
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
            __typename: "PersoonDatum",
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
