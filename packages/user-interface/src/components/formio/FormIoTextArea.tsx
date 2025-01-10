import { Components } from "@formio/react";
import { ExtendedComponentSchema, Formio } from "formiojs";
import { useId } from "react";
import { Container } from "react-dom/client";
import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";
import FormField from "@gemeente-denhaag/form-field";
import FormLabel from "@gemeente-denhaag/form-label";
import useFormIoState, {
  FormIoRefProp,
  useFormIoStateProps,
} from "./useFormIoState";
import BaseFormIoComponent from "./BaseFormIoComponent";
import Textarea from "@gemeente-denhaag/textarea";

type FormIoTextAreaProps = BasicFormIoComponentSchema & useFormIoStateProps;

const FormIoTextArea = ({
  formioRef,
  onChange,
  disabled,
  placeholder,
  label,
}: FormIoTextAreaProps) => {
  const [value, setValue] = useFormIoState({ formioRef, onChange });
  const id = useId();

  return (
    <FormField>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Textarea
        id={id}
        value={value || ""}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(ev) => setValue(ev?.target?.value)}
      />
    </FormField>
  );
};

export default class FormIoTextAreaWrapper extends BaseFormIoComponent {
  static register: () => void = () => {
    Formio.use({
      components: {
        textarea: FormIoTextAreaWrapper,
      },
    });
  };

  static schema(sources: ExtendedComponentSchema = {}) {
    return Components.components.field.schema({
      type: "textarea",
      hideLabel: true,
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Text Area",
      group: "basic",
      key: "textarea",
      schema: FormIoTextAreaWrapper.schema(),
    };
  }

  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoTextArea);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
