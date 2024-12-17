import {
  QUERY_GET_BURGER_PROFIEL,
  QUERY_GET_PERSOON_DATA,
  QUERY_GET_OBJECT_CONTACT_MOMENTEN,
  QUERY_GET_ZAAK,
  QUERY_GET_ZAKEN,
  QUERY_GET_TAKEN_V2,
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
              heading: "Kosten",
              type: "keywaardelijst",
              items: [
                {
                  key: "Locatie",
                  content: "Kamillestraat 27",
                  description: "Locatie waar de zaak betrekking op heeft",
                },
                {
                  key: "interne ref",
                  content: "OVX-4295272/A00/201723693",
                  description: "interne verwijzing naar Key2Vergunningen",
                },
              ],
              children: [
                {
                  heading: "Kosten nested",
                  type: "keywaardelijst",
                  description: "Een voorbeeld van nesting",
                  items: [
                    {
                      key: "Locatie",
                      content: "Kamillestraat 27",
                      description: "Locatie waar de zaak betrekking op heeft",
                    },
                    {
                      key: "interne ref",
                      content: "OVX-4295272/A00/201723693",
                      description: "interne verwijzing naar Key2Vergunningen",
                    },
                  ],
                },
                {
                  heading: "Betaalgeschiedenis",
                  type: "table",
                  items: {
                    rows: [
                      [
                        {
                          key: "periode",
                          type: "date",
                          content: "2023-06-01",
                        },
                        {
                          key: "bedrag",
                          content: "€250",
                        },
                        {
                          key: "status",
                          content: "Openstaand",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          type: "date",
                          content: "2023-05-01",
                        },
                        {
                          key: "bedrag",
                          content: "€250",
                        },
                        {
                          key: "status",
                          content: "Openstaand",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          type: "date",
                          content: "2023-04-01",
                        },
                        {
                          key: "bedrag",
                          content: "€250",
                        },
                        {
                          key: "status",
                          content: "Openstaand",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          type: "date",
                          content: "2023-03-01",
                        },
                        {
                          key: "bedrag",
                          content: "€250",
                        },
                        {
                          key: "status",
                          content: "Betaald",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          content: "",
                          description:
                            "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
                        },
                        {
                          key: "periode",
                          content: "",
                          description:
                            "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
                        },
                        {
                          key: "periode",
                          content: "",
                          description:
                            "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
                        },
                      ],
                      [
                        {
                          key: "periode",
                          type: "bold",
                          content: "Totaal",
                        },
                        {
                          key: "bedrag",
                          content: "€1000",
                        },
                        {
                          key: "status",
                          content: "Betaald",
                        },
                      ],
                    ],
                    headers: [
                      {
                        key: "periode",
                        content: "Periode",
                        description: "Periode waarover betaald is",
                      },
                      {
                        key: "bedrag",
                        content: "Bedrag",
                      },
                      {
                        key: "status",
                        content: "Status",
                        description: "Is het betaald?",
                      },
                    ],
                  },
                },
              ],
            },
            {
              heading: "Betaalgeschiedenis 2",
              type: "table",
              items: {
                rows: [
                  [
                    {
                      key: "periode",
                      type: "date",
                      content: "2023-06-01",
                    },
                    {
                      key: "bedrag",
                      content: "€250",
                    },
                    {
                      key: "status",
                      content: "Openstaand",
                    },
                  ],
                  [
                    {
                      key: "periode",
                      type: "date",
                      content: "2023-05-01",
                    },
                    {
                      key: "bedrag",
                      content: "€250",
                    },
                    {
                      key: "status",
                      content: "Openstaand",
                    },
                  ],
                  [
                    {
                      key: "periode",
                      type: "date",
                      content: "2023-04-01",
                    },
                    {
                      key: "bedrag",
                      content: "€250",
                    },
                    {
                      key: "status",
                      content: "Openstaand",
                    },
                  ],
                  [
                    {
                      key: "periode",
                      type: "date",
                      content: "2023-03-01",
                    },
                    {
                      key: "bedrag",
                      content: "€250",
                    },
                    {
                      key: "status",
                      content: "true",
                    },
                  ],
                  [
                    {
                      key: "periode",
                      content: "",
                      description:
                        "Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.",
                    },
                  ],
                  [
                    {
                      key: "periode",
                      type: "bold",
                      content: "Totaal",
                    },
                    {
                      key: "bedrag",
                      content: "€1000",
                    },
                    {
                      key: "status",
                      content: "Betaald",
                    },
                  ],
                ],
                headers: [
                  {
                    key: "periode",
                    content: "Periode",
                    description: "Periode waarover betaald is",
                  },
                  {
                    key: "bedrag",
                    content: "Bedrag",
                  },
                  {
                    key: "status",
                    content: "Status",
                    description: "Is het betaald?",
                  },
                ],
              },
              children: [
                {
                  heading: "Kosten nested 2",
                  type: "keywaardelijst",
                  items: [
                    {
                      key: "Locatie",
                      content: "Kamillestraat 22",
                      description: "Locatie waar de zaak betrekking op heeft",
                    },
                    {
                      key: "interne ref",
                      content: "OVX-4295272/A00/201723693",
                      description: "interne verwijzing naar Key2Vergunningen",
                    },
                  ],
                  children: [
                    {
                      heading: "Kosten nested 3",
                      type: "keywaardelijst",
                      items: [
                        {
                          key: "Locatie",
                          content: "Kamillestraat 27",
                          description:
                            "Locatie waar de zaak betrekking op heeft",
                        },
                        {
                          key: "interne ref",
                          content: "OVX-4295272/A00/201723693",
                          description:
                            "interne verwijzing naar Key2Vergunningen",
                        },
                      ],
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              heading: "Special waardes",
              type: "keywaardelijst",
              items: [
                {
                  key: "Title",
                  content: "This is a bold waarde",
                  type: "bold",
                  description: "A omschrijving for the bold title",
                },
                {
                  key: "Title",
                  content: "This is an italic waarde",
                  type: "italic",
                  description: "A omschrijving for the italic text",
                },
                {
                  key: "Date",
                  content: "2024-09-11",
                  type: "date",
                  description: "The date of the event",
                },
              ],
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
    query: QUERY_GET_TAKEN_V2,
    variables: {
      zaakId: "82cb13cf-d2f9-4e3e-ac07-751373035ecb",
      pageSize: 10,
    },
  },
  result: {
    data: {
      getTakenV2: {
        content: [
          {
            id: "1a20092f-8d24-11ee-a314-d2c27970fbf4",
            soort: "PORTAALFORMULIER",
            koppeling: null,
            url: null,
            portaalformulier: {
              formulier: {
                soort: "url",
                value:
                  "https://objectenurl/api/v2/objects/99697f7e-4c2b-4dd5-9bdd-bc9e7336ac02",
                __typename: "TaakFormulierV2",
              },
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
            },
            titel: "Aanleveren informatie",
            status: "OPEN",
            verloopdatum: null,
            version: "V1",
            __typename: "TaakV2",
          },
        ],
        __typename: "TaakPageV2",
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

export const getOpenZaken: {
  request: GraphQLRequest;
  result: FetchResult;
} = {
  request: {
    query: QUERY_GET_ZAKEN,
    variables: { isOpen: true },
  },
  result: {
    data: {
      getZaken: {
        content: [
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
        ],
        totalElements: 2,
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
    variables: { isOpen: true },
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

const getContent = (size?: number) => {
  const arrayTasks = [
    {
      id: "3f8b4c07-91c5-4f14-9cc4-2d6a6b8a3bda",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "OPEN TAAK 1",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "7e5d3f58-a681-4b5d-8a1f-48d31fbf6f4e",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "OPEN TAAK 2",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "e3b3bcf2-7b2e-46d7-a600-3ec8a4e1a2a1",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "OPEN TAAK 3",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "021118b9-bc59-11ee-b651-366634c97df6",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "OPEN TAAK 4",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "16fd2706-8baf-433b-82eb-8c7fada847da",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "Portal task",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "b3da88b2-7e7f-4578-a7d4-9e5e5c74a2de",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "Portal task",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "6f4922f45568161a8cdf4ad2299f6d23",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "Portal task",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "1e292f8fedd741b75372e19097c76d4a",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "Portal task",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "901d3f32-3559-4dd7-a6a6-3fe00d7f00b6",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "Portal task",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
    {
      id: "88d9c7d0-3f9a-4a0e-9a90-6c8f873e9cdd",
      soort: "PORTAALFORMULIER",
      koppeling: {
        registratie: "ZAAK",
        uuid: "66fecaa3-24b4-4739-a7c8-eb58f39e9aae",
        __typename: "TaakKoppeling",
      },
      url: null,
      portaalformulier: {
        formulier: {
          soort: "url",
          value:
            "http://localhost:8010/api/v2/objects/fbb761a9-ed2e-4bb0-9582-e72218389679",
          __typename: "TaakFormulierV2",
        },
        __typename: "TaakForm",
      },
      titel: "Portal task",
      status: "OPEN",
      verloopdatum: "2024-06-15T21:59:59.999",
      version: "V1",
      __typename: "TaakV2",
    },
  ];

  return arrayTasks.slice(0, size);
};

export const getTaken = (
  pageSizeRequest?: number,
): {
  request: GraphQLRequest;
  result: FetchResult;
} => {
  const contentSliced = getContent(pageSizeRequest);

  return {
    request: {
      query: QUERY_GET_TAKEN_V2,
      variables: pageSizeRequest ? { pageSize: pageSizeRequest } : {},
    },
    result: {
      data: {
        getTakenV2: {
          content: contentSliced,
          totalElements: 6,
          totalPages: 1,
          __typename: "TaakPageV2",
        },
      },
    },
  };
};
