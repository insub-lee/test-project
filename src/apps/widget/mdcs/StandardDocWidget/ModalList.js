import React, { Component } from 'react';
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
    width: '15%',
    align: 'center',
  },
  { title: 'No.', key: 'DOCNUMBER', width: '11%', dataIndex: 'DOCNUMBER', align: 'center' },
  {
    title: 'REV.',
    key: 'VERSION',
    align: 'center',
    width: '7%',
    dataIndex: 'VERSION',
    render: (text, record) => text.split('.')[0],
  },
  { title: 'Effect Date', align: 'center', key: 'END_DTTM', width: '10%', dataIndex: 'END_DTTM' },
  { title: 'Title', align: 'left', key: 'TITLE', dataIndex: 'TITLE', ellipsis: true },
  { title: '기안부서', key: 'REG_DEPT_NAME', width: '15%', dataIndex: 'REG_DEPT_NAME', align: 'center' },
  { title: '기안자', key: 'REG_USER_NAME', width: '8%', dataIndex: 'REG_USER_NAME', align: 'center' },
];

class ModalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationIdx: 1,
      pageSize: 10,
    };
  }

  setPaginationIdx = paginationIdx =>
    this.setState({ paginationIdx }, () => {
      const { pageSize } = this.state;
      const { getListData } = this.props;
      getListData(paginationIdx, pageSize);
    });

  render() {
    const { listData, listCnt, onClickRow } = this.props;
    const { paginationIdx } = this.state;

    return (
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
        pagination={{ current: paginationIdx, total: listCnt }}
        onChange={pagination => this.setPaginationIdx(pagination.current)}
      />
    );
  }
}
export default ModalList;
