import { InMemoryCacheConfig } from "@apollo/client";

export const defaultInMemoryCacheOptions: InMemoryCacheConfig = {
  typePolicies: {
    Zaak: {
      keyFields: ["uuid"],
    },
  },
};
