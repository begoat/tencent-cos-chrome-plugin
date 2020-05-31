import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Alert } from 'rsuite';

import { copyToClipboard, genRandomString, ProgressData, fmtPercent } from './utils/index';

interface DropZoomProps {
  refetchFiles: Function;
  handleUploadFile: (
    fileObj: File,
    onProgress?: (progressData?: ProgressData) => void
  ) => Promise<string>;
}

export const DropZoom = ({ refetchFiles, handleUploadFile }: DropZoomProps): JSX.Element => {
  const [uploadRecords, setUploadRecords] = useState({});
  const [uploadId, setUploadId] = useState(genRandomString(5));

  const onDrop = useCallback(
    (acceptedFiles) => {
      const first = acceptedFiles.slice().pop();
      handleUploadFile(first, (progressData) => {
        setUploadRecords((u) => ({
          ...u,
          [uploadId]: progressData.percent,
        }));
      }).then((url) => {
        setUploadId(genRandomString(5));
        copyToClipboard(url);
        Alert.success('Upload Success');
        refetchFiles();
      });
    },
    [refetchFiles, handleUploadFile, uploadId]
  );

  const disabled = uploadRecords[uploadId];
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    disabled,
  });

  return (
    <div {...getRootProps({ className: `dropzone ${disabled ? 'disabled' : ''}` })}>
      <input {...getInputProps()} />
      {disabled ? (
        <span>Uploading {fmtPercent(uploadRecords[uploadId])}...</span>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </div>
  );
};
