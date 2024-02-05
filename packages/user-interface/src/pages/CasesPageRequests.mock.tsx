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
              },
              {
                  "uuid": "0955eea8-dc06-4c56-b6d1-18daddabda14",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001254",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-31",
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
                  "uuid": "d515d364-2957-427a-b565-c854cae470f2",
                  "omschrijving": "",
                  "identificatie": "testCase1706694025726",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-31",
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
                  "uuid": "20c204e2-bad8-4601-8e6e-d2bfb19787a7",
                  "omschrijving": "",
                  "identificatie": "testCase1706693967395",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-31",
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
                  "uuid": "400d07f1-6373-4800-9e14-ad0185d2d198",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001240",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-31",
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
                  "uuid": "ce9602eb-4e74-43a6-a03b-509098f96a8d",
                  "omschrijving": "",
                  "identificatie": "testCase1706692398930",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-31",
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
                  "uuid": "3ee2b33c-df21-4016-a829-47fa29e71fbe",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001237",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-31",
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
                  "uuid": "c6b29505-f90e-4208-9d35-591adc814bce",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001233",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-31",
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
                  "uuid": "abe301d5-cec8-4e0b-a6b8-d6249fff7d72",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001224",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "085729f0-324e-4f7e-9007-5a9b0d313c24",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001222",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "322ca09e-c394-4c49-816e-0197b6961283",
                  "omschrijving": "",
                  "identificatie": "testCase1706628830740",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "f18f2d2a-8497-4ce6-a530-45c96c9f7ede",
                  "omschrijving": "",
                  "identificatie": "testCase1706628707780",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "5fb4d325-0622-4181-b9dc-a6d9c494b499",
                  "omschrijving": "",
                  "identificatie": "testCase1706628644623",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "d0f0f6e7-6a7b-4111-8c15-4880e034c8ec",
                  "omschrijving": "",
                  "identificatie": "testCase1706628023915",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "249ae54d-3ba9-40df-b877-4af6755a0634",
                  "omschrijving": "",
                  "identificatie": "testCase1706620798117",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "ce90f504-dd9b-40ad-aabc-37b8fe8fb4a8",
                  "omschrijving": "",
                  "identificatie": "testCase1706620796946",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "6af04706-2330-4650-bf9e-8be8f75233e1",
                  "omschrijving": "",
                  "identificatie": "testCase1706620795312",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "9dc6fc45-49ab-4efb-ad06-96c072868852",
                  "omschrijving": "",
                  "identificatie": "testCase1706620793066",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "ea9bed3f-78e2-4a0d-9c49-9dc5d2e69ff9",
                  "omschrijving": "",
                  "identificatie": "testCase1706620522932",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "35f43322-e2dc-46aa-b63b-1f4696691e80",
                  "omschrijving": "",
                  "identificatie": "testCase1706620521729",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "606b6961-c412-410b-b9c6-701638525666",
                  "omschrijving": "",
                  "identificatie": "testCase1706620519979",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "3ac49de7-d2fb-46a9-ae43-a7278740be6d",
                  "omschrijving": "",
                  "identificatie": "testCase1706620515718",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "1baf37ae-5533-4057-adbd-972ec444d182",
                  "omschrijving": "",
                  "identificatie": "testCase1706611951569",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "0a790090-38a0-41e0-80d6-34e949fe3716",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001193",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-30",
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
                  "uuid": "bcc98c86-ca62-492c-a6d1-a7c0d1d9dae4",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001192",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-29",
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
                  "uuid": "dd9f3e2e-70d6-4c84-926b-a168b88485cd",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001133",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-29",
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
                  "uuid": "75ec76a3-d537-4491-8537-e3189adeb7fa",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001132",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-26",
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
                  "uuid": "22fb7a2b-e375-4ebd-bca3-d8920419efd0",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001130",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-26",
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
                  "uuid": "ac981f12-e490-45f8-a05a-1572240c85b1",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001129",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-26",
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
                  "uuid": "3ae5d303-ca30-4af3-aba2-cf0d4cca9b09",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001125",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-26",
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
                  "uuid": "c141800b-df57-446c-b204-6dc85f050ed7",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001114",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-26",
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
                  "uuid": "c7b860ba-1488-4731-aed5-62cb26545eae",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000001103",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-25",
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
                  "uuid": "9861021f-feb3-439c-82d5-d9384cc54027",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000948",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "3602e861-01f4-4580-943e-4763409431cd",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000947",
                  "zaaktype": {
                      "identificatie": "aanvraag-mantelzorg-vrijwilligerswaardering",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "7dc858f4-26a1-4b9b-928c-1bc3dc0feaea",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000946",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "29e9a7e3-5519-476d-ac16-c2da5293295b",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000945",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "c475eb2f-9422-4728-a143-dc60dc8fd610",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000944",
                  "zaaktype": {
                      "identificatie": "aanvraag-mantelzorg-vrijwilligerswaardering",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "521e9420-c3f7-4d81-8dd5-557605ed2d29",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000943",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "3f44eccb-7148-4bea-bb76-77feda6149c4",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000942",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "36810b81-54fa-40e4-b14a-f943fbe86654",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000941",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "b9347eda-3b37-45fd-b1d2-eee0030c893f",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000940",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-24",
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
                  "uuid": "f39f2332-24b3-4fd7-950f-1cba56e20c35",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000928",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-23",
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
                  "uuid": "43d9395f-f585-4166-b959-c464d5fd21e7",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000865",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-22",
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
                  "uuid": "7d91ce71-67f8-407b-9c3d-d469e76d4847",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000711",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-18",
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
                  "uuid": "6c6d100a-2923-4104-a7f9-b0b8ed0f9d76",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000694",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-18",
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
                  "uuid": "4a40f443-bb82-416e-94bc-ef17fbef10f3",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000683",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-18",
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
                  "uuid": "0523ab75-aae6-4dc6-9944-ca666f3fd003",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000663",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-18",
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
                  "uuid": "11c3299f-b1a3-434b-b8a9-025eb59b4379",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000662",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-18",
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
                  "uuid": "c9fbbe50-9e86-44d6-95b5-c50cc3483c6c",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000661",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-18",
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
                  "uuid": "68cfda5a-6fa3-483c-8222-6a2f8b3b82c7",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000639",
                  "zaaktype": {
                      "identificatie": "aanvraag-mantelzorg-vrijwilligerswaardering",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "1f962cbc-9de9-432d-83d0-906dfb8fc1be",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000638",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "30524739-8f7b-4143-8c85-01866848ab23",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000637",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "f106f544-f219-4b16-90ea-91ace672703e",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000636",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "09205022-9d8e-465f-a057-819787dac191",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000634",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "dfddbfa8-99dd-453c-bf29-a136d93b0c89",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000625",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
                  "status": null,
                  "__typename": "Zaak"
              },
              {
                  "uuid": "313eeb52-6c4a-4c34-9362-1c01cc10f381",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000624",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "43cefd0d-a38c-4efa-ac62-c93fe5cf4502",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000623",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "5893108f-2a0f-4053-b5b9-2c1b147759f3",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000622",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "5f633c1f-8f2c-4e84-91e5-53236fd32b87",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000619",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "c7212922-593c-4c20-a3b3-31868f12488b",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000617",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "047410ea-6b00-4f48-9b6d-be280599fbd6",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000616",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "b0da6727-9cba-47d4-aaef-664c0dba2460",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000614",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "90d1de1e-74ea-4aa1-8fd6-0a35a83a8ca5",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000613",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-17",
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
                  "uuid": "be34ab9f-44b6-41cc-b12d-8844503a86ee",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000610",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "2b68c397-4cf5-4cb5-b328-348099d41723",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000608",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "c6943e15-44af-44a5-9f64-775650f6a1f7",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000607",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "ae23a52a-e182-4370-9222-b57d459b0c7a",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000606",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "4896b080-287a-41af-904e-ff5ad9a59a30",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000605",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "64fb5541-7787-49e2-95dd-984161d76d0b",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000604",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "4ac417e4-99f9-4251-bae5-f3aa549d2fba",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000603",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "37900532-5c76-489e-8761-b3e8546ed810",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000602",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "8eaccaa3-a8a0-41b7-9f52-afc41258d210",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000601",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "1b5aa4cd-ab54-43ad-b59d-3894ac4ed4df",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000600",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "3b57d3c5-476e-4e3d-aee0-fd297a4b247e",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000598",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "da0045f5-59af-4f23-b556-44be471b0f76",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000595",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "a2bd6a68-8ee7-48fb-9259-04fdaf245754",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000589",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "4f1d4672-8904-4532-85ed-f61a718878d9",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000585",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "1ee67f1e-4e98-45da-a0b3-79c39dc3d51b",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000577",
                  "zaaktype": {
                      "identificatie": "B0756",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-16",
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
                  "uuid": "9dfa1d64-dc61-4160-bb2b-912e3b67ed40",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000564",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-15",
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
                  "uuid": "f45e9f55-a87b-44c8-b3cb-15ec6e9b26cd",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000528",
                  "zaaktype": {
                      "identificatie": "aanvraag-mantelzorg-vrijwilligerswaardering",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-12",
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
                  "uuid": "8c5b9f18-0b02-470b-b876-1af71d73b134",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000527",
                  "zaaktype": {
                      "identificatie": "aanvraag-mantelzorg-vrijwilligerswaardering",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-12",
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
                  "uuid": "37c4b942-8e54-45c9-ad0d-857e0b58b317",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000526",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-12",
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
                  "uuid": "6c750e8f-756e-4c68-8a02-b1ea0c5d6cf4",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000525",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-12",
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
                  "uuid": "198035a3-009b-4116-9fd9-658476cbe274",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000494",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-12",
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
                  "uuid": "466dddd3-d556-4ebb-82ff-3ee6722b27a8",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000486",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "5922bdeb-68fe-4e74-8e6c-4a246d63ea27",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000485",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "8ce74a82-8a27-4757-ab3f-e4b8044eaced",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000484",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "e653696a-e636-41ed-9e93-21a963d91f99",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000483",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "2df7b0c8-ac99-40c3-b1f0-db143c441142",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000482",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "9c4b85f8-0b0c-4e18-b93b-1e618587d352",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000481",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "3fb1957e-79d7-4b70-ab0e-8f90af173ecb",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000480",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "95bcb789-aebd-4f2d-8d11-580a66a1a95d",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000479",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "8e97c29a-5568-4123-abc3-ed6cdf2512e7",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000478",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "b249deb6-8a29-42b0-b65b-25c6b43cd460",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000477",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "635dc806-9c5e-4261-ba46-67bddc444d49",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000476",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "aeb7f81b-0e06-41c9-8541-8d774de49cce",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000475",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
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
                  "uuid": "8b8f5e54-2ea9-4070-b9b6-12a118b95fea",
                  "omschrijving": "",
                  "identificatie": "ZAAK-2024-0000000474",
                  "zaaktype": {
                      "identificatie": "Aanvraag-stadspas-behandelen-v6",
                      "__typename": "ZaakType"
                  },
                  "startdatum": "2024-01-11",
                  "status": {
                      "statustype": {
                          "isEindstatus": false,
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
