import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// Gas 현황관리 C2F6 정보 테이블
class StatusListTable1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData } = this.props;
    const columns = [
      {
        title: 'Gas 명',
        dataIndex: 'prodnm',
        key: 'prodnm',
        align: 'center',
      },
      {
        title: 'Gas Cabinet',
        dataIndex: 'cabino',
        key: 'cabino',
        align: 'center',
      },
      {
        title: 'Gas Masker',
        children: [
          {
            title: 'KDK',
            dataIndex: 'kdk',
            key: 'kdk',
            align: 'center',
          },
          {
            title: 'KSC',
            dataIndex: 'ksc',
            key: 'ksc',
            align: 'center',
          },
          {
            title: 'MAT',
            dataIndex: 'mat',
            key: 'mat',
            align: 'center',
          },
        ],
      },
      {
        title: '합계',
        dataIndex: 'total',
        key: 'total',
        align: 'center',
      },
    ];
    return <AntdTable pagination={false} columns={columns} dataSource={listData} />;
  }
}

StatusListTable1.propTypes = {
  listData: PropTypes.array,
};

StatusListTable1.defaultProps = {
  listData: [],
};

export default StatusListTable1;
