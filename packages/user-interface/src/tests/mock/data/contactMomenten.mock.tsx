import { QUERY_GET_OBJECT_CONTACT_MOMENTEN } from "@nl-portal/nl-portal-api";

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
