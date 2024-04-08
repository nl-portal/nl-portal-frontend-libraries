import { useGeneratePaymentMutation } from "@nl-portal/nl-portal-api";
import { useState } from "react";
import PaymentForm from "../components/PaymentForm";

const usePayment = () => {
  const [showPaymentRedirectForm, setShowPaymentRedirectForm] = useState(false);
  const [paymentData, setPaymentData] = useState<any>();
  const [mutateFunction] = useGeneratePaymentMutation();

  const startPayment = (
    paymentProfileIdentifier: string,
    paymentRequestPayload: any,
  ) => {
    console.log(paymentRequestPayload);
    mutateFunction({
      variables: {
        paymentProfileIdentifier: paymentProfileIdentifier,
        ...paymentRequestPayload,
      },
      onCompleted: (data) => {
        setPaymentData(data.generatePayment);
        setShowPaymentRedirectForm(true);
      },
    });
  };

  const renderPaymentRedirectForm = () => {
    return <PaymentForm {...paymentData} />;
  };

  return { startPayment, renderPaymentRedirectForm, showPaymentRedirectForm };
};

export default usePayment;
