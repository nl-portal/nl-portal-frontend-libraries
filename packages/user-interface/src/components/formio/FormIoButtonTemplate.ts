import { Templates } from "@formio/js";

const renderButton = (ctx: any) => `
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
    `;

Templates.templates["denhaag"] = Templates.templates["denhaag"] || {};

// Belangrijk: sommige builds roepen voor textarea tóch 'input' aan.
// Daarom laten we 'input' conditioneel kiezen.
Templates.templates["denhaag"].button = {
  form: renderButton,
};

// (Je button-template laat je zoals die was)
// Activeer bij voorkeur via een naam:
Templates.current = "denhaag";
