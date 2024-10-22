import {
  GenerateOgonePaymentMutationVariables,
  OgonePayment,
  useGenerateOgonePaymentMutation,
} from "@nl-portal/nl-portal-api";
import { useContext, useState } from "react";
import OgonePaymentForm from "../components/OgonePaymentForm";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Optional } from "../interfaces/optional";

const useOgonePayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<OgonePayment>();
  const [mutateFunction] = useGenerateOgonePaymentMutation();
  const { currentLocale } = useContext(LocaleContext);
  const successUrl = new URL(window.location.href);
  successUrl.searchParams.set("type", "ogone");
  successUrl.searchParams.set("success", "true");
  const failureUrl = new URL(window.location.href);
  failureUrl.searchParams.set("type", "ogone");

  const startPayment = (
    paymentRequestPayload: Optional<
      GenerateOgonePaymentMutationVariables,
      "langId" | "successUrl" | "failureUrl"
    >,
  ) => {
    setLoading(true);
    mutateFunction({
      variables: {
        langId: currentLocale.replace("-", "_"),
        successUrl: successUrl.href,
        failureUrl: failureUrl.href,
        ...paymentRequestPayload,
      },
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
