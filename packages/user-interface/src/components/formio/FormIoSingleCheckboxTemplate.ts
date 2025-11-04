import { Templates } from "@formio/js";

// --- helpers: gebruik die je al hebt, of laat deze staan ---
const escapeAttr = (v: any) =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function serializeAttrs(
  attr: any,
  extras: Record<string, any>,
  omitKeys: string[] = [],
) {
  if (typeof attr === "string") {
    const toAdd = Object.entries(extras)
      .filter(
        ([k, v]) =>
          v !== false &&
          v != null &&
          !omitKeys.includes(k) &&
          !attr.includes(`${k}=`) &&
          !(k === "class" && attr.includes("class=")),
      )
      .map(([k, v]) => (v === true ? k : `${k}="${escapeAttr(v)}"`))
      .join(" ");
    return (attr + (toAdd ? " " + toAdd : "")).trim();
  }
  const merged = { ...(extras || {}), ...(attr || {}) }; // Form.io wint
  omitKeys.forEach((k) => {
    if (k in merged) delete (merged as any)[k];
  });
  return Object.entries(merged)
    .filter(([_, v]) => v !== false && v != null)
    .map(([k, v]) => (v === true ? k : `${k}="${escapeAttr(v)}"`))
    .join(" ");
}

// --- SINGLE CHECKBOX ---
Templates.templates["denhaag"] = Templates.templates["denhaag"] || {};
Templates.templates["denhaag"].checkbox = {
  form: (ctx: any) => {
    const { component } = ctx;

    // id / name die Form.io echt gebruikt
    const fallbackId = ctx.instance?.id || component.key || "checkbox";
    const inputId = ctx.input?.id || fallbackId;
    const name = ctx.input?.name || `data[${component.key}]`;

    const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
    const errorId = `err-${inputId}`;

    // Utrecht classes + invalid
    const wrapperClass = `utrecht-form-field utrecht-form-field--checkbox${hasErrors ? " utrecht-form-field--invalid" : ""}`;
    const baseInputClass = `utrecht-checkbox utrecht-checkbox--html-input utrecht-checkbox--custom utrecht-form-field__input${hasErrors ? " utrecht-checkbox--invalid" : ""}`;

    // attr kan object of string zijn; combineer classes
    const attrObj =
      typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
    const combinedClass = [baseInputClass, attrObj.class]
      .filter(Boolean)
      .join(" ");
    if (attrObj.class) delete attrObj.class;

    // checked: als Form.io het al in attr zet, laten we dat zo; anders bepalen via dataValue
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
      // alleen toevoegen als niet al in attr aanwezig:
      checked: !attrHasChecked && !!ctx.dataValue ? true : undefined,
      value:
        typeof component.value !== "undefined" ? component.value : undefined, // Form.io gebruikt vaak true/false
    };

    const inputAttributes = serializeAttrs(ctx.input?.attr, extras);

    // Labeltekst; bij single checkbox staat deze naast het vakje
    const labelText = ctx.t(component.label || "");

    return `
      <div class="${wrapperClass}" ref="element">
        <p class="nl-paragraph utrecht-form-field__label utrecht-form-field__label--checkbox">
          <label class="utrecht-form-label utrecht-form-label--checkbox" for="${inputId}" ref="label">
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
