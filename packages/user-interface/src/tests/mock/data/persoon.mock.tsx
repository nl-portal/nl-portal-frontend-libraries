import { QUERY_GET_PERSOON_V2 } from "@nl-portal/nl-portal-api";

export const getPersoon = {
  request: {
    query: QUERY_GET_PERSOON_V2,
    variables: {},
  },
  result: {
    data: {
      getPersoonV2: {
        burgerservicenummer: "999991954",
        geslacht: {
          code: "6030",
          omschrijving: "vrouw",
        },
        naam: {
          voornamen: "Sierra",
          officialLastName: "de Kooyman - van der Maassen",
          __typename: "PersoonNaam",
        },
        verblijfplaats: {
          type: "Adres",
          functieAdres: {
            code: "W",
            omschrijving: "woonadres",
          },
          verblijfadres: {
            officieleStraatnaam: "Leyweg 61e",
            postcode: "2545CC",
            woonplaats: "'s-Gravenhage",
          },
          datumVan: {
            type: "Datum",
            datum: "2018-07-01",
            langFormaat: "1 juli 2018",
          },
          adresseerbaarObjectIdentificatie: 226010000038820,
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
