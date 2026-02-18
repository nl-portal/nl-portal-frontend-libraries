import { Form } from "./Form";
import { FormField } from "@gemeente-denhaag/form-field";
import useInput from "../hooks/useInput";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { FormFieldDescription } from "@gemeente-denhaag/form-field-description";
import { FormattedMessage } from "react-intl";
import { TextInput } from "@gemeente-denhaag/text-input";
import { FormFieldErrorMessage } from "@gemeente-denhaag/form-field-error-message";
import { useState } from "react";
import { Alert, AlertProps } from "@gemeente-denhaag/alert";
import ValidationFormCountdown from "./ValidationFormCountdown";

interface ValidationFormProps {
  value: string;
  loading?: boolean;
  onSubmit?: (verificationCode: string) => void;
  onRefresh?: () => Promise<void>;
  error?: AlertProps | boolean;
}

const ValidationForm = ({
  loading,
  onSubmit,
  onRefresh,
  error = false,
}: ValidationFormProps) => {
  const [showTimer, setShowTimer] = useState(true);
  const [timerComplete, setTimerComplete] = useState(false);

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
    onSubmit?.(value);
  };

  const handleCancel = async () => {
    setShowTimer(false);
    setTimerComplete(false);
    await onRefresh?.();
    setShowTimer(true);
    resetValue();
  };

  return (
    <>
      {timerComplete && (
        <Alert
          variant="warning"
          title={<FormattedMessage id="validationForm.timeError.Title" />}
          text={<FormattedMessage id="validationForm.timeError.Text" />}
        />
      )}
      <Form
        loading={!value || loading || timerComplete}
        onSubmit={handleSubmit}
        cancelTranslationId="validationForm.cancel"
        onCancel={handleCancel}
        error={error}
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
            disabled={timerComplete}
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
