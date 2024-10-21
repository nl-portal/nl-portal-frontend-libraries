import { ChangeEvent, useEffect, useState } from "react";

const useInput = (
  defaultValue: string,
  validationFn: (value: string) => boolean,
) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  const [valueIsValid, setValueIsValid] = useState(true);

  useEffect(() => {
    setValueIsValid(validationFn(enteredValue));
  }, [enteredValue, validationFn]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    hasError: didEdit && !valueIsValid,
  };
};

export default useInput;
