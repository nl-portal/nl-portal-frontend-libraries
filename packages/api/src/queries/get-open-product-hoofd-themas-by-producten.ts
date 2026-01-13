import { gql } from "@apollo/client";

export const QUERY_GET_OPEN_PRODUCT_HOOFD_THEMAS_BY_PRODUCTEN = gql`
  query getOpenProductHoofdThemasByProducten {
    getOpenProductHoofdThemasByProducten {
      uuid
      naam
    }
  }
`;
