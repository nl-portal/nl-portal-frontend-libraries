import { Components } from "@formio/react";
import { ExtendedComponentSchema, Formio } from "formiojs";
import { Container } from "react-dom/client";
import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";
import { FormIoRefProp, useFormIoStateProps } from "./useFormIoState";
import BaseFormIoComponent from "./BaseFormIoComponent";
import Button from "@gemeente-denhaag/button";

type FormIoButtonProps = BasicFormIoComponentSchema &
  useFormIoStateProps & {
    onClick: (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>,
    ) => void;
  };

const FormIoButton = ({ disabled, label, onClick }: FormIoButtonProps) => {
  return (
    <Button disabled={disabled} onClick={onClick}>
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
      action: "submit",
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

  constructor(component: any, options: object, data: object) {
    const extraProps = {
      onClick: (
        event:
          | React.MouseEvent<HTMLButtonElement>
          | React.TouchEvent<HTMLButtonElement>,
      ) => this.onClick(event),
    };
    super({ ...component, ...extraProps }, options, data);
    console.log("action", this.component.action);
    this.onClick = this.onClick.bind(this);
  }

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FormIoButton);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }

  onClick(
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) {
    event.preventDefault();
    console.log("action2", this.component.action);

    // The default "action" can be "submit", "event", "reset", "cancel", etc.
    // The "action" property is stored in this.component.action
    switch (this.component.action) {
      case "submit":
        // triggers a form submission

        (this as any).emit("submitButton");
        break;
      case "event":
        // triggers a custom event
        (this as any).emit("customEvent", {
          type: this.component.event,
          component: this.component,
          data: this.data,
        });
        break;
      case "reset":
        (this as any).emit("resetForm");
        break;
      case "cancel":
        (this as any).emit("cancel");
        break;
      default:
        // Custom actions or fallback
        console.log("Unhandled button action:", this.component.action);
        (this as any).emit("submitButton"); // appearantly, the button in the Den Haag forms don't have an action (which should be mandatory)
        break;
    }
  }
}
