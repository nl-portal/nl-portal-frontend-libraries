import {
  QUERY_GET_BURGER_PROFIEL,
  QUERY_GET_PERSOON_DATA,
  QUERY_GET_BEWONER_AANTAL,
  QUERY_GET_TAKEN,
  QUERY_GET_OBJECT_CONTACT_MOMENTEN,
  QUERY_GET_ZAAK,
  QUERY_GET_ZAKEN,
} from "@nl-portal/nl-portal-api";
import { FetchResult, GraphQLRequest } from "@apollo/client";

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

export const getBurgerProfiel = {
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

export const getBewonersAantal = {
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

export const getZaak: {
  request: GraphQLRequest;
  result: FetchResult;
} = {
  request: {
    query: QUERY_GET_ZAAK,
    variables: {
      id: "82cb13cf-d2f9-4e3e-ac07-751373035ecb",
    },
  },
  result: {
    data: {
      getZaak: {
        uuid: "82cb13cf-d2f9-4e3e-ac07-751373035ecb",
        url: "https://openzaakurl/zaken/api/v1/zaken/82cb13cf-d2f9-4e3e-ac07-751373035ecb",
        omschrijving: "",
        identificatie: "ZAAK-2023-0000007947",
        zaaktype: {
          identificatie: "B0756",
          omschrijving: "Bezwaarschrift",
          __typename: "ZaakType",
        },
        startdatum: "2023-10-26",
        status: {
          datumStatusGezet: "2023-10-26T05:59:04.182077Z",
          statustype: {
            omschrijving: "In behandeling genomen",
            isEindstatus: false,
            __typename: "ZaakStatusType",
          },
          __typename: "ZaakStatus",
        },
        statusGeschiedenis: [
          {
            datumStatusGezet: "2023-10-26T05:59:04.182077Z",
            statustype: {
              omschrijving: "In behandeling genomen",
              isEindstatus: false,
              __typename: "ZaakStatusType",
            },
            __typename: "ZaakStatus",
          },
          {
            datumStatusGezet: "2023-10-26T05:57:46.333350Z",
            statustype: {
              omschrijving: "Geregistreerd",
              isEindstatus: false,
              __typename: "ZaakStatusType",
            },
            __typename: "ZaakStatus",
          },
        ],
        statussen: [
          {
            omschrijving: "Geregistreerd",
            __typename: "StatusType",
          },
          {
            omschrijving: "Geaccepteerd",
            __typename: "StatusType",
          },
          {
            omschrijving: "In behandeling genomen",
            __typename: "StatusType",
          },
          {
            omschrijving: "Afgehandeld",
            __typename: "StatusType",
          },
        ],
        documenten: [
          {
            documentapi: "openzaak",
            bestandsnaam: "Certificaat WWJB.pdf",
            bestandsomvang: 60198,
            creatiedatum: "2023-10-26",
            formaat: "",
            identificatie: "DOCUMENT-2023-0000007124",
            titel: "Gegenereerd document",
            uuid: "e7b6851c-4208-4ac0-8623-a087186850e5",
            __typename: "Document",
          },
          {
            documentapi: "openzaak",
            bestandsnaam: "open-forms-Bezwaar maken overige zaken - DigiD.pdf",
            bestandsomvang: 31148,
            creatiedatum: "2023-10-26",
            formaat: "application/pdf",
            identificatie: "DOCUMENT-2023-0000007123",
            titel: "Bezwaar maken overige zaken - DigiD",
            uuid: "613c6e1c-67fb-498d-97a4-966bd3d38cda",
            __typename: "Document",
          },
        ],
        zaakdetails: {
          data: [
            {
              waarde: [
                {
                  key: "Locatie",
                  waarde: "Spui 70",
                  omschrijving: "Locatie waar...",
                },
                {
                  key: "Bedrag",
                  waarde: "€250",
                },
                {
                  type: "table",
                  waarde: {
                    rows: [
                      [
                        {
                          key: "periode",
                          type: "date",
                          waarde: "2023-6-1",
                        },
                        {
                          key: "bedrag",
                          waarde: "€250",
                        },
                        {
                          key: "status",
                          waarde: "Openstaand",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          type: "date",
                          waarde: "2023-5-1",
                        },
                        {
                          key: "bedrag",
                          waarde: "€250",
                        },
                        {
                          key: "status",
                          waarde: "Openstaand",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          type: "date",
                          waarde: "2023-4-1",
                        },
                        {
                          key: "bedrag",
                          waarde: "€250",
                        },
                        {
                          key: "status",
                          waarde: "Openstaand",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          type: "date",
                          waarde: "2023-3-1",
                        },
                        {
                          key: "bedrag",
                          waarde: "€250",
                        },
                        {
                          key: "status",
                          waarde: "Betaald",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          waarde: "",
                          omschrijving:
                            "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          type: "bold",
                          waarde: "Totaal",
                        },
                        {
                          key: "bedrag",
                          waarde: "€1000",
                        },
                        {
                          key: "status",
                          waarde: ["list", "voorbeeld"],
                        },
                      ],
                    ],
                    headers: [
                      {
                        key: "periode",
                        waarde: "Periode",
                        omschrijving: "Periode waarover betaald is",
                      },
                      {
                        key: "bedrag",
                        waarde: "Bedrag",
                      },
                      {
                        key: "status",
                        waarde: "Status",
                        omschrijving: "Is het betaald?",
                      },
                    ],
                  },
                  heading: "Betaalgeschiedenis",
                },
              ],
              heading: "Kosten",
            },
            {
              waarde: [
                {
                  key: "Locatie",
                  waarde: "Spui 70",
                  omschrijving: "Locatie waar...",
                },
                {
                  key: "Bedrag",
                  waarde: "€250",
                },
              ],
              heading: "Kosten nested",
            },
          ],
          zaak: "https://openzaakurl/zaken/api/v1/zaken/82cb13cf-d2f9-4e3e-ac07-751373035ecb",
          __typename: "ZaakDetails",
        },
        __typename: "Zaak",
      },
    },
  },
};

export const getObjectContactMomenten = {
  request: {
    query: QUERY_GET_OBJECT_CONTACT_MOMENTEN,
    variables: {
      objectUrl:
        "https://openzaakurl/zaken/api/v1/zaken/82cb13cf-d2f9-4e3e-ac07-751373035ecb",
    },
  },
  result: {
    data: {
      getObjectContactMomenten: {
        content: [
          {
            tekst: "Gewoon een normaal bericht",
            kanaal: "email",
            registratiedatum: "2023-10-26T06:02:19Z",
            __typename: "ContactMoment",
          },
          {
            tekst: "Beste inwoner, Uw zaak is in behandeling genomen",
            kanaal: "emailjgkhseafdgxytuerl6tnkgfy8dddfdfdfassafgiuahmh",
            registratiedatum: "2023-10-05T12:54:24Z",
            __typename: "ContactMoment",
          },
          {
            tekst: "Beste inwoner; Er staat een taak voor U klaar",
            kanaal: "sms",
            registratiedatum: "2023-10-05T12:53:08Z",
            __typename: "ContactMoment",
          },
          {
            tekst: "Dit is een sms",
            kanaal: "sms",
            registratiedatum: "2023-10-05T12:48:18Z",
            __typename: "ContactMoment",
          },
          {
            tekst: "Hallo dit is een test",
            kanaal: "email",
            registratiedatum: "2023-10-05T12:27:32Z",
            __typename: "ContactMoment",
          },
          {
            tekst: "Dit is een test",
            kanaal: "MAIL",
            registratiedatum: "2023-10-05T08:56:17.320554Z",
            __typename: "ContactMoment",
          },
          {
            tekst: "Test tekst",
            kanaal: "MAIL",
            registratiedatum: "2023-04-03T09:34:28Z",
            __typename: "ContactMoment",
          },
        ],
        __typename: "ContactMomentPage",
      },
    },
  },
};

export const getTakenWithId = {
  request: {
    query: QUERY_GET_TAKEN,
    variables: {
      zaakId: "82cb13cf-d2f9-4e3e-ac07-751373035ecb",
    },
  },
  result: {
    data: {
      getTaken: {
        content: [
          {
            id: "1a20092f-8d24-11ee-a314-d2c27970fbf4",
            objectId: "497e0c6b-ca5a-4603-882b-332e0b183322",
            formulier: {
              formuliertype: "objecturl",
              value:
                "https://objectenurl/api/v2/objects/99697f7e-4c2b-4dd5-9bdd-bc9e7336ac02",
              __typename: "TaakFormulier",
            },
            title: "Aanleveren informatie",
            status: "OPEN",
            date: "2023-11-27",
            data: {
              informatieverzoeken: [
                {
                  deadline: "2023-12-04T22:59:59.999Z",
                  toelichting: "",
                  hersteltermijn: true,
                  dagtekeningBrief: "2023-11-27T12:48:30.000Z",
                  stopHersteltermijn: "2023-11-27T12:51:27.626210570Z",
                  startHersteltermijn: "2023-11-27T12:48:43.589109572Z",
                  datumInformatieverzoek: "2023-11-27T12:48:30.000Z",
                  opleidingVolgendePersonen: "",
                  opTeVragenBenodigdeInformatie: {
                    partnerID: true,
                    jaarrekening: false,
                    balansrekening: false,
                    specificatiePensioen: false,
                    bewijsVanInschrijving: true,
                    laatsteInkomstenSpecificatie: false,
                    bankafschriftenAfgelopenMaand: false,
                    belastingaanslagAfgelopenJaar: false,
                    belastingaangifteAfgelopenJaar: false,
                    laatsteInkomstenSpecificatiePartner: false,
                    specifiekeBankafschriftenPerPeriode: true,
                    specifiekeBankafschriftenAfgelopenMaand: false,
                  },
                  bankrekeningNummersSpecifiekePeriode: "",
                },
                {
                  deadline: "2023-12-04T22:59:59.999Z",
                  toelichting: "",
                  hersteltermijn: true,
                  dagtekeningBrief: "2023-11-27T12:53:00.000Z",
                  startHersteltermijn: "2023-11-27T12:54:25.021822783Z",
                  datumInformatieverzoek: "2023-11-27T12:53:00.000Z",
                  opleidingVolgendePersonen: "",
                  opTeVragenBenodigdeInformatie: {
                    partnerID: true,
                    jaarrekening: true,
                    balansrekening: true,
                    specificatiePensioen: false,
                    bewijsVanInschrijving: true,
                    laatsteInkomstenSpecificatie: false,
                    bankafschriftenAfgelopenMaand: false,
                    belastingaanslagAfgelopenJaar: false,
                    belastingaangifteAfgelopenJaar: true,
                    laatsteInkomstenSpecificatiePartner: false,
                    specifiekeBankafschriftenPerPeriode: false,
                    specifiekeBankafschriftenAfgelopenMaand: false,
                  },
                },
              ],
            },
            verloopdatum: "2023-12-04T12:54:29.211",
            __typename: "Taak",
          },
        ],
        __typename: "TaakPage",
      },
    },
  },
};

export const getZaken: {
  request: GraphQLRequest;
  result: FetchResult;
} = {
  request: {
    query: QUERY_GET_ZAKEN,
    variables: {},
  },
  result: {
    data: {
      getZaken: {
        content: [
          {
            uuid: "0c6c5300-fd08-4fae-977d-c85a2c7535e8",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000001324",
            zaaktype: {
              identificatie: "GESLOTENZAAK1",
              __typename: "ZaakType",
            },
            startdatum: "2024-02-01",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "6f268986-17c2-4045-9340-94101bfad3ca",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000001317",
            zaaktype: {
              identificatie: "OPENZAAK1",
              __typename: "ZaakType",
            },
            startdatum: "2024-01-01",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "009e2451-44b3-4969-91e3-205d8b261fe1",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000001263",
            zaaktype: {
              identificatie: "OPENZAAK2",
              __typename: "ZaakType",
            },
            startdatum: "2024-01-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "e7c34f50-1d2e-4269-8eef-18da509358f4",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000001261",
            zaaktype: {
              identificatie: "GESLOTENZAAK2",
              __typename: "ZaakType",
            },
            startdatum: "2024-02-02",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
        ],
        totalElements: 4,
        totalPages: 1,
      },
    },
  },
};

export const getZakenPagination: {
  request: GraphQLRequest;
  result: FetchResult;
} = {
  request: {
    query: QUERY_GET_ZAKEN,
    variables: {},
  },
  result: {
    data: {
      getZaken: {
        content: [
          {
            uuid: "0c6c5300-fd08-4fae-977d-c85a2c7535e8",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000001324",
            zaaktype: {
              identificatie: "GESLOTENZAAK1",
              __typename: "ZaakType",
            },
            startdatum: "2024-02-01",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "6f268986-17c2-4045-9340-94101bfad3ca",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000001317",
            zaaktype: {
              identificatie: "OPENZAAK1",
              __typename: "ZaakType",
            },
            startdatum: "2024-01-01",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "009e2451-44b3-4969-91e3-205d8b261fe1",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000001263",
            zaaktype: {
              identificatie: "OPENZAAK2",
              __typename: "ZaakType",
            },
            startdatum: "2024-01-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "e7c34f50-1d2e-4269-8eef-18da509358f4",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000001261",
            zaaktype: {
              identificatie: "GESLOTENZAAK2",
              __typename: "ZaakType",
            },
            startdatum: "2024-02-02",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "5ea91f84-49c3-4343-9278-c63db0944d39",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004448",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-03",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "fdaf4a9a-3ba0-4e5b-9f4c-60a65a7e4b2a",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004427",
            zaaktype: {
              identificatie: "B0756",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-03",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "69449e87-a2a9-4fda-b04b-fb52d8e20c2a",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004424",
            zaaktype: {
              identificatie: "B0756",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-03",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "e31b05ea-4747-4257-a68d-bc29048c4d2f",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004417",
            zaaktype: {
              identificatie: "B0756",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "bbf7d96e-eea9-4379-aff6-09a5576913c1",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004414",
            zaaktype: {
              identificatie: "B0756",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "e5ece739-f221-4a0c-b45a-0d3624a3256b",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004410",
            zaaktype: {
              identificatie: "B0756",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "edfb7b88-b202-40aa-9a3a-c6dd93939df5",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004406",
            zaaktype: {
              identificatie: "B0756",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: true,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "b5ffd864-7e62-4b09-95de-5e47093f4273",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004404",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "c921d614-339b-4a3e-afc2-24d1e247bb3e",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004402",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "9d0b51c8-b0ec-4e94-b142-9549dedadf06",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004398",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "7c1d2226-b4ab-49c9-8405-3261c2edb7df",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004397",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "8c6bbd96-23d1-4695-9479-f1d7e13e633e",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004396",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "0b03b796-c996-4291-be75-a2f3ef36f12c",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004387",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "a606b02e-0d6b-4244-85f5-1a8513232818",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004386",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "03e4a609-d619-4172-b272-fce9da3a270a",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004385",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
          {
            uuid: "04b244a9-c46b-4648-9e5e-a30e2569aa81",
            omschrijving: "",
            identificatie: "ZAAK-2024-0000004384",
            zaaktype: {
              identificatie:
                "aanvraag-financiele-ondersteuning-ondernemers-beha",
              __typename: "ZaakType",
            },
            startdatum: "2024-04-02",
            status: {
              statustype: {
                isEindstatus: false,
                __typename: "ZaakStatusType",
              },
              __typename: "ZaakStatus",
            },
            __typename: "Zaak",
          },
        ],
        totalElements: 20,
        totalPages: 2,
      },
    },
  },
};

const getContent = (size: number) => {
  const arrayTasks = [
    {
      id: "cb8e86ab-c58d-11ee-9320-3a659ac0caef",
      objectId: "d2a2c7d3-af2a-4b0e-8171-24156f84da95",
      formulier: {
        formuliertype: "objecturl",
        value:
          "https://objectenurl/api/v2/objects/168c8f1f-bf9c-426b-bfcd-b1ad3a202c95",
        __typename: "TaakFormulier",
      },
      title: "OPEN TAAK 1",
      status: "OPEN",
      date: "2024-02-07",
      verloopdatum: "2024-02-17T07:52:09.254",
      __typename: "Taak",
    },
    {
      id: "8340598f-c0da-11ee-8f7b-8acfe66e2bec",
      objectId: "4bc0df48-8a53-48b5-a2b5-34c83e293e53",
      formulier: {
        formuliertype: "objecturl",
        value:
          "https://objectenurl/api/v2/objects/99697f7e-4c2b-4dd5-9bdd-bc9e7336ac02",
        __typename: "TaakFormulier",
      },
      title: "OPEN TAAK 2",
      status: "OPEN",
      date: "2024-02-01",
      verloopdatum: null,
      __typename: "Taak",
    },
    {
      id: "4d6be490-8364-4ee9-b2a9-78fead5f8760",
      objectId: "481605b4-23f5-49f9-ad7c-bd103b1bceb7",
      formulier: {
        formuliertype: "objecturl",
        value:
          "https://objectenurl/api/v2/objects/99697f7e-4c2b-4dd5-9bdd-bc9e7336ac02",
        __typename: "TaakFormulier",
      },
      title: "OPEN TAAK 3",
      status: "OPEN",
      date: "2024-01-31",
      verloopdatum: null,
      __typename: "Taak",
    },
    {
      id: "021118b9-bc59-11ee-b651-366634c97df6",
      objectId: "a5c14b96-83da-4618-9c5b-441ca9d6c52f",
      formulier: {
        formuliertype: "portalid",
        value: "43381039-c511-4591-bb0c-e2006d65ca9b",
        __typename: "TaakFormulier",
      },
      title: "OPEN TAAK 4",
      status: "OPEN",
      date: "2024-01-26",
      verloopdatum: null,
      __typename: "Taak",
    },
    {
      id: "021118b9-bc59-11ee-b651-366634c97df7",
      objectId: "a5c14b96-83da-4618-9c5b-441ca9d6c52f",
      formulier: {
        formuliertype: "portalid",
        value: "43381039-c511-4591-bb0c-e2006d65ca9b",
        __typename: "TaakFormulier",
      },
      title: "OPEN TAAK 5",
      status: "OPEN",
      date: "2024-01-26",
      verloopdatum: null,
      __typename: "Taak",
    },
    {
      id: "021118b9-bc59-11ee-b651-366634c97df8",
      objectId: "a5c14b96-83da-4618-9c5b-441ca9d6c52f",
      formulier: {
        formuliertype: "portalid",
        value: "43381039-c511-4591-bb0c-e2006d65ca9b",
        __typename: "TaakFormulier",
      },
      title: "OPEN TAAK 6",
      status: "OPEN",
      date: "2024-01-26",
      verloopdatum: null,
      __typename: "Taak",
    },
  ];
  return arrayTasks.slice(0, size);
};

export const getTaken = (
  pageSizeRequest: number,
): {
  request: GraphQLRequest;
  result: FetchResult;
} => {
  const contentSliced = getContent(pageSizeRequest);

  return {
    request: {
      query: QUERY_GET_TAKEN,
      variables: { pageSize: pageSizeRequest },
    },
    result: {
      data: {
        getTaken: {
          content: contentSliced,
          totalElements: 6,
          totalPages: 1,
          __typename: "TaakPage",
        },
      },
    },
  };
};
