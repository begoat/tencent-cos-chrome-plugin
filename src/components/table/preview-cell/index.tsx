import React, { useState } from 'react';
import { Table, Alert } from 'rsuite';
import { TableCellProps } from 'rsuite/lib/Table';

import { GetFileResp, getFileUrlByName } from '../../../utils';

const { Cell } = Table;

interface PreviewCellProps extends TableCellProps {
  storageBulkName: string;
  imgWidth?: number;
  imgHeight?: number;
  defaultBgClr?: string;
}

enum LoadStatus {
  LOAD_ACC = 'LOAD_ACC',
  LOAD_ING = 'LOAD_ING',
  LOAD_NOT_INIT = 'LOAD_NOT_INIT',
}

const PreviewableRegex = /\.(jpg|jpeg|png)$/i;
console.log('prev', PreviewableRegex);
export const PreviewCell = ({
  storageBulkName,
  imgWidth = 36,
  imgHeight = 36,
  defaultBgClr = 'rgba(211,211,211,0.5)',
  ...props
}: PreviewCellProps): JSX.Element => {
  const [loadStatus, setLoadStatus] = useState(LoadStatus.LOAD_NOT_INIT);
  const [randomNum, setRandomNum] = useState<string | number>('');
  return (
    <Cell {...props}>
      {(rowData: ArrayElement<GetFileResp['Contents']>): JSX.Element => {
        const { Key } = rowData;
        const fileUrl = getFileUrlByName(Key, storageBulkName);
        const previewable = fileUrl.match(PreviewableRegex);
        const handleOnError = (): void => {
          if (loadStatus !== LoadStatus.LOAD_NOT_INIT) {
            Alert.error('Error occurred when load image');
            setLoadStatus(LoadStatus.LOAD_NOT_INIT);
            setRandomNum(Math.random());
          }
        };

        const handleOnLoad = (): void => {
          setLoadStatus(LoadStatus.LOAD_ACC);
        };

        const handleOnClick = (): void => {
          if (loadStatus === LoadStatus.LOAD_NOT_INIT) {
            setLoadStatus(LoadStatus.LOAD_ING);
          }
        };

        if (!previewable) {
          return (
            <span>
              Cannot
              <br />
              Preview
            </span>
          );
        }

        if (loadStatus === LoadStatus.LOAD_NOT_INIT) {
          return (
            <div
              style={{
                width: imgWidth,
                height: imgHeight,
                backgroundColor: defaultBgClr,
                display: 'inline-block',
              }}
              onClick={handleOnClick}
            ></div>
          );
        }

        return (
          <img
            style={{ width: imgWidth, height: imgHeight }}
            src={!randomNum ? fileUrl : `${fileUrl}?r=${randomNum}`}
            onError={handleOnError}
            onLoad={handleOnLoad}
          />
        );
      }}
    </Cell>
  );
};
