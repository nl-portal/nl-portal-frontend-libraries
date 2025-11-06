import { escape } from "lodash-es";

export function serializeAttrs(
  attr: any,
  extras: Record<string, any>,
  omitKeys: string[] = [],
): string {
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
      .map(([k, v]) => (v === true ? k : `${k}="${escape(String(v ?? ""))}"`))
      .join(" ");
    return (attr + (toAdd ? " " + toAdd : "")).trim();
  }

  const merged = { ...(extras || {}), ...(attr || {}) };
  omitKeys.forEach((k) => {
    if (k in merged) delete (merged as any)[k];
  });

  return Object.entries(merged)
    .filter(([, v]) => v !== false && v != null)
    .map(([k, v]) => (v === true ? k : `${k}="${escape(String(v ?? ""))}"`))
    .join(" ");
}

export function wrapperOpen(ctx: any, inputId: string, baseModifier = "text") {
  const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
  const cls =
    `utrecht-form-field utrecht-form-field--${baseModifier}` +
    (hasErrors ? " utrecht-form-field--invalid" : "");
  const labelText = ctx.t(ctx.component.label || "");
  const description = ctx.t(ctx.component.description || "");

  return `
    <div class="${cls}" ref="element">
      ${ctx.component.label !== false ? `<label for="${inputId}" class="utrecht-form-label" ref="label">${labelText}</label>` : ""}
      ${description ? `<div class="utrecht-form-field-description">${description}</div>` : ""}
  `;
}

export function errorsBlock(ctx: any, inputId: string) {
  const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
  const errorId = `err-${inputId}`;
  return `
    <div class="utrecht-form-field-error-message" id="${errorId}" ref="messageContainer">
      ${hasErrors ? ctx.errors.join("<br>") : ""}
    </div>
  `;
}
