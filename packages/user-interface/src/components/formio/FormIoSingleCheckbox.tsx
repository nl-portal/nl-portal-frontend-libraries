import { Components } from "@formio/react";
import { ExtendedComponentSchema, Formio } from "formiojs";
import { ReactNode } from "react";
import { Container } from "react-dom/client";
import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";
import FormField from "@gemeente-denhaag/form-field";
import FormLabel from "@gemeente-denhaag/form-label";
import useFormIoState, {
  FormIoRefProp,
  useFormIoStateProps,
} from "./useFormIoState";
import BaseFormIoComponent from "./BaseFormIoComponent";
import { Paragraph } from "@gemeente-denhaag/typography";
import Checkbox from "@gemeente-denhaag/checkbox";

type FormIoSingleCheckboxProps = BasicFormIoComponentSchema &
  useFormIoStateProps;

const FormIoSingleCheckbox = ({
  formioRef,
  onChange,
  disabled,
  label,
}: FormIoSingleCheckboxProps): ReactNode => {
  const [value, setValue] = useFormIoState<boolean>({ formioRef, onChange });

  return (
    <FormField type="checkbox">
      <Paragraph className="utrecht-form-field__label utrecht-form-field__label--checkbox">
        <FormLabel type="checkbox">
          <Checkbox
            name="consent"
            className="utrecht-form-field__input"
            checked={Boolean(value)}
            disabled={disabled}
            onChange={(ev) => setValue(ev?.target?.checked)}
          />
          {label}
        </FormLabel>
      </Paragraph>
    </FormField>
  );
};

export default class FormIoSingleCheckboxWrapper extends BaseFormIoComponent {
  static register: () => void = () => {
    Formio.use({
      components: {
        checkbox: FormIoSingleCheckboxWrapper,
      },
    });
  };

  static schema(sources: ExtendedComponentSchema = {}) {
    return Components.components.field.schema({
      type: "checkbox",
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Checkbox",
      group: "basic",
      key: "checkbox",
      schema: FormIoSingleCheckboxWrapper.schema(),
    };
  }

  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoSingleCheckbox);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
