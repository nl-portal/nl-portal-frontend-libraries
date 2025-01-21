import { ChangeEvent, useEffect, useState } from "react";

export type Validation = {
  validationFn: (value: string) => boolean;
  errorTranslationId: string;
};

const useInput = (defaultValue: string, validations: Validation[]) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  const [errorTranslationId, setErrorTranslationId] = useState("");

  useEffect(() => {
    setErrorTranslationId(
      validations.find((validation) => !validation.validationFn(enteredValue))
        ?.errorTranslationId || "",
    );
  }, [enteredValue, validations]);

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  };

  const handleInputBlur = () => {
    setDidEdit(true);
  };

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && Boolean(errorTranslationId),
    errorTranslationId: errorTranslationId,
  };
};

export default useInput;
