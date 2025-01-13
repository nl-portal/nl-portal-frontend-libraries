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
import { Paragraph } from "@gemeente-denhaag/typography";
import Checkbox from "@gemeente-denhaag/checkbox";
import Fieldset, { FieldsetLegend } from "@gemeente-denhaag/form-fieldset";

type SelectboxesValue = {
  label: string;
  value: string | number;
};

type FormIoMultipleCheckboxProps = BasicFormIoComponentSchema &
  useFormIoStateProps & {
    values: SelectboxesValue[];
  };

type FormIoCheckboxProps = {
  option: SelectboxesValue;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FormIoCheckbox = ({ option, checked, onChange }: FormIoCheckboxProps) => {
  const id = useId();
  return (
    <FormField type="checkbox">
      <Paragraph className="utrecht-form-field__label utrecht-form-field__label--checkbox">
        <FormLabel htmlFor={id} type="checkbox">
          <Checkbox
            id={id}
            className="utrecht-form-field__input"
            name={String(option.value)}
            checked={checked}
            onChange={onChange}
          />
          {option.label}
        </FormLabel>
      </Paragraph>
    </FormField>
  );
};

const FormIoMultipleCheckbox = ({
  formioRef,
  onChange,
  values = [],
  label,
}: FormIoMultipleCheckboxProps) => {
  const [value, setValue] = useFormIoState<Record<string, boolean>>({
    formioRef,
    onChange,
  });

  const handleCheckboxChange = (
    optionValue: string | number,
    checked: boolean,
  ) => {
    setValue({
      ...value,
      [optionValue]: checked,
    });
  };

  return (
    <Fieldset>
      <FieldsetLegend className="utrecht-form-fieldset__legend--distanced">
        {label}
      </FieldsetLegend>
      {values.map((option) => (
        <FormIoCheckbox
          key={option.value}
          option={option}
          checked={Boolean(value?.[option.value])}
          onChange={(ev) =>
            handleCheckboxChange(option.value, ev.target.checked)
          }
        />
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
