import { Components } from "@formio/react";
import TextInput from "@gemeente-denhaag/text-input";
import { ExtendedComponentSchema, Formio } from "formiojs";
import { ReactNode, useId } from "react";
import { Container } from "react-dom/client";
import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";
import FormField from "@gemeente-denhaag/form-field";
import FormLabel from "@gemeente-denhaag/form-label";
import useFormIoState, {
  FormIoRefProp,
  useFormIoStateProps,
} from "./useFormIoState";
import BaseFormIoComponent from "./BaseFormIoComponent";

type FormIoTextInputProps = BasicFormIoComponentSchema & useFormIoStateProps;

const FormIoTextInput = ({
  formioRef,
  onChange,
  disabled,
  placeholder,
  label,
}: FormIoTextInputProps): ReactNode => {
  const [value, setValue] = useFormIoState({ formioRef, onChange });
  const id = useId();

  return (
    <FormField>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextInput
        id={id}
        type="text"
        value={value || ""}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(ev) => setValue(ev?.target?.value)}
      />
    </FormField>
  );
};

export default class FormIoTextInputWrapper extends BaseFormIoComponent {
  static register: () => void = () => {
    Formio.use({
      components: {
        textfield: FormIoTextInputWrapper,
      },
    });
  };

  static schema(sources: ExtendedComponentSchema = {}) {
    return Components.components.field.schema({
      type: "textfield",
      hideLabel: true,
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Text Field",
      group: "basic",
      key: "textfield",
      schema: FormIoTextInputWrapper.schema(),
    };
  }

  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoTextInput);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
