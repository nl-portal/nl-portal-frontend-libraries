import { gql } from "@apollo/client";

export const QUERY_INTROSPECT_OPENKLANT_ENABLED = gql`
  query PartijEnabled {
    __type(name: "PartijResponse") {
      name
    }
  }
`;
