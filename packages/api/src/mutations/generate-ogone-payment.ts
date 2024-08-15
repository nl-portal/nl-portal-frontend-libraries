import { gql } from "@apollo/client";

export const MUTATION_GENERATE_PAYMENT = gql`
  mutation GenerateOgonePayment(
    $amount: Float!
    $failureUrl: String!
    $langId: String!
    $orderId: String!
    $pspId: String!
    $reference: String!
    $successUrl: String!
    $title: String!
  ) {
    generateOgonePayment(
      paymentRequest: {
        amount: $amount
        failureUrl: $failureUrl
        langId: $langId
        orderId: $orderId
        pspId: $pspId
        reference: $reference
        successUrl: $successUrl
        title: $title
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
