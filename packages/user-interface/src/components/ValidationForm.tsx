import {
  useCreateVerificatieMutation,
  useVerifyVerificatieMutation,
  VerificatieType,
} from "@nl-portal/nl-portal-api";
import { Form } from "./Form";
import { FormField } from "@gemeente-denhaag/form-field";
import useInput from "../hooks/useInput";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { FormFieldDescription } from "@gemeente-denhaag/form-field-description";
import { FormattedMessage, FormattedTime } from "react-intl";
import { TextInput } from "@gemeente-denhaag/text-input";
import { FormFieldErrorMessage } from "@gemeente-denhaag/form-field-error-message";
import { useEffect, useState } from "react";

interface ValidationFormProps {
  type: keyof typeof VerificatieType;
  value: string;
  loading?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  error?: boolean;
}

const ValidationForm = ({
  type,
  value: verifyValue,
  loading,
  onSuccess,
  onCancel,
  error,
}: ValidationFormProps) => {
  const timerLength = (10 * 60 - 1) * 1000;
  const [timeRemaining, setTimeRemaining] = useState(timerLength);

  useEffect(() => {
    if (timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const [createFunction, { loading: createLoading }] =
    useCreateVerificatieMutation();

  const [
    verifyFunction,
    {
      loading: verifyLoading,
      error: verifyError,
      called: verifyCalled,
      reset: verifyReset,
    },
  ] = useVerifyVerificatieMutation();
  const verifyErrorPresent = Boolean(!loading && verifyCalled && verifyError);

  useEffect(() => {
    createFunction({
      variables: {
        verificatieCreateInput: {
          type: VerificatieType[type],
          waarde: verifyValue,
        },
      },
    });
  }, []);

  const {
    value,
    handleInputChange,
    handleInputBlur,
    hasError,
    errorTranslationId,
  } = useInput("", [
    {
      validationFn: (value: string) => value !== "",
      errorTranslationId: "account.detail.validation.error",
    },
  ]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      verifyFunction({
        variables: {
          verificatieVerifyInput: {
            type: VerificatieType[type],
            waarde: verifyValue,
            code: value,
          },
        },
      });
      onSuccess?.();
    } catch {
      // Handle error if needed
    }
  };

  const handleCancel = () => {
    createFunction({
      variables: {
        verificatieCreateInput: {
          type: VerificatieType[type],
          waarde: verifyValue,
        },
      },
    });
    verifyReset();
    setTimeRemaining(timerLength);
    onCancel?.();
  };

  return (
    <Form
      loading={
        !value ||
        loading ||
        createLoading ||
        verifyLoading ||
        timeRemaining <= 0
      }
      error={error || verifyErrorPresent}
      onChange={verifyReset}
      onSubmit={handleSubmit}
      cancelTranslationId="account.detail.validationForm.cancel"
      onCancel={handleCancel}
    >
      <FormField invalid={hasError}>
        <FormLabel htmlFor="validationForm">
          <FormattedMessage id={`account.detail.validationFormLabel`} />
        </FormLabel>
        <FormFieldDescription>
          <FormattedMessage
            id={`account.detail.validationFormDescription`}
            values={{
              time: (
                <FormattedTime
                  value={timeRemaining}
                  minute="2-digit"
                  second="2-digit"
                />
              ),
            }}
          />
        </FormFieldDescription>
        <TextInput
          id="validationForm"
          type="text"
          name="value"
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          invalid={hasError}
        />
        {hasError && (
          <FormFieldErrorMessage>
            <FormattedMessage id={errorTranslationId} />
          </FormFieldErrorMessage>
        )}
      </FormField>
    </Form>
  );
};

export default ValidationForm;
