import React from 'react';
import { Table } from 'antd';

import StyledButton from 'commonStyled/Buttons/StyledButton';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';
const AntdLineTable = StyledAntdTable(Table);

const columns = [
  {
    title: '종류',
    key: 'FULLPATHSTR',
    dataIndex: 'FULLPATHSTR',
    width: '21%',
    render: (text, row, index) => {
      if (text) {
        return <span>{text.replace(/&gt;/g, ' > ')}</span>;
      }
    },
  },
  { title: 'No.', key: 'DOCNUMBER', width: '11%', dataIndex: 'DOCNUMBER' },
  { title: 'REV.', key: 'VERSION', align: 'center', width: '7%', dataIndex: 'VERSION', render: (text, record) => text.split('.')[0] },
  { title: 'Effect Date', align: 'center', key: 'END_DTTM', width: '10%', dataIndex: 'END_DTTM' },
  { title: 'Title', align: 'left', key: 'TITLE', dataIndex: 'TITLE' },

  { title: '기안부서', key: 'REG_DEPT_NAME', width: '14%', dataIndex: 'REG_DEPT_NAME' },
  { title: '기안자', key: 'REG_USER_NAME', width: '8%', dataIndex: 'REG_USER_NAME' },
];

const ModalList = ({ listData, onClickRow }) => (
  <AntdLineTable
    columns={columns}
    size="middle"
    dataSource={listData}
    className="tableCustom"
    onRow={record => ({
      onClick: () => {
        onClickRow(record);
      },
    })}
  />
);

export default ModalList;
