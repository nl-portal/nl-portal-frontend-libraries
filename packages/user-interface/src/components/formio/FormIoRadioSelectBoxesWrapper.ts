import { nlPortalRadioButton } from "./FormIoRadioButtonTemplate";
import { nlPortalMultipleCheckboxes } from "./FormIoMultipleCheckboxesTemplate";

export const nlPortalRadioSelectBoxesWrapper = {
  form: (ctx: any) => {
    const type = ctx.component?.type;

    if (type === "selectboxes") {
      return nlPortalMultipleCheckboxes.form(ctx);
    }

    return nlPortalRadioButton.form(ctx);
  },
};
