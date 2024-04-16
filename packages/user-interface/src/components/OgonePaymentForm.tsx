import { OgonePayment } from "@nl-portal/nl-portal-api";
import { useEffect, useRef } from "react";

const OgonePaymentForm = ({ formAction, formFields }: OgonePayment) => {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => formRef.current?.submit(), []); // Auto submit hidden form to redirect to Ogone

  return (
    <form ref={formRef} method="POST" action={formAction}>
      {formFields.map((formField) => (
        <input
          key={formField.name}
          type="hidden"
          name={formField.name}
          value={formField.value}
        />
      ))}
    </form>
  );
};

export default OgonePaymentForm;
