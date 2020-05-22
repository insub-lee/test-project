import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
const AntdTable = StyledLineTable(Table);

class SafetyWorker extends Component {
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
        width: '15%',
        align: 'center',
      },
      {
        title: '생년월일',
        dataIndex: 'WORKER_SSN',
        width: '15%',
        align: 'center',
        render: value => <span>{value.substr(0, 6)}</span>,
      },
      {
        title: '직책',
        dataIndex: 'POSITION',
        width: '10%',
        align: 'center',
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
      {
        title: '교육이수',
        dataIndex: 'EDU_CHECK',
        width: '10%',
        align: 'center',
        render: value => {
          if (value === -1) return <CloseOutlined style={{ color: '#ff6666' }} />;
          return <CheckOutlined style={{ color: '#71da71' }} />;
        },
      },
    ];

    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={workerList}
        footer={() => <div style={{ textAlign: 'center' }}>{`총 ${workerList.length === 0 ? 0 : workerList.length} 명`}</div>}
      />
    );
  }
}
SafetyWorker.propTypes = {
  workerList: PropTypes.array,
  handleWorkerPosition: PropTypes.func,
  workerRemove: PropTypes.func,
};

SafetyWorker.defaultProps = {
  workerList: [],
};

export default SafetyWorker;
