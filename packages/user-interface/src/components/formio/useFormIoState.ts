// useFormIoState.ts
import { useEffect, useRef, useState } from "react";

export type FormIoRefState<T = any> = {
  setState: ({ value }: { value: T }) => void;
  state: { value: T };
};
export type FormIoRefProp<T = any> = (element: FormIoRefState<T>) => void;

export type useFormIoStateProps<T = any> = {
  formioRef: FormIoRefProp<T>;
  onChange: (value: T, flags?: any) => void;
  initialValue?: T;
};

export const useFormIoState = <T = any>({
  formioRef,
  onChange,
  initialValue,
}: useFormIoStateProps<T>): [T, (value: T) => void] => {
  const [state, setState] = useState<{ value: T }>({
    value: initialValue as T, // seed from Form.io
  });

  const skipNextOnChange = useRef(true);

  // expose {state,setState} to Form.io wrapper (unchanged)
  useEffect(() => {
    formioRef({ state, setState });
  }, [formioRef, state]);

  // if Form.io re-renders with a new value (e.g. after add/remove row), hydrate again
  useEffect(() => {
    if (initialValue !== undefined) {
      skipNextOnChange.current = true;
      setState({ value: initialValue as T });
    }
  }, [initialValue]);

  // propagate user edits to Form.io (skip the hydration pass)
  useEffect(() => {
    if (state.value !== undefined) {
      if (skipNextOnChange.current) {
        skipNextOnChange.current = false;
      } else {
        onChange(state.value);
      }
    }
  }, [state.value, onChange]);

  const setValue = (value: T) => setState({ value });

  return [state.value, setValue];
};

export default useFormIoState;
