import {
  errorsBlock,
  serializeAttrs,
  wrapperOpen,
} from "./FormIoTemplateUtils";

export const nlPortalSelect = {
  form: (ctx: any) => {
    const { component } = ctx;
    const selectId =
      ctx.input?.id || ctx.instance?.id || component.key || "select";

    const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
    const errorId = `err-${selectId}`;

    const attrObj =
      typeof ctx.input?.attr === "object" ? ctx.input.attr || {} : {};
    const cssClass = [
      "utrecht-select",
      "utrecht-select--html-select",
      "denhaag-select",
      hasErrors && "utrecht-select--invalid",
      attrObj.class,
    ]
      .filter(Boolean)
      .join(" ");

    if (attrObj.class) delete attrObj.class;

    const needsDescribedBy =
      hasErrors &&
      !(
        attrObj["aria-describedby"] ||
        (typeof ctx.input?.attr === "string" &&
          ctx.input.attr.includes("aria-describedby"))
      );

    const hasNameInAttr =
      (typeof ctx.input?.attr === "string" &&
        /(?:^|\s)name=/.test(ctx.input.attr)) ||
      (typeof ctx.input?.attr === "object" && !!ctx.input.attr?.name);

    const extras = {
      id: selectId,
      class: cssClass,
      required: !!component.validate?.required || undefined,
      disabled: !!ctx.disabled || undefined,
      "aria-invalid": hasErrors ? "true" : undefined,
      "aria-describedby": needsDescribedBy ? errorId : undefined,
      multiple: component.multiple || undefined,
      name: hasNameInAttr ? undefined : `data[${component.key}]`,
    };

    const selectAttributes = serializeAttrs(ctx.input?.attr, extras, [
      "type",
      "value",
    ]);

    return `
      ${wrapperOpen(ctx, selectId, "text")}
        <div>
          <select ref="selectContainer" ${selectAttributes}></select>
        </div>
        ${errorsBlock(ctx, selectId)}
      </div>
    `;
  },
};
