import { Formio } from "@formio/js";

const FieldComponent: any = (Formio as any).Components.components.field;

export default class FormIoDatePicker extends FieldComponent {
  static schema(...extend: any[]) {
    return FieldComponent.schema(
      {
        type: "datetime",
        label: "Date",
        key: "datetime",
        input: true,
      },
      ...extend,
    );
  }

  static register: () => void = () => {
    (Formio as any).Components.addComponent("datetime", FormIoDatePicker);
  };

  static get builderInfo() {
    return {
      title: "Date",
      group: "advanced",
      icon: "calendar",
      weight: 70,
      schema: FormIoDatePicker.schema(),
    };
  }

  render(): string {
    const value: string = this.dataValue ?? "";
    const input: any = {
      type: "date",
      ref: "input",
      id: `${this.id}-${this.component.key}`,
      name: `data[${this.component.key}]`,
      attr: {
        value,
        ...(this.component.disabled ? { disabled: "disabled" } : {}),
        ...(this.component.readOnly ? { readonly: "readonly" } : {}),
        ...(this.component.required ? { required: "required" } : {}),
        ...(typeof this.elementInfo?.className === "string" &&
        this.elementInfo.className.trim()
          ? { class: this.elementInfo.className }
          : {}),
      },
    };

    const inputHtml = this.renderTemplate("input", { input });
    return super.render(inputHtml);
  }

  isEmpty(value: any = this.dataValue): boolean {
    return value === null || value === undefined || value === "";
  }

  setErrorClasses(elements: any, dirty: boolean, hasErrors: boolean): void {
    const normalized = Array.isArray(elements)
      ? elements
      : elements
        ? [elements]
        : [];

    return super.setErrorClasses(normalized, dirty, hasErrors);
  }

  attach(element: Element): any {
    const attached = super.attach(element);
    this.loadRefs(element, {
      input: "single",
      messageContainer: "single",
    });

    const input = this.refs?.input as HTMLInputElement | undefined;
    if (input) {
      this.addEventListener(input, "input", () =>
        this.updateValue(null, { modified: true }),
      );
      this.addEventListener(input, "change", () =>
        this.updateValue(null, { modified: true }),
      );
      this.addEventListener(input, "blur", () =>
        this.updateValue(null, { modified: true }),
      );
    }
    return attached;
  }

  validateRequired(setting: boolean, value: any): boolean {
    const input = this.refs?.input as HTMLInputElement | undefined;

    if (input?.validity?.badInput) {
      return false;
    }

    return super.validateRequired(setting, value);
  }

  getErrorMessage(type: string): string {
    console.log("getErrorMessage", type);
    const input = this.refs?.input as HTMLInputElement | undefined;
    if (type === "required" && input?.validity?.badInput) {
      return `${this.component.label || "This field"} has an invalid date`;
    }
    return super.getErrorMessage(type);
  }

  getValue(): string {
    const input = this.refs?.input as HTMLInputElement | undefined;
    return input?.value ?? "";
  }

  setValue(value: unknown, flags: Record<string, unknown> = {}): any {
    const normalized =
      typeof value === "string" ? value : value != null ? String(value) : "";

    const input = this.refs?.input as HTMLInputElement | undefined;

    if (input && input.value !== normalized) {
      input.value = normalized;
    }

    return super.setValue(normalized, flags);
  }

  updateValue(value?: unknown, flags?: Record<string, unknown>): any {
    const newValue = value ?? this.getValue();
    return super.updateValue(newValue, flags);
  }
}
