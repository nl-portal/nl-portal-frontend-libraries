import { ReactComponent } from "@formio/react";
import { Container, createRoot, Root } from "react-dom/client";
import { FormIoRefProp } from "./useFormIoState";
import { ComponentType } from "react";
import { Formio } from "@formio/js";

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

  static register(name: string, component: any) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Formio.use({
      components: {
        [name]: component,
      },
    });
  }

  attachReact(
    element: Container,
    ref: FormIoRefProp,
    ComponentType?: ComponentType<any>,
  ) {
    this.root = createRoot(element);
    const { key, ...rest } = this.component;
    const scopedName = `${(this as any).options?.name ?? "data"}[${key}]`;

    if (ComponentType) {
      this.root.render(
        <ComponentType
          key={key}
          componentKey={key}
          formioRef={ref}
          onChange={(val: any) => {
            (this as any).updateValue(val);
            (this as any).checkValidity(this.data, true);
          }}
          initialValue={this.dataValue}
          name={scopedName}
          {...rest}
        />,
      );
    }
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  // @ts-expect-error: TS6133
  detachReact(element: Container) {}
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
