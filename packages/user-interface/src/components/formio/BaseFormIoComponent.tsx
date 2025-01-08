import { ReactComponent } from "@formio/react";
import { Container, createRoot, Root } from "react-dom/client";
import { FormIoRefProp } from "./useFormIoState";
import { ComponentType } from "react";

export default class BaseFormIoComponent extends ReactComponent {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected component: any;
  protected data: object;
  protected root?: Root;

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(component: any, options: object, data: object) {
    super(component, options, data);
    this.component = component;
    this.data = data;
    this.component.hideLabel = true;
  }

  attachReact(
    element: Container,
    ref: FormIoRefProp,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // if (element && this.root) {
    //   this.root.unmount();
    // }
  }

  // just a hack fix, TODO: fix on @formio/react
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  triggerRootChange(...args: any) {
    console.log(args);
  }
}
