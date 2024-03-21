import { FetchResult, GraphQLRequest } from "@apollo/client";
import { QUERY_GET_TAKEN } from "@nl-portal/nl-portal-api";

export const getTaken: {
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
            verloopdatum: null,
            __typename: "Taak",
          },
        ],
        __typename: "TaakPage",
      },
    },
  },
};

export const mockRequest = [getTaken];
