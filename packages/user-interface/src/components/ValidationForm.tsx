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
import { FormattedMessage } from "react-intl";
import { TextInput } from "@gemeente-denhaag/text-input";
import { FormFieldErrorMessage } from "@gemeente-denhaag/form-field-error-message";
import { useEffect, useState } from "react";
import { Alert, AlertProps } from "@gemeente-denhaag/alert";
import ValidationFormCountdown from "./ValidationFormCountdown";

interface ValidationFormProps {
  type: keyof typeof VerificatieType;
  value: string;
  loading?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  error?: AlertProps | boolean;
  description?: React.ReactNode;
}

const ValidationForm = ({
  type,
  value: verifyValue,
  loading,
  onSuccess,
  onCancel,
  error = false,
  description,
}: ValidationFormProps) => {
  const [showTimer, setShowTimer] = useState(false);
  const [timerComplete, setTimerComplete] = useState(false);
  const [
    createFunction,
    {
      data: createData,
      loading: createLoading,
      called: createCalled,
      error: createError,
    },
  ] = useCreateVerificatieMutation();
  const createErrorState =
    !createLoading &&
    createCalled &&
    (Boolean(createError) || createData?.createVerificatie?.success === false);

  const [
    verifyFunction,
    {
      data: verifyData,
      loading: verifyLoading,
      called: verifyCalled,
      error: verifyError,
      reset: verifyReset,
    },
  ] = useVerifyVerificatieMutation();
  const verifyErrorState =
    !verifyLoading &&
    verifyCalled &&
    (Boolean(verifyError) || verifyData?.verifyVerificatie?.verified === false);

  useEffect(() => {
    createFunction({
      variables: {
        verificatieCreateInput: {
          type: VerificatieType[type],
          waarde: verifyValue,
        },
      },
      onCompleted: (data) => {
        if (data.createVerificatie?.success) return setShowTimer(true);
      },
    });
  }, []);

  const {
    value,
    handleInputChange,
    handleInputBlur,
    hasError,
    errorTranslationId,
    resetValue,
  } = useInput("", [
    {
      validationFn: (value: string) => value !== "",
      errorTranslationId: "validationForm.error",
    },
  ]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const results = await verifyFunction({
      variables: {
        verificatieVerifyInput: {
          type: VerificatieType[type],
          waarde: verifyValue,
          code: value,
        },
      },
    });

    if (results.data?.verifyVerificatie?.verified === false) return;

    onSuccess?.();
  };

  const handleCancel = () => {
    setShowTimer(false);
    setTimerComplete(false);
    createFunction({
      variables: {
        verificatieCreateInput: {
          type: VerificatieType[type],
          waarde: verifyValue,
        },
      },
      onCompleted: (data) => {
        if (data.createVerificatie?.success) return setShowTimer(true);
      },
    });
    resetValue();
    verifyReset();
    onCancel?.();
  };

  return (
    <>
      {!createErrorState && description}
      {createErrorState && (
        <Alert
          variant="warning"
          title={<FormattedMessage id="validationForm.createError.Title" />}
          text={<FormattedMessage id="validationForm.createError.Text" />}
        />
      )}
      {timerComplete && (
        <Alert
          variant="warning"
          title={<FormattedMessage id="validationForm.timeError.Title" />}
          text={<FormattedMessage id="validationForm.timeError.Text" />}
        />
      )}
      <Form
        loading={
          !value ||
          loading ||
          createLoading ||
          verifyLoading ||
          createErrorState ||
          verifyErrorState ||
          timerComplete
        }
        error={
          error ||
          (verifyErrorState && {
            variant: "error",
            title: <FormattedMessage id="validationForm.verifyError.title" />,
            text: <FormattedMessage id="validationForm.verifyError.text" />,
          })
        }
        onChange={verifyReset}
        onSubmit={handleSubmit}
        cancelTranslationId="validationForm.cancel"
        onCancel={handleCancel}
      >
        <FormField invalid={hasError}>
          <FormLabel htmlFor="validationForm">
            <FormattedMessage id={`validationForm.label`} />
          </FormLabel>
          <FormFieldDescription>
            {showTimer && (
              <ValidationFormCountdown
                onComplete={() => setTimerComplete(true)}
              />
            )}
          </FormFieldDescription>
          <TextInput
            id="validationForm"
            type="text"
            name="value"
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            invalid={hasError}
            disabled={createLoading || createErrorState || timerComplete}
          />
          {hasError && (
            <FormFieldErrorMessage>
              <FormattedMessage id={errorTranslationId} />
            </FormFieldErrorMessage>
          )}
        </FormField>
      </Form>
    </>
  );
};

export default ValidationForm;
