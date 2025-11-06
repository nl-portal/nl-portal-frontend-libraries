import { escape } from "lodash-es";
import { errorsBlock } from "./FormIoTemplateUtils";

export const nlPortalMultipleCheckboxes = {
  form: (ctx: any) => {
    const { component } = ctx;
    const idBase = escape(ctx.instance?.id || component.key || "selectboxes");
    const legend = escape(ctx.t(component.label || ""));
    const description = escape(ctx.t(component.description || ""));
    const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
    const fieldsetClass = `utrecht-form-fieldset${hasErrors ? " utrecht-form-fieldset--invalid" : ""}`;

    const isChecked = (value: any) => {
      const v = ctx.dataValue ? ctx.dataValue[value] : undefined;
      return v === true || v === "true";
    };

    const optionsHtml = (component.values || [])
      .map((opt: any, i: number) => {
        const valueKey = String(opt.value ?? opt.label ?? "");
        const text = escape(ctx.t(opt.label ?? opt.value ?? ""));
        const inputId = `${idBase}-${i}`;

        // name-conventie van Form.io selectboxes: key[value]
        const name = escape(`${component.key}[${valueKey}]`);

        const checked = isChecked(valueKey) ? "checked" : "";
        const disabled = ctx.disabled ? "disabled" : "";

        return `
        <div class="utrecht-form-field utrecht-form-field--checkbox">
          <p class="nl-paragraph utrecht-form-field__label utrecht-form-field__label--checkbox">
            <label for="${inputId}" class="utrecht-form-label utrecht-form-label--checkbox">
              <input
                ref="input"
                id="${inputId}"
                class="utrecht-checkbox utrecht-checkbox--html-input utrecht-checkbox--custom utrecht-form-field__input"
                type="checkbox"
                name="${name}"
                value="true"
                ${checked}
                ${disabled}
                aria-describedby="${description ? `${idBase}-description` : ""}"
              />
              ${text}
            </label>
          </p>
        </div>
      `;
      })
      .join("\n");

    return `
      <div class="${fieldsetClass}" ref="element">
        <fieldset
          ref="fieldset"
          class="utrecht-form-fieldset__fieldset utrecht-form-fieldset--html-fieldset"
          ${description ? `aria-describedby="${idBase}-description"` : ""}
        >
          ${
            legend
              ? `<legend class="utrecht-form-fieldset__legend utrecht-form-fieldset__legend--html-legend">${legend}</legend>`
              : ""
          }

          ${
            description
              ? `<div id="${idBase}-description" class="utrecht-form-field-description utrecht-form-field-description--distanced">
                 ${description}
               </div>`
              : ""
          }

          ${optionsHtml}

          ${errorsBlock(ctx, idBase)}
        </fieldset>
      </div>
    `;
  },
};
