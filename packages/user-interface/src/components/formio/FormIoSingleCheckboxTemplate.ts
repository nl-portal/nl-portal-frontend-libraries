import { serializeAttrs } from "./FormIoTemplateUtils";

export const nlPortalSingleCheckbox = {
  form: (ctx: any) => {
    const { component } = ctx;

    const baseId = ctx.instance?.id || component.key || "checkbox";
    const inputId = ctx.input?.id || `${baseId}-input`;

    const name = ctx.input?.name || `data[${component.key}]`;

    const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
    const errorId = `err-${inputId}`;

    const wrapperClass = `utrecht-form-field utrecht-form-field--checkbox${hasErrors ? " utrecht-form-field--invalid" : ""}`;
    const baseInputClass = `utrecht-checkbox utrecht-checkbox--html-input utrecht-checkbox--custom utrecht-form-field__input${hasErrors ? " utrecht-checkbox--invalid" : ""}`;

    const attrObj =
      typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
    const combinedClass = [baseInputClass, attrObj.class]
      .filter(Boolean)
      .join(" ");
    if (attrObj.class) delete attrObj.class;

    const attrHasChecked =
      (typeof ctx.input?.attr === "string" &&
        /\bchecked(\s|=|>)/.test(ctx.input.attr)) ||
      (typeof ctx.input?.attr === "object" && !!ctx.input.attr.checked);

    const extras = {
      id: inputId,
      name,
      type: "checkbox",
      required: !!component.validate?.required || undefined,
      disabled: !!ctx.disabled || undefined,
      class: combinedClass,
      "aria-describedby": hasErrors ? errorId : undefined,
      checked: !attrHasChecked && !!ctx.dataValue ? true : undefined,
      value:
        typeof component.value !== "undefined" ? component.value : undefined,
    };

    const inputAttributes = serializeAttrs(ctx.input?.attr, extras);

    const labelText = ctx.t(component.label || "");

    return `
      <div class="${wrapperClass}" ref="element">
        <p class="nl-paragraph utrecht-form-field__label utrecht-form-field__label--checkbox">
          <label class="utrecht-form-label utrecht-form-label--checkbox" ref="label">
            <input ref="input" ${inputAttributes} />
            ${labelText}
          </label>
        </p>
        <div class="utrecht-form-field-error-message" id="${errorId}" ref="messageContainer">
          ${hasErrors ? ctx.errors.join("<br>") : ""}
        </div>
      </div>
    `;
  },
};
