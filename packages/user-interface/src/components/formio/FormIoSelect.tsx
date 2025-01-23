import { Components } from "@formio/react";
import { ExtendedComponentSchema, Formio } from "formiojs";
import { ChangeEvent, useId } from "react";
import { Container } from "react-dom/client";
import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";
import FormField from "@gemeente-denhaag/form-field";
import FormLabel from "@gemeente-denhaag/form-label";
import useFormIoState, {
  FormIoRefProp,
  useFormIoStateProps,
} from "./useFormIoState";
import BaseFormIoComponent from "./BaseFormIoComponent";
import Select, { SelectOption } from "@gemeente-denhaag/select";

type FormIoSelectProps = BasicFormIoComponentSchema &
  useFormIoStateProps & {
    data: any;
    multiple?: boolean;
  };

const FormIoSelect = ({
  formioRef,
  onChange,
  data,
  placeholder,
  disabled,
  label,
  multiple,
  componentKey,
}: FormIoSelectProps) => {
  const [value, setValue] = useFormIoState<string | string[]>({
    formioRef,
    onChange,
  });
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      setValue(
        Array.from(event?.target?.selectedOptions || []).map(
          (option) => option.value,
        ),
      );
    } else {
      setValue(event?.target?.value);
    }
  };

  return (
    <FormField className="denhaag-form-field--flex">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        id={id}
        disabled={disabled}
        multiple={multiple}
        onChange={handleChange}
        value={value || ""}
      >
        <SelectOption key={`${componentKey}-placeholder`}>
          {placeholder}
        </SelectOption>
        {data.values.map((option: any) => (
          <SelectOption key={option.value} value={option.value}>
            {option.label}
          </SelectOption>
        ))}
      </Select>
    </FormField>
  );
};

export default class FormIoSelectWrapper extends BaseFormIoComponent {
  static register: () => void = () => {
    Formio.use({
      components: {
        select: FormIoSelectWrapper,
      },
    });
  };

  static schema(sources: ExtendedComponentSchema = {}) {
    return Components.components.field.schema({
      type: "select",
      hideLabel: true,
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Select",
      group: "basic",
      key: "select",
      schema: FormIoSelectWrapper.schema(),
    };
  }

  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoSelect);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
