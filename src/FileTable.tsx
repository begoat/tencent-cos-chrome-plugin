import React from 'react';

import {
  Table,
  Cell,
  HeaderCell,
  Column,
  OperationCell,
  PreviewCell,
  SizeCell,
} from './components/table';
import { fmtFileSize, GetFileResp } from './utils/index';

export const FileTable = ({ fileResp }: { fileResp: GetFileResp }): JSX.Element => {
  return (
    <Table
      data={fileResp.Contents}
      autoHeight
      cellBordered
      affixHeader
      affixHorizontalScrollbar
      bordered
      wordWrap
    >
      <Column flexGrow={2} minWidth={200} fixed verticalAlign="middle">
        <HeaderCell>FileName</HeaderCell>
        <Cell dataKey="Key" />
      </Column>

      <Column minWidth={130} align="center" verticalAlign="middle">
        <HeaderCell>FileSize</HeaderCell>
        <SizeCell dataKey="Size" formatFn={fmtFileSize} />
      </Column>

      <Column minWidth={130} align="center" verticalAlign="middle">
        <HeaderCell>Preview</HeaderCell>
        <PreviewCell storageBulkName={fileResp.Name} />
      </Column>

      <Column minWidth={100} align="center" verticalAlign="middle">
        <HeaderCell>Operation</HeaderCell>
        <OperationCell storageBulkName={fileResp.Name} />
      </Column>
    </Table>
  );
};
