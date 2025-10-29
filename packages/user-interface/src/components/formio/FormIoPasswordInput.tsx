import { Components } from "@formio/react";
import { TextInput } from "@gemeente-denhaag/text-input";
import { useId } from "react";
import { Container } from "react-dom/client";
import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import useFormIoState, {
  FormIoRefProp,
  useFormIoStateProps,
} from "./useFormIoState";
import BaseFormIoComponent from "./BaseFormIoComponent";

type FormIoPasswordInputProps = BasicFormIoComponentSchema &
  useFormIoStateProps;

const FormIoPasswordInput = ({
  formioRef,
  onChange,
  disabled,
  placeholder,
  label,
  attributes,
  initialValue,
}: FormIoPasswordInputProps) => {
  const [value, setValue] = useFormIoState({
    formioRef,
    onChange,
    initialValue,
  });
  const id = useId();

  return (
    <FormField>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextInput
        id={id}
        type="password"
        value={value || ""}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(ev) => setValue(ev?.target?.value)}
        {...attributes}
      />
    </FormField>
  );
};

export default class FormIoPasswordInputWrapper extends BaseFormIoComponent {
  static register: () => void = () =>
    super.register("password", FormIoPasswordInputWrapper);

  static schema(sources: any = {}) {
    return Components.components.field.schema({
      type: "password",
      hideLabel: true,
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Password",
      group: "basic",
      key: "password",
      schema: FormIoPasswordInputWrapper.schema(),
    };
  }

  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoPasswordInput);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
