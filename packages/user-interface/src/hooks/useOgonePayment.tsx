import {
  GenerateOgonePaymentMutationVariables,
  OgonePayment,
  useGenerateOgonePaymentMutation,
} from "@nl-portal/nl-portal-api";
import { useState } from "react";
import OgonePaymentForm from "../components/OgonePaymentForm";

const useOgonePayment = () => {
  const [showPaymentRedirectForm, setShowPaymentRedirectForm] = useState(false);
  const [paymentData, setPaymentData] = useState<OgonePayment>();
  const [mutateFunction] = useGenerateOgonePaymentMutation();

  const startPayment = (
    paymentRequestPayload: GenerateOgonePaymentMutationVariables,
  ) => {
    mutateFunction({
      variables: { ...paymentRequestPayload },
      onCompleted: (data) => {
        console.log(data);
        setPaymentData(data.generateOgonePayment);
        setShowPaymentRedirectForm(true);
      },
    });
  };

  const renderPaymentRedirectForm = () => {
    return paymentData && <OgonePaymentForm {...paymentData} />;
  };

  return {
    startPayment,
    renderPaymentRedirectForm,
    showPaymentRedirectForm,
  };
};

export default useOgonePayment;
