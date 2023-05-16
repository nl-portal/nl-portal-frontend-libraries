import * as React from 'react';
import {Fragment, FC, useState, useEffect} from 'react';
import {TOKEN_OBJECT, TOKEN_KEY} from '@nl-portal/nl-portal-api';

interface UploadedFile {
  url: string;
  name: string;
  size: number;
}

interface FileUploadProps {
  disabled: boolean;
  multiple: boolean;
  onChange: (fileList: Array<UploadedFile>) => void;
  informatieobjecttype?: string;
}

const FileUpload: FC<FileUploadProps> = ({disabled, multiple, onChange, informatieobjecttype}) => {
  const [isLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<Array<UploadedFile>>([]);

  const uploadFile = (file: File) => {
    const keycloakToken = TOKEN_OBJECT[TOKEN_KEY];
    const restUri = sessionStorage.getItem('REST_URI');
    const uploadLink = `${restUri}/document/content`;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    if (informatieobjecttype) {
      formData.append('informatieobjecttype', informatieobjecttype);
    }

    fetch(uploadLink, {
      method: 'POST',
      headers: {Authorization: `Bearer ${keycloakToken}`},
      body: formData,
    }).then(async response => {
      if (!response.ok) {
        setFileList([]);
      } else {
        const jsonResponse = await response.json();
        const uploadedFile = {url: jsonResponse?.url, name: file.name, size: file.size};
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
    onChange(fileList);
  }, [fileList]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach(file => uploadFile(file));
    }
  };

  return (
    <div>
      <input type="file" name="file" onChange={onChangeHandler} disabled={disabled || isLoading} />
      <Fragment>
        {isLoading ||
          fileList.map(file => (
            <div key={file.url}>
              <p>Filename: {file.name}</p>
              <p>Filesize: {file.size}</p>
            </div>
          ))}
      </Fragment>
      {!isLoading || <p>Loading</p>}
    </div>
  );
};

export {FileUpload, UploadedFile};
