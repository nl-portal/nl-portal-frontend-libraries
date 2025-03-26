import {
  GenerateOgonePaymentMutationVariables,
  OgonePayment,
  useGenerateOgonePaymentMutation,
} from "@nl-portal/nl-portal-api";
import { useContext, useState } from "react";
import OgonePaymentForm from "../components/OgonePaymentForm";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Optional } from "../interfaces/optional";

// amount, required, The amount to be paid (float).
// orderId, required, The unique order id. This id will be used to identify the payment in the Ogone system.
// reference, required, The reference of the payment. This reference will be shown on the bank statement of the payer.
// pspId, required, The PSPID of the merchant. Can be fount in product eigenschappen.
// title, required, The title of the payment. This title will be shown on the payment page.
// langId: required, The language id of the payment page. This id should be in the format of nl_NL.
// successUrl: required, The url to redirect to after a successful payment.
// failureUrl: required, The url to redirect to after a failed payment.

const useOgonePayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<OgonePayment>();
  const [mutateFunction] = useGenerateOgonePaymentMutation();
  const { currentLocale } = useContext(LocaleContext);
  const returnUrl = new URL(window.location.href);
  returnUrl.searchParams.set("type", "ogone");

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
        successUrl: returnUrl.href,
        failureUrl: returnUrl.href,
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
