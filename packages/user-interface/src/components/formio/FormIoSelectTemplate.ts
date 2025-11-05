import { serializeAttrs } from "./FormIoTemplateUtils";

export const nlPortalSelect = {
  form: (ctx: any) => {
    const { component } = ctx;
    const selectId =
      ctx.input?.id || ctx.instance?.id || component.key || "select";

    const labelText = ctx.t(component.label || "Options");
    const description = ctx.t(component.description || "");

    const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
    const errorId = `err-${selectId}`;

    const wrapperClass =
      `utrecht-form-field utrecht-form-field--text denhaag-form-field--flex` +
      (hasErrors ? ` utrecht-form-field--invalid` : ``);

    const selectBaseClass =
      `utrecht-select utrecht-select--html-select denhaag-select` +
      (hasErrors ? ` utrecht-select--invalid` : ``);

    const attrObj =
      typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
    const cssClass = [selectBaseClass, attrObj.class].filter(Boolean).join(" ");
    if (attrObj.class) delete attrObj.class;

    const needsDescribedBy =
      hasErrors &&
      !(
        (typeof ctx.input?.attr === "string" &&
          ctx.input.attr.includes("aria-describedby")) ||
        (typeof ctx.input?.attr === "object" &&
          ctx.input.attr?.["aria-describedby"])
      );

    const hasNameInAttr =
      (typeof ctx.input?.attr === "string" &&
        /(?:^|\s)name=/.test(ctx.input.attr)) ||
      (typeof ctx.input?.attr === "object" && !!ctx.input.attr?.name);

    const extras = {
      id: selectId,
      class: cssClass,
      required: !!component.validate?.required || undefined,
      disabled: !!ctx.disabled || undefined, // disabled attribuut
      "aria-invalid": hasErrors ? "true" : undefined, // 3) a11y
      "aria-describedby": needsDescribedBy ? errorId : undefined,
      multiple: component.multiple || undefined,
      name: hasNameInAttr ? undefined : `data[${component.key}]`,
    };

    const selectAttributes = serializeAttrs(ctx.input?.attr, extras, [
      "type",
      "value",
    ]);

    return `
      <div class="${wrapperClass}" ref="element">
        ${component.label !== false ? `<label class="utrecht-form-label" for="${selectId}" ref="label">${labelText}</label>` : ""}
        ${description ? `<div class="utrecht-form-field-description">${description}</div>` : ""}

        <div>
          <!-- html5 pad van Form.io verwacht ref="selectContainer" -->
          <select ref="selectContainer" ${selectAttributes}></select>
        </div>

        <div class="utrecht-form-field-error-message" id="${errorId}" ref="messageContainer">
          ${hasErrors ? ctx.errors.join("<br>") : ""}
        </div>
      </div>
    `;
  },
};
