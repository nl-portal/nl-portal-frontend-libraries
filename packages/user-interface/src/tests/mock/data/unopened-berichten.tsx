import { QUERY_GET_UNOPENED_BERICHTEN_COUNT } from "@nl-portal/nl-portal-api";

export const getUnopenedBerichten = {
  request: {
    query: QUERY_GET_UNOPENED_BERICHTEN_COUNT,
    variables: {},
  },
  result: { data: { getUnopenedBerichtenCount: 1 } },
};
