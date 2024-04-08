import { gql } from "@apollo/client";

export const MUTATION_GENERATE_PAYMENT = gql`
  mutation GeneratePayment(
    $paymentProfileIdentifier: String!
    $amount: Float!
    $orderId: String!
    $reference: String!
    $title: String!
    $langId: String!
    $successUrl: String!
    $failureUrl: String!
  ) {
    generatePayment(
      paymentProfileIdentifier: $paymentProfileIdentifier
      paymentRequest: {
        amount: $amount
        orderId: $orderId
        reference: $reference
        title: $title
        langId: $langId
        successUrl: $successUrl
        failureUrl: $failureUrl
      }
    ) {
      formAction
      formFields {
        name
        value
      }
    }
  }
`;
