import { QUERY_GET_ZAAK } from "@nl-portal/nl-portal-api";

export const getZaak = {
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
