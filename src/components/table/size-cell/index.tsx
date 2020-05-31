import React from 'react';
import { Table } from 'rsuite';
import { TableCellProps } from 'rsuite/lib/Table';

import { isFunction, strToInt } from '../../../utils';

const { Cell } = Table;

interface SizeCellProps extends TableCellProps {
  formatFn?: (size: number) => string;
}

export const SizeCell = ({ formatFn, dataKey, ...props }: SizeCellProps): JSX.Element => {
  return (
    <Cell {...props}>
      {(rowData: any): JSX.Element => {
        const val = rowData[dataKey] || '';
        return <span>{isFunction(formatFn) ? formatFn(strToInt(val)) : val}</span>;
      }}
    </Cell>
  );
};
