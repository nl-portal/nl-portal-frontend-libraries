import { ApiContext } from "@nl-portal/nl-portal-api";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export enum PaymentStatus {
  IN_PROGRESS,
  SUCCESS,
  FAILURE,
}

interface Props {
  usePostsale?: boolean;
}

const useOgonePaymentRegistration = ({ usePostsale }: Props) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>();
  const [orderId, setOrderId] = useState<string | undefined>();
  const { restUri } = useContext(ApiContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const status = searchParams.get("status");

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
        });
    } else {
      if (status === "9") {
        setPaymentStatus(PaymentStatus.SUCCESS);
        setOrderId(searchParams.get("orderID")?.toString());
      } else {
        console.error("payment failed:", status);
        setPaymentStatus(PaymentStatus.FAILURE);
      }
    }
  }, [type, paymentStatus]);

  useEffect(() => {
    if (paymentStatus === undefined) return;
    // // Clear the Ogone return parameters
    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
  }, [paymentStatus]);

  return { paymentStatus, orderId };
};

export default useOgonePaymentRegistration;
