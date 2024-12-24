import { Components } from "@formio/react";
import { ExtendedComponentSchema, Formio } from "formiojs";
import { ReactNode } from "react";
import { Container } from "react-dom/client";
import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";
import { FormIoRefProp, useFormIoStateProps } from "./useFormIoState";
import BaseFormIoComponent from "./BaseFormIoComponent";
import Button from "@gemeente-denhaag/button";

type FormIoButtonProps = BasicFormIoComponentSchema & useFormIoStateProps;

const FormIoButton = ({ disabled, label }: FormIoButtonProps): ReactNode => {
  return (
    <Button disabled={disabled} type="submit">
      {label}
    </Button>
  );
};

export default class FormIoButtonWrapper extends BaseFormIoComponent {
  static register: () => void = () => {
    Formio.use({
      components: {
        button: FormIoButtonWrapper,
      },
    });
  };

  static schema(sources: ExtendedComponentSchema = {}) {
    return Components.components.field.schema({
      type: "button",
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Button",
      group: "basic",
      key: "button",
      schema: FormIoButtonWrapper.schema(),
    };
  }

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(component: any, options: object, data: object) {
    super(component, options, data);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoButton);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
