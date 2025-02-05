import { QUERY_GET_TAKEN_V2 } from "@nl-portal/nl-portal-api";

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

interface Props {
  pageSize?: number;
}

export const getTaken = ({ pageSize }: Props) => {
  let variables = {};
  const contentSliced = getContent(pageSize);

  if (pageSize) variables = { ...variables, pageSize };

  return {
    request: {
      query: QUERY_GET_TAKEN_V2,
      variables,
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

export const getTakenById = {
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
