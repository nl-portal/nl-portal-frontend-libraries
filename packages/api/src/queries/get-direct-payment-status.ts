import { gql } from "@apollo/client";

export const QUERY_GET_DIRECT_PAYMENT_STATUS = gql`
  query GetDirectPaymentStatus(
    $identifier: String!
    $hostedCheckoutId: String!
  ) {
    getDirectPaymentStatus(
      identifier: $identifier
      hostedCheckoutId: $hostedCheckoutId
    ) {
      status
    }
  }
`;
