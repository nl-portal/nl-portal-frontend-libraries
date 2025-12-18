import { Formio } from "@formio/js";

const toTwoDigits = (n: number) => String(n).padStart(2, "0");

const todayLocalDateString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${toTwoDigits(now.getMonth() + 1)}-${toTwoDigits(now.getDate())}`;
};

const formatOffsetForDate = (d: Date) => {
  const offMin = -d.getTimezoneOffset();
  const sign = offMin >= 0 ? "+" : "-";
  const abs = Math.abs(offMin);
  const hh = toTwoDigits(Math.floor(abs / 60));
  const mm = toTwoDigits(abs % 60);
  return `${sign}${hh}:${mm}`;
};

const toLocalDateTimeWithOffset = (datePart: string, timePart: string) => {
  const [hh = "00", mi = "00", ss = "00"] = (timePart ?? "").split(":");
  const local = new Date(`${datePart}T${hh}:${mi}:${ss}`);

  const outTime = `${toTwoDigits(local.getHours())}:${toTwoDigits(local.getMinutes())}:${toTwoDigits(local.getSeconds())}`;
  const offset = formatOffsetForDate(local);

  return `${datePart}T${outTime}${offset}`;
};

const parseStoredValue = (value: string) => {
  if (!value || value.length < 16) return { date: "", timeHHmm: "" };
  return { date: value.slice(0, 10), timeHHmm: value.slice(11, 16) };
};

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

  private get enableDate() {
    return this.component?.enableDate !== false;
  }
  private get enableTime() {
    return this.component?.enableTime !== false;
  }
  private get mode(): "datetime" | "date" | "time" {
    if (this.enableDate && this.enableTime) return "datetime";
    if (this.enableDate) return "date";
    if (this.enableTime) return "time";
    return "date";
  }

  render(): string {
    const stored: string = this.dataValue ?? "";
    const { date, timeHHmm } = parseStoredValue(stored);

    const inputType =
      this.mode === "datetime"
        ? "datetime-local"
        : this.mode === "time"
          ? "time"
          : "date";

    const displayValue =
      inputType === "datetime-local"
        ? date && timeHHmm
          ? `${date}T${timeHHmm}`
          : ""
        : inputType === "time"
          ? timeHHmm || ""
          : date || "";

    const input: any = {
      type: inputType,
      ref: "input",
      id: `${this.id}-${this.component.key}`,
      name: `data[${this.component.key}]`,
      attr: {
        value: displayValue,
        ...(inputType === "time" ? { step: 60 } : {}),
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
      const onChange = () => this.updateValue(null, { modified: true });
      this.addEventListener(input, "input", onChange);
      this.addEventListener(input, "change", onChange);
      this.addEventListener(input, "blur", onChange);
    }
    return attached;
  }

  validateRequired(setting: boolean, value: any): boolean {
    const input = this.refs?.input as HTMLInputElement | undefined;
    if (input?.validity?.badInput) return false;
    return super.validateRequired(setting, value);
  }

  getErrorMessage(type: string): string {
    const input = this.refs?.input as HTMLInputElement | undefined;
    if (type === "required" && input?.validity?.badInput) {
      return `${this.component.label || "This field"} has an invalid date/time`;
    }
    return super.getErrorMessage(type);
  }

  getValue(): string {
    const input = this.refs?.input as HTMLInputElement | undefined;
    const inputValue = input?.value ?? "";

    if (!inputValue) return "";

    if (this.mode === "datetime") {
      const date = inputValue.slice(0, 10);
      const time = inputValue.slice(11);
      return toLocalDateTimeWithOffset(date, time);
    }

    if (this.mode === "date") {
      return toLocalDateTimeWithOffset(inputValue, "00:00:00");
    }

    return toLocalDateTimeWithOffset(todayLocalDateString(), inputValue);
  }

  setValue(value: unknown, flags: Record<string, unknown> = {}): any {
    const stored =
      typeof value === "string" ? value : value != null ? String(value) : "";

    const { date, timeHHmm } = parseStoredValue(stored);
    const input = this.refs?.input as HTMLInputElement | undefined;

    if (input) {
      const desired =
        this.mode === "datetime"
          ? date && timeHHmm
            ? `${date}T${timeHHmm}`
            : ""
          : this.mode === "time"
            ? timeHHmm || ""
            : date || "";

      if (input.value !== desired) {
        input.value = desired;
      }
    }

    return super.setValue(stored, flags);
  }

  updateValue(value?: unknown, flags?: Record<string, unknown>): any {
    const newValue = value ?? this.getValue();
    return super.updateValue(newValue, flags);
  }
}
