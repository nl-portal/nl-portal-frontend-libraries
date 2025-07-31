import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_THEMA_TAKEN = gql`
  query getOpenProductThemaTaken($id: UUID!) {
    getOpenProductThemaTaken(id: $id) {
      id
      soort
      koppeling {
        registratie
        value
      }
      url {
        uri
      }
      portaalformulier {
        formulier {
          soort
          value
        }
      }
      titel
      status
      verloopdatum
      version
    }
  }
`;
