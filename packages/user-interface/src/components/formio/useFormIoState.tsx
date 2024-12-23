import { useEffect, useState } from "react";

export type FormIoRefState = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState: ({ value }: { value: any }) => void;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: { value: any };
};

export type FormIoRefProp = (element: FormIoRefState) => void;

export type useFormIoStateProps = {
  formioRef: FormIoRefProp;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any, flags?: any) => void;
};

const useFormIoState = ({
  formioRef,
  onChange,
}: useFormIoStateProps): [string, (value?: string) => void] => {
  const [state, setState] = useState({ value: "" });

  // ref to formio ReactComponent
  useEffect(() => {
    formioRef({ state, setState });
  }, [formioRef]);

  // on value change
  useEffect(() => {
    onChange(state.value);
  }, [state.value]);

  const setValue = (value?: string) => {
    setState({ value: value || "" });
  };

  return [state.value, setValue];
};

export default useFormIoState;
