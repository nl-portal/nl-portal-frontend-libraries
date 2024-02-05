import { FetchResult, GraphQLRequest } from "@apollo/client";
import {
  QUERY_GET_ZAKEN,
} from "@nl-portal/nl-portal-api";

const getZaken: {
  request: GraphQLRequest;
  result: FetchResult<Record<string, any>>;
} = {
  request: {
    query: QUERY_GET_ZAKEN,
    variables: {},
  },
  result: {
      "data": {
          "getZaken": [
              {
                  "uuid": "0c6c5300-fd08-4fae-977d-c85a2c7535e8",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001324",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-02-02",
                  "status": {
                      "statustype": {
                          "isEindstatus": true,
                          "__typename": "ZaakStatusType"
                      },
                      "__typename": "ZaakStatus"
                  },
                  "__typename": "Zaak"
              },
              {
                  "uuid": "6f268986-17c2-4045-9340-94101bfad3ca",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001317",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-02-01",
                  "status": {
                      "statustype": {
                          "isEindstatus": false,
                          "__typename": "ZaakStatusType"
                      },
                      "__typename": "ZaakStatus"
                  },
                  "__typename": "Zaak"
              },
              {
                  "uuid": "009e2451-44b3-4969-91e3-205d8b261fe1",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001263",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-02-01",
                  "status": {
                      "statustype": {
                          "isEindstatus": false,
                          "__typename": "ZaakStatusType"
                      },
                      "__typename": "ZaakStatus"
                  },
                  "__typename": "Zaak"
              },
              {
                  "uuid": "e7c34f50-1d2e-4269-8eef-18da509358f4",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001261",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-02-01",
                  "status": {
                      "statustype": {
                          "isEindstatus": true,
                          "__typename": "ZaakStatusType"
                      },
                      "__typename": "ZaakStatus"
                  },
                  "__typename": "Zaak"
              }
          ]
      }
  },
};

export const mockRequest = [getZaken];
