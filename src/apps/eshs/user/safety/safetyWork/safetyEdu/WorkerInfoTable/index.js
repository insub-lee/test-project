import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
// Common Styled
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';

const AntdTable = StyledLineTable(Table);

class WorkerInfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { workerList, rowSelection } = this.props;
    const columns = [
      {
        title: '교육이수여부',
        dataIndex: 'EDU_CHECK',
        width: '10%',
        align: 'center',
        render: value => {
          if (value === -1) return <CloseOutlined style={{ color: '#ff6666' }} />;
          return <CheckOutlined style={{ color: '#71da71' }} />;
        },
      },
      {
        title: '성명',
        dataIndex: 'WORKER_NM',
        width: '20%',
        align: 'center',
      },
      {
        title: '생년월일',
        dataIndex: 'WORKER_SSN',
        width: '20%',
        align: 'center',
        render: value => <span>{value.substr(0, 6)}</span>,
      },
      {
        title: '핸드폰(연락처)',
        dataIndex: 'M_TEL',
        width: '20%',
        align: 'center',
      },
      {
        title: '긴급연락처',
        dataIndex: 'TEL',
        width: '20%',
        align: 'center',
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={workerList}
        rowSelection={rowSelection}
        pagination={false}
        footer={() => <div style={{ textAlign: 'center' }}>{`총 ${workerList.length === 0 ? 0 : workerList.length} 건`}</div>}
      />
    );
  }
}
WorkerInfoTable.propTypes = {
  workerList: PropTypes.array,
  rowSelection: PropTypes.object,
};

WorkerInfoTable.defaultProps = {
  workerList: [],
};

export default WorkerInfoTable;
