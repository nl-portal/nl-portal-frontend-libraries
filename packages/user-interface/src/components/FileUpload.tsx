import React, { useEffect, useState } from "react";
import { get } from "lodash-es";
import FormIoUploader from "./FormIoUploader";

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
}

interface FileUploadProps {
  context: object;
  disabled: boolean;
  multiple: boolean;
  onChange: (fileList: Array<UploadedFile>) => void;
  informatieobjecttype?: string;
}

const FileUpload = ({
  context,
  disabled,
  multiple,
  onChange,
  informatieobjecttype,
}: FileUploadProps) => {
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<Array<UploadedFile>>([]);
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
    <div>
      <input
        type="file"
        name="file"
        onChange={onChangeHandler}
        disabled={disabled || isLoading}
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
    </div>
  );
};

export default FileUpload;
