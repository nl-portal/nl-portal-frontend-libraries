import { gql } from "@apollo/client";

export const QUERY_GET_OBJECT_CONTACT_MOMENTEN = gql`
  query GetObjectContactMomenten($objectUrl: String!) {
    getObjectContactMomenten(objectUrl: $objectUrl) {
      content {
        tekst
        kanaal
        registratiedatum
      }
    }
  }
`;
