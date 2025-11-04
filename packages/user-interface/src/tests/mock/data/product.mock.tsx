import { QUERY_GET_OPEN_PRODUCT_HOOFD_THEMAS_BY_PRODUCTEN } from "@nl-portal/nl-portal-api";

export const getProduct = {
  request: {
    query: QUERY_GET_OPEN_PRODUCT_HOOFD_THEMAS_BY_PRODUCTEN,
    variables: {},
  },
  result: {
    data: {
      getOpenProductHoofdThemas: [
        {
          uuid: "41f71c2e-9e0c-4a1b-8d39-709669b256c2",
          naam: "Belastingzaken",
          __typename: "OpenProductThema",
        },
        {
          uuid: "b95cfbf6-8578-410b-b108-a42fd20af843",
          naam: "Parkeren",
          __typename: "OpenProductThema",
        },
        {
          uuid: "1a25f58c-8e7b-425f-b466-7e6f8ca1268b",
          naam: "Hoofdthema",
          __typename: "OpenProductThema",
        },
      ],
    },
  },
};
