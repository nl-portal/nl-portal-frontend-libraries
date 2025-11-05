export const nlPortalRadioButton = {
  form: (ctx: any) => {
    const { component } = ctx;
    const id = ctx.instance?.id || component.key || "radio";
    const label = ctx.t(component.label || "");
    const description = ctx.t(component.description || "");
    const hasErrors = Array.isArray(ctx.errors) && ctx.errors.length > 0;
    const errorId = `err-${id}`;

    // wrapper voor fieldset (invalid state)
    const fieldsetClass = `utrecht-form-fieldset${
      hasErrors ? " utrecht-form-fieldset--invalid" : ""
    }`;

    // Radio-opties renderen
    const options = (component.values || [])
      .map((opt: any, index: number) => {
        const value = opt.value ?? opt.label ?? "";
        const text = ctx.t(opt.label ?? opt.value);
        const inputId = `${id}-${index}`;

        const checked = ctx.dataValue === value ? "checked" : "";
        const disabled = ctx.disabled ? "disabled" : "";

        return `
        <div class="utrecht-form-field utrecht-form-field--radio">
          <p class="nl-paragraph utrecht-form-field__label utrecht-form-field__label--radio">
            <label for="${inputId}" class="utrecht-form-label utrecht-form-label--radio">
              <input
                ref="input"
                class="utrecht-radio-button utrecht-radio-button--html-input utrecht-form-field__input"
                id="${inputId}"
                name="${ctx.input?.name || component.key}"
                type="radio"
                value="${value}"
                ${checked}
                ${disabled}
                aria-describedby="${description ? `${id}-description` : ""}"
              >
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
          ${description ? `aria-describedby="${id}-description"` : ""}
        >
          ${
            label
              ? `<legend class="utrecht-form-fieldset__legend utrecht-form-fieldset__legend--html-legend">${label}</legend>`
              : ""
          }
          ${
            description
              ? `<div id="${id}-description" class="utrecht-form-field-description utrecht-form-field-description--distanced">
                  ${description}
                </div>`
              : ""
          }

          ${options}

          <div class="utrecht-form-field-error-message" id="${errorId}" ref="messageContainer">
            ${hasErrors ? ctx.errors.join("<br>") : ""}
          </div>
        </fieldset>
      </div>
    `;
  },
};
