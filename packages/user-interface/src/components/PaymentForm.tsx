import { useEffect, useRef } from "react";

type FormField = {
  name: string;
  value: string;
};

interface Props {
  formAction: string;
  formFields: FormField[];
}

const PaymentForm = ({ formAction, formFields }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => formRef.current?.submit(), []);

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

export default PaymentForm;
