import { gql } from "@apollo/client";

export const MUTATION_DO_DIRECT_PAYMENT = gql`
  mutation DoDirectPayment(
    $amount: Float!
    $identifier: String!
    $langId: String
    $orderId: String!
    $reference: String!
    $returnUrl: String
  ) {
    doDirectPayment(
      paymentRequest: {
        amount: $amount
        identifier: $identifier
        langId: $langId
        orderId: $orderId
        reference: $reference
        returnUrl: $returnUrl
      }
    ) {
      redirectUrl
    }
  }
`;
