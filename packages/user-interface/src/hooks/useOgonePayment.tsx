import {
  DoDirectPaymentMutationVariables,
  useDoDirectPaymentMutation,
} from "@nl-portal/nl-portal-api";
import { useContext, useState } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Optional } from "../interfaces/optional";

// amount, required, The amount to be paid (float).
// identifier, required, The identifier of the merchant. Can be found in product eigenschappen or in the taak pspid.
// langId: The language id of the payment page. This id should be in the format of nl_NL.
// orderId, required, The unique order id. This id will be used to identify the payment in the Ogone system.
// reference, required, The reference of the payment. This reference will be shown on the bank statement of the payer.
// returnUrl: The url to redirect to after a successful payment.

const useOgonePayment = () => {
  const [loading, setLoading] = useState(false);
  const [mutateFunction] = useDoDirectPaymentMutation();
  const { currentLocale } = useContext(LocaleContext);
  const returnUrl = new URL(window.location.href);
  returnUrl.searchParams.set("type", "ogone");

  const startPayment = (
    paymentRequestPayload: Optional<
      DoDirectPaymentMutationVariables,
      "langId" | "returnUrl"
    >,
  ) => {
    setLoading(true);
    mutateFunction({
      variables: {
        langId: currentLocale.replace("-", "_"),
        returnUrl: returnUrl.href,
        ...paymentRequestPayload,
      },
      onCompleted: (data) => {
        window.location.href = data.doDirectPayment.redirectUrl;
      },
      onError: () => {
        setLoading(false);
      },
    });
  };

  return {
    loading,
    startPayment,
  };
};

export default useOgonePayment;
