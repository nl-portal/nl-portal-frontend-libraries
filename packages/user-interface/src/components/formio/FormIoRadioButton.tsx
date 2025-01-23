import { Components } from "@formio/react";
import { ExtendedComponentSchema, Formio } from "formiojs";
import { useId } from "react";
import { Container } from "react-dom/client";

import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";
import BaseFormIoComponent from "./BaseFormIoComponent";
import useFormIoState, {
  FormIoRefProp,
  useFormIoStateProps,
} from "./useFormIoState";
import FormField from "@gemeente-denhaag/form-field";
import FormLabel from "@gemeente-denhaag/form-label";
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";
import { Paragraph } from "@gemeente-denhaag/typography";
import RadioButton from "@gemeente-denhaag/radio-button";

type RadioOption = {
  label: string;
  value: string | number;
};

type FormIoRadioProps = BasicFormIoComponentSchema &
  useFormIoStateProps<string | number> & {
    values?: RadioOption[];
    name: string;
  };

type FormIoRadioOptionProps = {
  componentKey: string;
  option: RadioOption;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FormIoRadioOption = ({
  componentKey,
  onChange,
  option,
}: FormIoRadioOptionProps) => {
  const id = useId();
  return (
    <FormField type="radio">
      <Paragraph className="utrecht-form-field__label utrecht-form-field__label--radio">
        <FormLabel htmlFor={id} type="radio">
          <RadioButton
            className="utrecht-form-field__input"
            id={id}
            name={componentKey}
            value={option.value}
            onChange={onChange}
          />
          {option.label}
        </FormLabel>
      </Paragraph>
    </FormField>
  );
};

const FormIoRadio = ({
  formioRef,
  onChange,
  componentKey,
  values = [],
  label,
}: FormIoRadioProps) => {
  const [value, setValue] = useFormIoState<string | number>({
    formioRef,
    onChange,
  });

  return (
    <Fieldset>
      <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
        {label}
      </FieldsetLegend>

      {values.map((option) => (
        <FormIoRadioOption
          key={option.value}
          componentKey={componentKey || "radioButtonGroup"}
          option={option}
          checked={value === option.value}
          onChange={(ev) => setValue(ev.target.value)}
        />
      ))}
    </Fieldset>
  );
};

export default class FormIoRadioWrapper extends BaseFormIoComponent {
  static register: () => void = () => {
    Formio.use({
      components: {
        radio: FormIoRadioWrapper,
      },
    });
  };

  static schema(sources: ExtendedComponentSchema = {}) {
    return Components.components.field.schema({
      type: "radio",
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Radio",
      group: "basic",
      key: "radio",
      schema: FormIoRadioWrapper.schema(),
    };
  }

  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoRadio);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
