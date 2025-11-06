import { escape } from "lodash-es";
import { errorsBlock, serializeAttrs } from "./FormIoTemplateUtils";

function wrapperOpen(ctx: any, inputId: string, baseModifier = "text") {
  const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
  const wrapperClass = `utrecht-form-field utrecht-form-field--${baseModifier}${hasErrors ? " utrecht-form-field--invalid" : ""}`;
  const labelText = ctx.t(ctx.component.label || "");
  const description = ctx.t(ctx.component.description || "");

  return `
    <div class="${wrapperClass}" ref="element">
      ${ctx.component.label !== false ? `<label for="${inputId}" class="utrecht-form-label" ref="label">${labelText}</label>` : ""}
      ${description ? `<div class="utrecht-form-field-description">${description}</div>` : ""}
  `;
}

function renderInputElement(ctx: any) {
  const fallbackId = ctx.instance?.id || ctx.component.key || "textfield";
  const inputId = ctx.input?.id || fallbackId;

  const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
  const baseClass = `utrecht-textbox utrecht-textbox--html-input${hasErrors ? " utrecht-textbox--invalid" : ""}`;

  const attrObj =
    typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
  const combinedClass = [baseClass, attrObj.class].filter(Boolean).join(" ");
  if (attrObj.class) delete attrObj.class;

  const placeholder = ctx.t(ctx.component.placeholder || "");
  const errorId = `err-${inputId}`;
  const needsDescribedBy =
    hasErrors &&
    !(
      (typeof ctx.input?.attr === "string" &&
        ctx.input.attr.includes("aria-describedby")) ||
      (typeof ctx.input?.attr === "object" &&
        ctx.input.attr?.["aria-describedby"])
    );

  const extras = {
    id: inputId,
    name: ctx.input?.name || `data[${ctx.component.key}]`,
    type: ctx.input?.type || ctx.component.inputType || "text",
    dir: "auto",
    placeholder,
    required: !!ctx.component.validate?.required || undefined,
    disabled: !!ctx.disabled || undefined,
    class: combinedClass,
    "aria-describedby": needsDescribedBy ? errorId : undefined,
  };

  const inputAttributes = serializeAttrs(ctx.input?.attr, extras);

  return `
    ${wrapperOpen(ctx, inputId, "text")}
      <label class="pra-textbox" for="${inputId}">
        <input ref="input" ${inputAttributes} />
      </label>
      ${errorsBlock(ctx, inputId)}
    </div>
  `;
}

function renderTextareaElement(ctx: any) {
  const fallbackId = ctx.instance?.id || ctx.component.key || "textarea";
  const inputId = ctx.input?.id || fallbackId;

  const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
  const baseClass = `utrecht-textbox utrecht-textbox--html-textarea${hasErrors ? " utrecht-textbox--invalid" : ""}`;

  const attrObj =
    typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
  const combinedClass = [baseClass, attrObj.class].filter(Boolean).join(" ");
  if (attrObj.class) delete attrObj.class;

  // waarde uit attr (object of string) -> content van <textarea>
  const valueFromAttr =
    typeof ctx.input?.attr === "object"
      ? (ctx.input.attr?.value ?? "")
      : typeof ctx.input?.attr === "string"
        ? (ctx.input.attr.match(/\bvalue="([^"]*)"/)?.[1] ?? "")
        : "";

  const placeholder = ctx.t(ctx.component.placeholder || "");
  const errorId = `err-${inputId}`;
  const needsDescribedBy =
    hasErrors &&
    !(
      (typeof ctx.input?.attr === "string" &&
        ctx.input.attr.includes("aria-describedby")) ||
      (typeof ctx.input?.attr === "object" &&
        ctx.input.attr?.["aria-describedby"])
    );

  const extras = {
    id: inputId,
    name: ctx.input?.name || `data[${ctx.component.key}]`,
    dir: "auto",
    placeholder,
    required: !!ctx.component.validate?.required || undefined,
    disabled: !!ctx.disabled || undefined,
    class: combinedClass,
    "aria-describedby": needsDescribedBy ? errorId : undefined,
    rows: ctx.component.rows || undefined,
    cols: ctx.component.cols || undefined,
  };

  const textareaAttributes = serializeAttrs(ctx.input?.attr, extras, ["value"]);

  return `
    ${wrapperOpen(ctx, inputId, "text")}
      <label class="pra-textbox" for="${inputId}">
        <textarea ref="input" ${textareaAttributes}>${escape(String(valueFromAttr ?? ""))}</textarea>
      </label>
      ${errorsBlock(ctx, inputId)}
    </div>
  `;
}

export const nlPortalInput = {
  form: (ctx: any) =>
    ctx.component?.type === "textarea"
      ? renderTextareaElement(ctx)
      : renderInputElement(ctx),
};
