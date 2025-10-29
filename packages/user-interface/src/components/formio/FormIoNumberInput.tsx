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

type FormIoNumberInputProps = BasicFormIoComponentSchema & useFormIoStateProps;

const FormIoNumberInput = ({
  formioRef,
  onChange,
  disabled,
  placeholder,
  label,
  attributes,
  initialValue,
}: FormIoNumberInputProps) => {
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
        type="number"
        value={value || ""}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(ev) => setValue(ev?.target?.value)}
        {...attributes}
      />
    </FormField>
  );
};

export default class FormIoNumberInputWrapper extends BaseFormIoComponent {
  static register: () => void = () =>
    super.register("number", FormIoNumberInputWrapper);

  static schema(sources: any = {}) {
    return Components.components.field.schema({
      type: "number",
      hideLabel: true,
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Number",
      group: "basic",
      key: "number",
      schema: FormIoNumberInputWrapper.schema(),
    };
  }

  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoNumberInput);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
