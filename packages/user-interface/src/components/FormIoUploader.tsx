import { Components, ReactComponent } from "@formio/react";
import { formIoUploaderEditForm } from "./FormIoUploaderEditForm";
import FileUpload, { UploadedFile } from "./FileUpload";
import { Root, createRoot } from "react-dom/client";

class FormIoUploader extends ReactComponent {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  private component: any;
  private data: object;
  private element: Root | null;
  static globalOidcToken: string = "";

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(component: any, options: any, data: any) {
    super(component, options, data);
    this.component = component;
    this.data = data;
    this.element = null;

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
    return Components.components.field.schema({
      type: "portalFileUpload",
    });
  }

  static register: () => void = () => {
    Components.addComponent("portalFileUpload", FormIoUploader);
  };

  static editForm = formIoUploaderEditForm;

  static emptyValue = []; // set empty value to force formio to accept arrays as valid input value for this field type

  static setOidcToken = (oidcToken: string) => {
    FormIoUploader.globalOidcToken = oidcToken;
  };

  static getOidcToken = () => {
    return FormIoUploader.globalOidcToken;
  };

  onChangeHandler = (files: Array<UploadedFile>) => {
    this.updateValue(
      files.map((file) => file.url),
      undefined,
    );
  };

  attachReact = (element: Element) => {
    this.element = createRoot(element);
    this.element.render(
      <FileUpload
        id={`${this.component.id}-${this.component.key}`}
        context={this.data}
        disabled={this.component.disabled}
        multiple={this.component.multipleFiles}
        onChange={this.onChangeHandler}
        attributes={this.component.attributes}
        informatieobjecttype={this.component.informatieobjecttype || ""}
      />,
    );
  };

  detachReact = () => {
    this.element?.unmount();
  };
}

export default FormIoUploader;
