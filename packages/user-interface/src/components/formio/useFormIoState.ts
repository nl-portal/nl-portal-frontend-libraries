import { useEffect, useState } from "react";

export type FormIoRefState<T = any> = {
  setState: ({ value }: { value: T }) => void;
  state: { value: T };
};

export type FormIoRefProp<T = any> = (element: FormIoRefState<T>) => void;

export type useFormIoStateProps<T = any> = {
  formioRef: FormIoRefProp<T>;
  onChange: (value: T, flags?: any) => void;
};

export const useFormIoState = <T = any>({
  formioRef,
  onChange,
}: useFormIoStateProps<T>): [T, (value: T) => void] => {
  const [state, setState] = useState<{ value: T }>({
    value: undefined as unknown as T,
  });

  // ref to formio ReactComponent
  useEffect(() => {
    formioRef({ state, setState });
  }, [formioRef]);

  // on value change
  useEffect(() => {
    onChange(state.value);
  }, [state.value]);

  const setValue = (value: T) => {
    setState({ value: value });
  };

  return [state.value, setValue];
};

export default useFormIoState;
