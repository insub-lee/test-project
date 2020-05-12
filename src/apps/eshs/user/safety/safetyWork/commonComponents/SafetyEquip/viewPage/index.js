import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledLineTable from 'commonStyled/EshsStyled/Table/StyledLineTable';
const AntdTable = StyledLineTable(Table);

class SafetyWorker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { equipList } = this.props;
    const columns = [
      {
        title: 'SEQ',
        dataIndex: 'EGROUP',
        width: '10%',
        align: 'center',
        render: (value, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '장비코드',
        dataIndex: 'EGROUP',
        width: '30%',
        align: 'center',
        render: value => <span>{value}</span>,
      },
      {
        title: '장비명',
        dataIndex: 'EQUIP_NM',
        width: '60%',
        align: 'center',
        render: value => <span>{value}</span>,
      },
    ];

    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={equipList}
        footer={() => <div style={{ textAlign: 'center' }}>{`총 ${equipList.length === 0 ? 0 : equipList.length} 건`}</div>}
      />
    );
  }
}
SafetyWorker.propTypes = {
  equipList: PropTypes.array,
};

SafetyWorker.defaultProps = {
  equipList: [],
};

export default SafetyWorker;
