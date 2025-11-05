export const nlPortalButton = {
  form: (ctx: any) => `
      <button
        ref="button"
        type="${ctx.component.action === "submit" ? "submit" : "button"}"
        class="denhaag-button"
        ${ctx.disabled ? "disabled" : ""}
      >
        <span class="denhaag-button__label">
          ${ctx.t(ctx.component.label || "Button")}
        </span>
      </button>
    `,
};
