import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_THEMA_TAKEN = gql`
  query getOpenProductThemaTaken(
    $id: UUID!
    $language: String!
    $pageSize: Int
  ) {
    getOpenProductThemaTaken(
      id: $id
      language: $language
      pageSize: $pageSize
    ) {
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
