import { escape } from "lodash-es";
import {
  errorsBlock,
  serializeAttrs,
  wrapperOpen,
} from "./FormIoTemplateUtils";

export const nlPortalAddress = {
  form: (ctx: any) => {
    const { component } = ctx;

    const key = escape(component.key || "address");
    const fallbackId = ctx.instance?.id || key;
    const inputId = escape(fallbackId);

    const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;

    const baseClass =
      "utrecht-textbox utrecht-textbox--html-input" +
      (hasErrors ? " utrecht-textbox--invalid" : "");

    const attrObj =
      typeof ctx.inputAttributes === "object" ? ctx.inputAttributes || {} : {};

    const combinedClass = [baseClass, attrObj.class].filter(Boolean).join(" ");
    if (attrObj.class) {
      delete (attrObj as any).class;
    }

    const errorId = `err-${inputId}`;

    const existingDescribedBy =
      typeof ctx.inputAttributes === "string"
        ? ctx.inputAttributes.includes("aria-describedby")
        : typeof ctx.inputAttributes === "object"
          ? (ctx.inputAttributes as any)["aria-describedby"]
          : undefined;

    const needsDescribedBy = hasErrors && !existingDescribedBy;

    const extras = {
      id: inputId,
      name:
        (attrObj as any).name ||
        (ctx.inputAttributes && (ctx.inputAttributes as any).name) ||
        `data[${key}]`,
      type:
        (attrObj as any).type ||
        (ctx.inputAttributes && (ctx.inputAttributes as any).type) ||
        "text",
      dir: "auto",
      class: combinedClass,
      disabled: ctx.disabled ? true : undefined,
      "aria-describedby": needsDescribedBy
        ? errorId
        : (attrObj as any)["aria-describedby"],
    };

    const inputAttributes = serializeAttrs(ctx.inputAttributes, extras);
    const refSearch = (ctx.ref && ctx.ref.searchInput) || "searchInput";
    const refRemove = (ctx.ref && ctx.ref.removeValueIcon) || "removeValueIcon";
    const refModeSwitcher = (ctx.ref && ctx.ref.modeSwitcher) || "modeSwitcher";

    const displayValue = escape(String(ctx.displayValue ?? ""));
    const autocompleteLabel = escape(ctx.t("autocomplete"));

    const autocompleteHtml =
      ctx.mode && ctx.mode.autocomplete
        ? `
        <div class="address-autocomplete-container">
          <input
            ref="${refSearch}"
            ${inputAttributes}
            value="${displayValue}"
            autocomplete="off"
            aria-label="${autocompleteLabel}"
          />
          ${
            !component.disableClearIcon
              ? `<i
                  class="address-autocomplete-remove-value-icon fa fa-times bi bi-x"
                  tabindex="${(ctx.inputAttributes && (ctx.inputAttributes as any).tabindex) ?? 0}"
                  ref="${refRemove}"
                ></i>`
              : ""
          }
        </div>
      `
        : "";

    const manualSwitcherHtml =
      ctx.self && ctx.self.manualModeEnabled
        ? `
        <div class="form-check checkbox">
          <label class="form-check-label">
            <input
              ref="${refModeSwitcher}"
              type="checkbox"
              class="form-check-input"
              tabindex="${(ctx.inputAttributes && (ctx.inputAttributes as any).tabindex) ?? 0}"
              ${ctx.mode && ctx.mode.manual ? "checked" : ""}
              ${ctx.disabled ? "disabled" : ""}
            />
            <span>${escape(
              ctx.t(
                component.switchToManualModeLabel ||
                  "Can't find address? Switch to manual mode.",
              ),
            )}</span>
          </label>
        </div>
      `
        : "";

    const manualChildrenHtml =
      ctx.self && ctx.self.manualMode
        ? `
        <div ref="${ctx.nestedKey}">
          ${ctx.children || ""}
        </div>
      `
        : "";

    return `
      ${wrapperOpen(ctx, inputId, "text")}
        <div class="pra-textbox">
          ${autocompleteHtml}
        </div>
        ${manualSwitcherHtml}
        ${manualChildrenHtml}
        ${errorsBlock(ctx, inputId)}
      </div>
    `;
  },
};
