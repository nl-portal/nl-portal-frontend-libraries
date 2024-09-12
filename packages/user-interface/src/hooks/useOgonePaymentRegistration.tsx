import { ApiContext } from "@nl-portal/nl-portal-api";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export enum PaymentStatus {
  IN_PROGRESS,
  SUCCESS,
  FAILURE,
}

const useOgonePaymentRegistration = () => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>();
  const { restUri } = useContext(ApiContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (type === "ogone" && typeof paymentStatus === "undefined") {
      setPaymentStatus(PaymentStatus.IN_PROGRESS);
      searchParams.delete("type");
      fetch(`${restUri}/payment/ogone/postsale?${searchParams.toString()}`)
        .then((response) => {
          if (response.ok) {
            setPaymentStatus(PaymentStatus.SUCCESS);
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
          // Clear the Ogone return parameters
          const newSearchParams = new URLSearchParams();
          setSearchParams(newSearchParams);
        });
    }
  }, [type, paymentStatus]);

  return { paymentStatus };
};

export default useOgonePaymentRegistration;
