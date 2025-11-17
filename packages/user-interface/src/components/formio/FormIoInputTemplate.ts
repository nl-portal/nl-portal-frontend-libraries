import { escape } from "lodash-es";
import {
  errorsBlock,
  serializeAttrs,
  wrapperOpen,
} from "./FormIoTemplateUtils";

const renderInputElement = (ctx: any) => {
  const key = escape(ctx.component.key || "textfield");
  const fallbackId = ctx.instance?.id || key;
  const inputId = escape(ctx.input?.id || fallbackId);

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
    name: ctx.input?.name || `data[${key}]`,
    type: ctx.input?.type || ctx.component.inputType || "text",
    dir: "auto",
    placeholder,
    required: !!ctx.component.validate?.required || undefined,
    disabled: !!ctx.disabled || undefined,
    class: combinedClass,
    "aria-describedby": needsDescribedBy ? errorId : undefined,
  };

  const inputAttributes = serializeAttrs(ctx.input?.attr, extras);
  const ref = ctx.input?.ref || "input";

  if (ctx.component?.type === "day") {
    return `<input ref="${ref}" ${inputAttributes} />`;
  }

  return `
    ${wrapperOpen(ctx, inputId, "text")}
      <label class="pra-textbox" for="${inputId}">
        <input ref="${ref}" ${inputAttributes} />
      </label>
      ${errorsBlock(ctx, inputId)}
    </div>
  `;
};

const renderTextareaElement = (ctx: any) => {
  const key = escape(ctx.component.key || "textarea");
  const fallbackId = ctx.instance?.id || key;
  const inputId = escape(ctx.input?.id || fallbackId);

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
    name: ctx.input?.name || `data[${key}]`,
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
};

export const nlPortalInput = {
  form: (ctx: any) =>
    ctx.component?.type === "textarea"
      ? renderTextareaElement(ctx)
      : renderInputElement(ctx),
};
