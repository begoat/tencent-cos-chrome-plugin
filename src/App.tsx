import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Alert } from 'rsuite';
import { Redirect } from 'react-router';

import { getFiles, uploadFile, GetFileResp, ProgressData, getEnvInfo } from './utils/index';
import { FileTable } from './FileTable';
import { DropZoom } from './DropZoom';

export const App = (): JSX.Element => {
  const envInfoRef = useRef(null);
  envInfoRef.current = getEnvInfo();
  const [fileResp, setFileResp] = useState<GetFileResp>({
    Contents: [],
    Name: '',
    statusCode: 200,
  });

  const handleUploadFile = useCallback(
    (fileObj: File, onProgress?: (progressData: ProgressData) => void) => {
      return getFiles().then((resp) => {
        const { Contents: content } = resp;
        if (content.some((c) => c.Key === fileObj.name && false)) {
          Alert.warning('You may override the existing file, will you continue?');
        } else {
          return uploadFile(fileObj, onProgress);
        }
      });
    },
    []
  );

  const getFileList = useCallback(() => {
    getFiles().then((resp) => {
      setFileResp(resp);
    });
  }, []);

  useEffect(() => {
    if (envInfoRef.current) {
      getFileList();
    }
  }, [getFileList, handleUploadFile]);

  if (!envInfoRef.current) {
    return <Redirect to="/env" />;
  }

  return (
    <>
      <DropZoom refetchFiles={getFileList} handleUploadFile={handleUploadFile} />
      <FileTable fileResp={fileResp} />
    </>
  );
};
