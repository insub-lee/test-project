import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Table } from 'antd';
import moment from 'moment';
import StyledLineTable from 'commonStyled/MdcsStyled/Table/StyledLineTable';
const AntdLineTable = StyledLineTable(Table);

class VaildationListComp extends Component {
  constructor(props) {
    super(props);
  }

  getTableColumns = () => [
    {
      title: '개정번호',
      dataIndex: 'VERSION',
      key: 'VERSION',
      width: '6%',
      align: 'center',
    },
    {
      title: '점검일자',
      dataIndex: 'REG_DTTM',
      key: 'REG_DTTM',
      width: '10%',
      align: 'center',
      render: (text, record) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: '점검유형',
      dataIndex: 'CHECK_TYPE',
      key: 'CHECK_TYPE',
      align: 'center',
      render: (text, record) => (text === 'Y' ? '유효' : text === 'R' ? '개정' : '폐기'),
    },
    {
      title: '점검상태',
      dataIndex: 'STATUS',
      key: 'STATUS',
      align: 'center',
      width: '10%',
      render: (text, record) => (text === 2 ? '완료' : '진행중'),
    },
  ];

  render() {
    const { fieldSelectData } = this.props;
    const { vailList } = fieldSelectData;
    return (
      <AntdLineTable
        columns={this.getTableColumns()}
        dataSource={vailList.length > 0 ? vailList : null}
        onRow={(record, rowIndex) => ({
          onClick: e => this.onRowClick(record, rowIndex, e),
        })}
        bordered
        className="tableWrapper"
        pagination={false}
      />
    );
  }
}

export default VaildationListComp;
