import { ChangeEvent, useMemo, useState } from "react";

export type Validation = {
  validationFn: (value: string) => boolean;
  errorTranslationId: string;
};

const useInput = (defaultValue: string, validations: Validation[]) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const errorTranslationId = useMemo(() => {
    return (
      validations.find((validation) => !validation.validationFn(enteredValue))
        ?.errorTranslationId || ""
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
    errorTranslationId,
  };
};

export default useInput;
