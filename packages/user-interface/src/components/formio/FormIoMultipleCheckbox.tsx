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
import { Paragraph } from "@gemeente-denhaag/typography";
import Checkbox from "@gemeente-denhaag/checkbox";
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";

type FormIoMultipleCheckboxProps = BasicFormIoComponentSchema &
  useFormIoStateProps & {
    values: any[];
  };

const FormIoMultipleCheckbox = ({
  formioRef,
  onChange,
  values = [],
  label,
}: FormIoMultipleCheckboxProps): ReactNode => {
  const [value, setValue] = useFormIoState({ formioRef, onChange });

  return (
    <Fieldset>
      <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
        {label}
      </FieldsetLegend>
      {values.map((option) => (
        <FormField type="checkbox">
          <Paragraph className="utrecht-form-field__label utrecht-form-field__label--checkbox">
            <FormLabel
              htmlFor="4e054ee1-799e-4608-9055-19d3fc0b88e9"
              type="checkbox"
            >
              <Checkbox
                aria-describedby="4e054ee1-799e-4608-9055-19d3fc0b88e9-description"
                className="utrecht-form-field__input"
                id="4e054ee1-799e-4608-9055-19d3fc0b88e9"
                name="phone"
                value="true"
              />
              {option.label}
            </FormLabel>
          </Paragraph>
        </FormField>
      ))}
    </Fieldset>
  );
};

export default class FormIoMultipleCheckboxWrapper extends BaseFormIoComponent {
  static register: () => void = () => {
    Formio.use({
      components: {
        selectboxes: FormIoMultipleCheckboxWrapper,
      },
    });
  };

  static schema(sources: ExtendedComponentSchema = {}) {
    return Components.components.field.schema({
      type: "selectboxes",
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Selectboxes",
      group: "basic",
      key: "select Boxes ",
      schema: FormIoMultipleCheckboxWrapper.schema(),
    };
  }

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoMultipleCheckbox);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
