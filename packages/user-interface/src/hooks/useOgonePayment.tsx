import {
  GenerateOgonePaymentMutationVariables,
  OgonePayment,
  useGenerateOgonePaymentMutation,
} from "@nl-portal/nl-portal-api";
import { useState } from "react";
import OgonePaymentForm from "../components/OgonePaymentForm";

const useOgonePayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<OgonePayment>();
  const [mutateFunction] = useGenerateOgonePaymentMutation();

  const startPayment = (
    paymentRequestPayload: GenerateOgonePaymentMutationVariables,
  ) => {
    setLoading(true);
    mutateFunction({
      variables: { ...paymentRequestPayload },
      onCompleted: (data) => {
        setPaymentData(data.generateOgonePayment);
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  const renderPaymentRedirectForm = () => {
    return paymentData && <OgonePaymentForm {...paymentData} />;
  };

  return {
    loading,
    startPayment,
    renderPaymentRedirectForm,
  };
};

export default useOgonePayment;
