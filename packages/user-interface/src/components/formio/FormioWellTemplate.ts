import { renderTextareaElement } from "./FormIoInputTemplate";

export const nlPortalWell = {
  form: (ctx: any) => {
    if (ctx.component?.type === "textarea") return renderTextareaElement(ctx);
  },
};
