import {
  OgonePayment,
  useDoDirectPaymentMutation,
  useGenerateOgonePaymentMutation,
} from "@nl-portal/nl-portal-api";
import { useContext, useState } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import OgonePaymentForm from "../components/OgonePaymentForm";

// -- Variables for the Ogone direct payment request:
// amount, required, The amount to be paid (float).
// identifier, required, The identifier of the merchant. Can be found in product eigenschappen or in the taak pspid.
// orderId, required, The unique order id. This id will be used to identify the payment in the Ogone system.
// reference, required, The reference of the payment. This reference will be shown on the bank statement of the payer.
// langId: The language id of the payment page. This id should be in the format of nl_NL.
// returnUrl: The url to redirect to after a successful payment.

// -- Variables for the Ogone payment request:
// amount, required, The amount to be paid (float).
// pspId, required, The PSPID of the merchant. Can be fount in product eigenschappen.
// orderId, required, The unique order id. This id will be used to identify the payment in the Ogone system.
// reference, required, The reference of the payment. This reference will be shown on the bank statement of the payer.
// langId: required, The language id of the payment page. This id should be in the format of nl_NL.
// title, required, The title of the payment. This title will be shown on the payment page.
// successUrl: required, The url to redirect to after a successful payment.
// failureUrl: required, The url to redirect to after a failed payment.

interface PaymentRequestPayload {
  amount: number;
  pspId: string;
  orderId: string;
  reference: string;
  title?: string;
  returnUrl?: string;
}

const useOgonePayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<OgonePayment>();
  const [mutateFunction] = useGenerateOgonePaymentMutation();
  const [mutateDirectFunction] = useDoDirectPaymentMutation();
  const { currentLocale } = useContext(LocaleContext);
  const returnUrl = new URL(window.location.href);
  returnUrl.searchParams.set("type", "ogone");

  const startPayment = (paymentRequestPayload: PaymentRequestPayload) => {
    setLoading(true);

    if (window.OGONE_DIRECT_PAYMENT) {
      mutateDirectFunction({
        variables: {
          amount: paymentRequestPayload.amount,
          identifier: paymentRequestPayload.pspId,
          orderId: paymentRequestPayload.orderId,
          reference: paymentRequestPayload.reference,
          langId: currentLocale.replace("-", "_"),
          returnUrl: paymentRequestPayload.returnUrl || returnUrl.href,
        },
        onCompleted: (data) => {
          window.location.href = data.doDirectPayment.redirectUrl;
        },
        onError: () => {
          setLoading(false);
        },
      });
    } else {
      mutateFunction({
        variables: {
          amount: paymentRequestPayload.amount,
          pspId: paymentRequestPayload.pspId,
          orderId: paymentRequestPayload.orderId,
          reference: paymentRequestPayload.reference,
          title: paymentRequestPayload.title,
          langId: currentLocale.replace("-", "_"),
          successUrl: paymentRequestPayload.returnUrl || returnUrl.href,
          failureUrl: paymentRequestPayload.returnUrl || returnUrl.href,
        },
        onCompleted: (data) => {
          setPaymentData(data.generateOgonePayment);
        },
        onError: () => {
          setLoading(false);
        },
      });
    }
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
