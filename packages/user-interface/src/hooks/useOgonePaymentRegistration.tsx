import {
  ApiContext,
  DirectPaymentStatusCategory,
  GetDirectPaymentStatusDocument,
} from "@nl-portal/nl-portal-api";
import { useLazyQuery } from "@apollo/client/react";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import AppContext from "../contexts/AppContext";

export enum PaymentStatus {
  IN_PROGRESS,
  SUCCESS,
  FAILURE,
}

const useOgonePaymentRegistration = (useLegacyPostsale?: boolean) => {
  const { features } = useContext(AppContext);
  const [getPaymentStatus] = useLazyQuery(GetDirectPaymentStatusDocument);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>();
  const [orderId, setOrderId] = useState<string | undefined>();
  const { restUri } = useContext(ApiContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (type !== "ogone") return;
    if (paymentStatus !== undefined) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPaymentStatus(PaymentStatus.IN_PROGRESS);

    if (features?.toggles.legacyPaymentEnabled) {
      if (useLegacyPostsale) {
        fetch(
          `${restUri}/public/payment/ogone/postsale?${searchParams.toString()}`,
        )
          .then((response) => {
            if (response.ok) {
              setPaymentStatus(PaymentStatus.SUCCESS);
              setOrderId(searchParams.get("orderID")?.toString());
            } else {
              console.error("payment failed:", response.statusText);
              setPaymentStatus(PaymentStatus.FAILURE);
            }
          })
          .catch((error) => {
            console.error("payment failed:", error);
            setPaymentStatus(PaymentStatus.FAILURE);
          })
          .finally(() => {
            const newSearchParams = new URLSearchParams();
            setSearchParams(newSearchParams);
          });
      } else {
        const status = searchParams.get("STATUS");

        if (status === "9") {
          setPaymentStatus(PaymentStatus.SUCCESS);
          setOrderId(searchParams.get("orderID")?.toString());
        } else {
          console.error("payment failed:", status);
          setPaymentStatus(PaymentStatus.FAILURE);
        }

        const newSearchParams = new URLSearchParams();
        setSearchParams(newSearchParams);
      }
    } else {
      const hostedCheckoutId = searchParams.get("hostedCheckoutId");
      const category = searchParams.get("category");

      if (!hostedCheckoutId || !category) {
        setPaymentStatus(PaymentStatus.FAILURE);
        return;
      }

      getPaymentStatus({
        variables: { identifier: category, hostedCheckoutId: hostedCheckoutId },
      })
        .then(({ data: paymentStatusData }) => {
          if (
            paymentStatusData?.getDirectPaymentStatus.status ===
            DirectPaymentStatusCategory.Successful
          ) {
            setPaymentStatus(PaymentStatus.SUCCESS);
          } else {
            setPaymentStatus(PaymentStatus.FAILURE);
          }
        })
        .catch(() => setPaymentStatus(PaymentStatus.FAILURE))
        .finally(() => {
          const newSearchParams = new URLSearchParams();
          setSearchParams(newSearchParams);
        });
    }
  }, [type, paymentStatus]);

  return { paymentStatus, orderId };
};

export default useOgonePaymentRegistration;
