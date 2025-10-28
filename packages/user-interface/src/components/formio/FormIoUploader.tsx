import { Components } from "@formio/react";
import { formIoUploaderEditForm } from "../FormIoUploaderEditForm";
import { Container } from "react-dom/client";
import BaseFormIoComponent from "./BaseFormIoComponent";
import { FormIoRefProp } from "./useFormIoState";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { useEffect, useId, useState } from "react";
import { get } from "lodash-es";
import { TextInput } from "@gemeente-denhaag/text-input";
import BasicFormIoComponentSchema from "./BasicFormIoComponentSchema";

export interface UploadedFile extends File {
  url: string;
}

interface FileUploadProps extends BasicFormIoComponentSchema {
  context: object;
  multiple: boolean;
  onChange: (fileList: Array<UploadedFile>) => void;
  informatieobjecttype?: string;
}

const FileUpload = ({
  context,
  disabled,
  multiple,
  onChange,
  attributes,
  informatieobjecttype,
  label,
}: FileUploadProps) => {
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<Array<UploadedFile>>([]);
  const [dataContext, setDataContext] = useState(context);
  const id = useId();

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
          ...file,
          url: jsonResponse?.url,
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
        multiple={multiple}
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

export default class FormIoUploader extends BaseFormIoComponent {
  static globalOidcToken: string = "";

  constructor(component: any, options: any, data: any) {
    super(component, options, data);

    if (this.component.multipleFiles === undefined) {
      this.component.multipleFiles = true;
    }

    this.component.multiple = true; // Must be true to force formio to accept arrays as valid input value for this field type
    this.component.context = this.data;
  }

  static register: () => void = () =>
    super.register("portalFileUpload", FormIoUploader);

  static schema(sources: any = {}) {
    return Components.components.field.schema({
      type: "portalFileUpload",
      hideLabel: true,
      ...sources,
    });
  }

  static get builderInfo() {
    return {
      title: "Portal File Upload",
      group: "basic",
      icon: "upload",
      schema: FormIoUploader.schema(),
    };
  }

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

  attachReact(element: Container, ref: FormIoRefProp) {
    super.attachReact(element, ref, FileUpload);
  }

  detachReact(element: Container) {
    super.detachReact(element);
  }
}
