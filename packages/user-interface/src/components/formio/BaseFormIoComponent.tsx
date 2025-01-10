import { ReactComponent } from "@formio/react";
import { Container, createRoot, Root } from "react-dom/client";
import { FormIoRefProp } from "./useFormIoState";
import { ComponentType } from "react";

export default class BaseFormIoComponent extends ReactComponent {
  protected component: any;
  protected data: object;
  protected root?: Root;

  constructor(component: any, options: object, data: object) {
    super(component, options, data);
    this.component = component;
    this.data = data;
    this.component.hideLabel = true;
  }

  attachReact(
    element: Container,
    ref: FormIoRefProp,
    ComponentType?: ComponentType<any>,
  ) {
    super.attachReact(element, ref);
    this.root = createRoot(element);
    const { key, ...rest } = this.component;
    ComponentType &&
      this.root.render(
        <ComponentType
          key={key}
          componentKey={key}
          formioRef={ref}
          onChange={this.updateValue}
          {...rest}
        />,
      );
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }

  // just a hack fix, TODO: fix on @formio/react
  triggerRootChange(...args: any) {
    console.log(args);
  }
}
