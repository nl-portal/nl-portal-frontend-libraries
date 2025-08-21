import { QUERY_GET_USER_DIGITALE_ADRESSEN } from "@nl-portal/nl-portal-api";

export const getUserDigitaleAdressen = {
  request: {
    query: QUERY_GET_USER_DIGITALE_ADRESSEN,
    variables: {},
  },
  result: {
    data: {
      getUserDigitaleAdressen: [
        {
          uuid: "a5f323d8-8c87-43c2-990b-eae03d721adf",
          waarde: "test2@test.nl",
          type: "EMAIL",
          omschrijving: "email",
          referentie: "",
          __typename: "DigitaleAdresResponse",
        },
      ],
    },
  },
};
