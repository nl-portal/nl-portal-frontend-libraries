import { QUERY_GET_BURGER_PROFIEL } from "@nl-portal/nl-portal-api";

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
