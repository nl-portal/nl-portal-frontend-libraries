import { ApiContext } from "@nl-portal/nl-portal-api";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export enum PaymentStatus {
  IN_PROGRESS,
  SUCCESS,
  FAILURE,
}

const useOgonePaymentRegistration = (usePostsale?: boolean) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>();
  const [orderId, setOrderId] = useState<string | undefined>();
  const { restUri } = useContext(ApiContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const status = searchParams.get("STATUS");

  useEffect(() => {
    if (type !== "ogone") return;
    if (paymentStatus !== undefined) return;

    setPaymentStatus(PaymentStatus.IN_PROGRESS);

    if (usePostsale) {
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
  }, [type, paymentStatus]);

  return { paymentStatus, orderId };
};

export default useOgonePaymentRegistration;
