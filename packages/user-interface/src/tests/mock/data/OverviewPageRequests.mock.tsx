import { FetchResult, GraphQLRequest } from "@apollo/client";
import { QUERY_GET_TAKEN, QUERY_GET_ZAKEN } from "@nl-portal/nl-portal-api";

const getZaken: {
  request: GraphQLRequest;
  result: FetchResult<Record<string, any>>;
} = {
  request: {
    query: QUERY_GET_ZAKEN,
    variables: {},
  },
  result: {
    data: {
      getZaken: [
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
    },
  },
};

const getTaken: {
  request: GraphQLRequest;
  result: FetchResult<Record<string, any>>;
} = {
  request: {
    query: QUERY_GET_TAKEN,
    variables: {},
  },
  result: {
    data: {
      getTaken: {
        content: [
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
            verloopdatum: "2024-01-31T14:41:36.800006896",
            __typename: "Taak",
          },
        ],
        __typename: "TaakPage",
      },
    },
  },
};

export const mockRequest = [getZaken, getTaken];
