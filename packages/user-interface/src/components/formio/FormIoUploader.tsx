import { Components, ReactComponent } from "@formio/react";
import { Root, createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import { get } from "lodash-es";
import { FormField } from "@gemeente-denhaag/form-field";
import { FormLabel } from "@gemeente-denhaag/form-label";
import { LocalizationProvider } from "@nl-portal/nl-portal-localization";
import { FileUpload as FileUploadComponent } from "@gemeente-denhaag/file-upload";
import { File } from "@gemeente-denhaag/file";
import { Alert } from "@gemeente-denhaag/alert";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage, useIntl } from "react-intl";

export interface UploadedFile {
  id?: string;
  url?: string;
  name: string;
  size: number;
  isUploaded?: boolean;
}

interface FileUploadProps {
  id: string;
  label?: string;
  context: object;
  multipleFiles?: boolean;
  multiple: boolean;
  onChange: (fileList: Array<UploadedFile>) => void;
  informatieobjecttype?: string;
  initialValue?: any;
}

const FileUpload = ({
  id,
  label,
  context,
  multipleFiles,
  multiple,
  onChange,
  informatieobjecttype,
  initialValue = [],
}: FileUploadProps) => {
  const [error, setError] = useState(false);
  const [fileList, setFileList] = useState<Array<UploadedFile>>(initialValue);
  const [dataContext, setDataContext] = useState(context);
  const intl = useIntl();

  const handleError = (tempId?: string) => {
    setError(true);

    if (tempId) {
      setFileList((prev) => prev.filter((item) => item.id !== tempId));
    }
  };
  const uploadFile = (file: File) => {
    const restUri = sessionStorage.getItem("REST_URI");
    const uploadLink = `${restUri}/document/content`;
    setError(false);
    const formData = new FormData();
    formData.append("file", file);

    if (informatieobjecttype) {
      formData.append(
        "informatieobjecttype",
        interpolateInformatieobjectUrl(informatieobjecttype),
      );
    }

    const tempId = `${file.name}-${file.size}-${Date.now()}`;
    const tempItem: UploadedFile = {
      id: tempId,
      name: file.name,
      size: file.size,
      isUploaded: false,
    };

    setFileList((prev) => (multiple ? [tempItem, ...prev] : [tempItem]));

    fetch(uploadLink, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FormIoUploader.getOidcToken()}`,
      },
      body: formData,
    })
      .then(async (response) => {
        if (!response.ok) return handleError(tempId);

        const jsonResponse = await response.json();
        const uploadedFile: UploadedFile = {
          url: jsonResponse?.url,
          name: file.name,
          size: file.size,
        };

        setError(false);

        setFileList((prev) =>
          prev.map((item) =>
            item.id === tempId
              ? { ...item, ...uploadedFile, isUploaded: true }
              : item,
          ),
        );
      })
      .catch(() => {
        handleError(tempId);
      });
  };
  useEffect(() => {
    setDataContext(context);
  }, [context]);

  useEffect(() => {
    onChange(fileList);
  }, [fileList]);

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
    <FormField invalid={error}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      {error && (
        <Alert
          close={() => {
            setError(false);
          }}
          text={
            <Paragraph>
              <FormattedMessage id="formio.fileUpload.error" />
            </Paragraph>
          }
          title=""
          variant="error"
        />
      )}
      {(multipleFiles || fileList.length === 0) && (
        <FileUploadComponent
          id={id}
          buttonLabel={intl.formatMessage({
            id: "formio.fileUpload.buttonLabel",
          })}
          text={intl.formatMessage({ id: "formio.fileUpload.text" })}
          onFilesSelected={(files) =>
            Array.from(files || []).forEach((file) => uploadFile(file))
          }
        />
      )}
      {fileList.map((file) => (
        <File
          name={file.name}
          size={String(file.size)}
          key={file.id}
          onClick={() =>
            setFileList((prev) => prev.filter((f) => f.id !== file.id))
          }
          removable
          loading={!file.isUploaded}
        />
      ))}
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
      <LocalizationProvider>
        <FileUpload
          id={`${this.component.id}-${this.component.key}`}
          context={this.data}
          multiple={this.component.multipleFiles}
          onChange={this.onChangeHandler}
          informatieobjecttype={this.component.informatieobjecttype || ""}
          initialValue={this.dataValue}
        />
      </LocalizationProvider>,
    );
  };

  detachReact = () => {
    this.element?.unmount();
  };
}

export default FormIoUploader;
