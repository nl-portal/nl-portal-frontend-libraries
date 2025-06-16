import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_HOOFD_THEMAS = gql`
  query getOpenProductHoofdThemas {
    getOpenProductHoofdThemas {
      uuid
      naam
      producttypen {
        uuid
      }
    }
  }
`;
