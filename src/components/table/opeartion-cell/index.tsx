import React from 'react';
import { Table, Alert } from 'rsuite';
import { TableCellProps } from 'rsuite/lib/Table';

import { GetFileResp, getFileUrlByName, copyToClipboard } from '../../../utils';

const { Cell } = Table;

interface OperationCellProps extends TableCellProps {
  storageBulkName: string;
}

export const OperationCell = ({ storageBulkName, ...props }: OperationCellProps): JSX.Element => {
  return (
    <Cell {...props}>
      {(rowData: ArrayElement<GetFileResp['Contents']>): JSX.Element => {
        const { Key } = rowData;
        const fileUrl = getFileUrlByName(Key, storageBulkName);
        const handleCopy = (): void => {
          copyToClipboard(fileUrl);
          Alert.success('Copied');
        };

        return (
          <span>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              Download
            </a>{' '}
            | <span onClick={handleCopy}>Copy</span>
          </span>
        );
      }}
    </Cell>
  );
};
