import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';

const AntdTable = StyledLineTable(Table);

class WorkerInfoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { workerList } = this.props;
    const columns = [
      {
        title: '성명',
        dataIndex: 'WORKER_NM',
        width: '25%',
        align: 'center',
      },
      {
        title: '생년월일',
        dataIndex: 'WORKER_SSN',
        width: '25%',
        align: 'center',
        render: value => <span>{value.substr(0, 6)}</span>,
      },
      {
        title: '핸드폰(연락처)',
        dataIndex: 'M_TEL',
        width: '25%',
        align: 'center',
      },
      {
        title: '긴급연락처',
        dataIndex: 'TEL',
        width: '25%',
        align: 'center',
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={workerList || []}
        footer={() => <div style={{ textAlign: 'center' }}>{`총 ${workerList.length === 0 ? 0 : workerList.length} 건`}</div>}
      />
    );
  }
}
WorkerInfoTable.propTypes = {
  workerList: PropTypes.array,
};

WorkerInfoTable.defaultProps = {
  workerList: [],
};

export default WorkerInfoTable;
