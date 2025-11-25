import { Components, ReactComponent } from "@formio/react";
import { Root, createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { get } from "lodash-es";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { TextInput } from "@gemeente-denhaag/text-input";

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
}

interface FileUploadProps {
  id: string;
  label?: string;
  context: object;
  disabled: boolean;
  multiple: boolean;
  onChange: (fileList: Array<UploadedFile>) => void;
  attributes?: Record<string, string>;
  informatieobjecttype?: string;
  initialValue?: any;
}

const FileUpload = ({
  id,
  label,
  context,
  disabled,
  multiple,
  onChange,
  attributes,
  informatieobjecttype,
  initialValue = [],
}: FileUploadProps) => {
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<Array<UploadedFile>>(initialValue);
  const [dataContext, setDataContext] = useState(context);

  const uploadFile = (file: File) => {
    const restUri = sessionStorage.getItem("REST_URI");
    const uploadLink = `${restUri}/document/content`;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    if (informatieobjecttype) {
      formData.append(
        "informatieobjecttype",
        interpolateInformatieobjectUrl(informatieobjecttype),
      );
    }

    fetch(uploadLink, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FormIoUploader.getOidcToken()}`,
      },
      body: formData,
    }).then(async (response) => {
      if (!response.ok) {
        setFileList([]);
      } else {
        const jsonResponse = await response.json();
        const uploadedFile = {
          url: jsonResponse?.url,
          name: file.name,
          size: file.size,
        };
        if (!multiple) {
          setFileList([uploadedFile]);
        } else {
          setFileList([uploadedFile, ...fileList]);
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    setDataContext(context);
  }, [context]);

  useEffect(() => {
    onChange(fileList);
  }, [fileList]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach((file) => uploadFile(file));
    }
  };

  function interpolateInformatieobjectUrl(url: string) {
    if (dataContext) {
      return url.replace(
        /({{\s*(.*?)\s*}})/g,
        (input, _capturedTemplate, capturedPath) => {
          let value = get(dataContext, capturedPath);
          return value ? value : input;
        },
      );
    } else {
      return url;
    }
  }

  return (
    <FormField>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <TextInput
        id={id}
        type="file"
        name="file"
        onChange={onChangeHandler}
        disabled={disabled || isLoading}
        {...attributes}
      />
      <>
        {isLoading ||
          fileList.map((file) => (
            <div key={file.url}>
              <p>Filename: {file.name}</p>
              <p>Filesize: {file.size}</p>
            </div>
          ))}
      </>
      {!isLoading || <p>Loading</p>}
    </FormField>
  );
};

class FormIoUploader extends ReactComponent {
  private component: any;
  private data: object;
  private element: Root | null;
  static globalOidcToken: string = "";

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

  static emptyValue = []; // set empty value to force formio to accept arrays as valid input value for this field type

  static setOidcToken = (oidcToken: string) => {
    FormIoUploader.globalOidcToken = oidcToken;
  };

  static getOidcToken = () => {
    return FormIoUploader.globalOidcToken;
  };

  onChangeHandler = (files: Array<UploadedFile>) => {
    this.updateValue(files, undefined);
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
        initialValue={this.dataValue}
      />,
    );
  };

  detachReact = () => {
    this.element?.unmount();
  };
}

export default FormIoUploader;
