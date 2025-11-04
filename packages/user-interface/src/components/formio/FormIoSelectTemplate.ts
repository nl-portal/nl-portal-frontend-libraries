import { Templates } from "@formio/js";

/* helpers (laat weg als je ze al hebt) */
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
  const merged = { ...(extras || {}), ...(attr || {}) };
  omitKeys.forEach((k) => {
    if (k in merged) delete (merged as any)[k];
  });
  return Object.entries(merged)
    .filter(([_, v]) => v !== false && v != null)
    .map(([k, v]) => (v === true ? k : `${k}="${escapeAttr(v)}"`))
    .join(" ");
}

Templates.templates["denhaag"] = Templates.templates["denhaag"] || {};
Templates.templates["denhaag"].select = {
  form: (ctx: any) => {
    const { component } = ctx;

    const fallbackId = ctx.instance?.id || component.key || "select";
    const selectId = ctx.input?.id || fallbackId;

    const labelText = ctx.t(component.label || "Options");
    const description = ctx.t(component.description || "");
    const placeholder = ctx.t(component.placeholder || "Select an option");

    const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
    const errorId = `err-${selectId}`;

    const wrapperClass = `utrecht-form-field utrecht-form-field--text denhaag-form-field--flex${hasErrors ? " utrecht-form-field--invalid" : ""}`;
    const selectBaseClass = `utrecht-select utrecht-select--html-select denhaag-select`;

    const attrObj =
      typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
    const combinedClass = [selectBaseClass, attrObj.class]
      .filter(Boolean)
      .join(" ");
    if (attrObj.class) delete attrObj.class;

    const needsDescribedBy =
      hasErrors &&
      !(
        (typeof ctx.input?.attr === "string" &&
          ctx.input.attr.includes("aria-describedby")) ||
        (typeof ctx.input?.attr === "object" &&
          ctx.input.attr?.["aria-describedby"])
      );

    // Laat Form.io attrs leidend zijn; forceer géén eigen 'name'
    const extras = {
      id: selectId,
      class: combinedClass,
      required: !!component.validate?.required || undefined,
      disabled: !!ctx.disabled || undefined,
      "aria-describedby": needsDescribedBy ? errorId : undefined,
      multiple: component.multiple || undefined,
      // name: undefined  // bewust niet zetten; komt uit ctx.input.attr
    };

    // Heel belangrijk: geen 'value' of 'type' op <select>
    const selectAttributes = serializeAttrs(ctx.input?.attr, extras, [
      "value",
      "type",
    ]);

    const options =
      Array.isArray((ctx as any).selectOptions) &&
      (ctx as any).selectOptions.length
        ? (ctx as any).selectOptions.map((o: any) => ({
            value: o.value,
            label: ctx.t(o.label ?? o.value ?? ""),
            selected: !!o.selected,
          }))
        : (component.data?.values || component.values || []).map((o: any) => ({
            value: o.value ?? o.label ?? "",
            label: ctx.t(o.label ?? o.value ?? ""),
            selected: Array.isArray(ctx.dataValue)
              ? ctx.dataValue.includes(o.value)
              : ctx.dataValue === o.value,
          }));

    const showPlaceholder =
      !component.multiple &&
      (component.placeholder ||
        component.allowCalculatedEmptyValue ||
        !component.validate?.required);

    const placeholderOption = showPlaceholder
      ? `<option value="" class="utrecht-select__option"${options.some((o: any) => o.selected) ? "" : " selected"}>${placeholder}</option>`
      : "";

    const optionsHtml = options
      .map(
        (opt: any) => `
      <option class="utrecht-select__option"
              value="${escapeAttr(opt.value)}"
              ${opt.selected ? "selected" : ""}>
        ${escapeAttr(opt.label)}
      </option>
    `,
      )
      .join("\n");

    return `
      <div class="${wrapperClass}" ref="element">
        ${
          component.label !== false
            ? `<label class="utrecht-form-label" for="${selectId}" ref="label">${labelText}</label>`
            : ""
        }

        ${description ? `<div class="utrecht-form-field-description">${description}</div>` : ""}

        <!-- v5 kijkt ook naar deze container -->
        <div ref="selectContainer">
          <!-- v5 verwacht PRECIES ref="select" hier -->
          <select ref="select" ${selectAttributes}>
            ${placeholderOption}
            ${optionsHtml}
          </select>
        </div>

        <div class="utrecht-form-field-error-message" id="${errorId}" ref="messageContainer">
          ${hasErrors ? ctx.errors.join("<br>") : ""}
        </div>
      </div>
    `;
  },
};
