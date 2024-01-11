import ReactDOM from "react-dom";
import { ReactComponent, Formio } from "@formio/react";
import { formIoUploaderEditForm } from "./form-io-uploader-edit-form";
import { FileUpload, UploadedFile } from "../file-upload";

class FormIoUploader extends ReactComponent {
  private component: any;

  constructor(component: any, options: any, data: any) {
    super(component, options, data);
    this.component = component;

    if (this.component.multipleFiles === undefined) {
      this.component.multipleFiles = true;
    }

    this.component.multiple = true; // Must be true to force formio to accept arrays as valid input value for this field type
  }

  static get builderInfo() {
    return {
      title: "Portal File Upload",
      group: "basic",
      icon: "upload",
      schema: FormIoUploader.schema(),
    };
  }

  static schema() {
    // @ts-expect-error ReactComponent has no schema, docs say it does
    return ReactComponent.schema({
      type: "portalFileUpload",
    });
  }

  static register: () => void = () => {
    Formio.use({
      components: {
        portalFileUpload: FormIoUploader,
      },
    });
  };

  static editForm = formIoUploaderEditForm;

  static emptyValue = []; // set empty value to force formio to accept arrays as valid input value for this field type

  onChangeHandler = (files: Array<UploadedFile>) => {
    this.updateValue(
      files.map((file) => file.url),
      undefined
    );
  };

  attachReact = (element: Element) => {
    ReactDOM.render(
      <FileUpload
        disabled={this.component.disabled}
        multiple={this.component.multipleFiles}
        onChange={this.onChangeHandler}
        informatieobjecttype={this.component.informatieobjecttype || ""}
      />,
      element
    );
  };

  detachReact = (element: Element) => {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  };
}

export { FormIoUploader };
