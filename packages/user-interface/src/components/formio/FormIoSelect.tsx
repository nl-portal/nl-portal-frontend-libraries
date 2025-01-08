import { Components } from "@formio/react";
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
import Select, { SelectOption } from "@gemeente-denhaag/select";

type FormIoSelectProps = BasicFormIoComponentSchema &
  useFormIoStateProps & {
    data: any;
  };
const FormIoSelect = ({
  formioRef,
  onChange,
  data,
  placeholder,
  disabled,
  label,
  componentKey,
}: FormIoSelectProps): ReactNode => {
  const [value, setValue] = useFormIoState({ formioRef, onChange });
  const id = useId();
  return (
    <FormField className="denhaag-form-field--flex">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        id={id}
        disabled={disabled}
        onChange={(ev) => setValue(ev?.target?.value)}
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

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
