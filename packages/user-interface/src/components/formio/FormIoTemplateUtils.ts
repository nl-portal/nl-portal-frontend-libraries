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
  const labelText = escape(ctx.t(ctx.component.label || ""));
  const description = escape(ctx.t(ctx.component.description || ""));

  return `
    <div class="${cls}" ref="element">
      ${ctx.component.label !== false ? `<label for="${escape(inputId)}" class="utrecht-form-label" ref="label">${labelText}</label>` : ""}
      ${description ? `<div class="utrecht-form-field-description">${description}</div>` : ""}
  `;
}

export function errorsBlock(ctx: any, inputId: string) {
  const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
  const errorId = `err-${inputId}`;
  const escapedErrors = hasErrors
    ? ctx.errors.map((e: any) => escape(String(e))).join("<br>")
    : "";
  return `
    <div class="utrecht-form-field-error-message" id="${escape(errorId)}" ref="messageContainer">
      ${escapedErrors}
    </div>
  `;
}

// Replace FormIO choices.js select with html5 native select
export const applyNativeSelectsToForm = (form: any) => {
  const walk = (components: any[]) => {
    for (const c of components) {
      if (c.type === "select") {
        c.widget = "html5";
      }
      if (Array.isArray(c.components)) walk(c.components);
      if (Array.isArray(c.columns))
        c.columns.forEach((col: any) => walk(col.components));
      if (Array.isArray(c.rows))
        c.rows.forEach((row: any) =>
          row.forEach((cell: any) => walk(cell.components || [])),
        );
    }
  };

  walk(form.components || []);
  return form;
};

// Do a recersive conversion of uploaded file objects to just their URLs
export const convertPortalFileUploadResult = (value: any): any => {
  if (Array.isArray(value)) {
    if (value.length > 0 && isUploadObject(value[0])) {
      return value
        .map((v) => (isUploadObject(v) ? v.url : undefined))
        .filter((v): v is string => Boolean(v));
    }

    return value.map((v) => convertPortalFileUploadResult(v));
  }

  if (value !== null && typeof value === "object") {
    const result: { [key: string]: any } = {};
    for (const key of Object.keys(value)) {
      const nested = (value as any)[key];
      result[key] = convertPortalFileUploadResult(nested);
    }
    return result;
  }

  return value;
};

type UploadObject = {
  url: string;
  name: string;
  size: number;
};

const isUploadObject = (obj: any): obj is UploadObject => {
  return (
    obj &&
    typeof obj === "object" &&
    "url" in obj &&
    "name" in obj &&
    "size" in obj
  );
};
