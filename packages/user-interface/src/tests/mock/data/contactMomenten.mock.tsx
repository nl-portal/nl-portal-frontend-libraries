import { QUERY_GET_USER_KLANT_CONTACTEN } from "@nl-portal/nl-portal-api";

export const getObjectContactMomenten = {
  request: {
    query: QUERY_GET_USER_KLANT_CONTACTEN,
    variables: {
      identificatorType: "ZAAK",
      identificatorId: "82cb13cf-d2f9-4e3e-ac07-751373035ecb",
    },
  },
  result: {
    data: {
      getUserKlantContacten: [
        {
          uuid: "f6b89308-7c91-4ca3-a280-4dc08a69de7c",
          inhoud:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut aliquam velit.",
          kanaal: "Telefoon",
          onderwerp: "Klacht",
          plaatsgevondenOp: "2025-01-06T11:02:24Z",
          __typename: "OpenKlant2Klantcontact",
        },
        {
          uuid: "482a8529-0ebd-4424-83a9-b9f88335673d",
          inhoud:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut aliquam velit.",
          kanaal: "E-mail",
          onderwerp: "Vraag over vergunningsaanvraag",
          plaatsgevondenOp: "2025-03-06T11:02:24Z",
          __typename: "OpenKlant2Klantcontact",
        },
        {
          uuid: "482a8529-0ebd-4424-83a9-b9f88335673d",
          inhoud:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.",
          kanaal: "SMS",
          onderwerp: "Dit is een sms",
          plaatsgevondenOp: "2025-03-12T10:00:12Z",
          __typename: "OpenKlant2Klantcontact",
        },
      ],
    },
  },
};
