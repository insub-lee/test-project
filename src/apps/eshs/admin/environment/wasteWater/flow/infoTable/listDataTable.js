import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// Ehs - 용폐수 - 관리 - 유량 (검색결과 리스트 테이블)
class StatusListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData } = this.props;
    const columns = [
      {
        title: '관리단위',
        dataIndex: 'GROUP_UNIT_NM',
        key: 'GROUP_UNIT_NM',
        align: 'center',
      },
      {
        title: '측정 Point',
        dataIndex: 'MEASUREMENT_POINT',
        key: 'MEASUREMENT_POINT',
        align: 'center',
      },
      {
        title: '금일지침',
        dataIndex: 'THE_DAY_INDEX',
        key: 'THE_DAY_INDEX',
        align: 'center',
      },
      {
        title: '전일지침',
        dataIndex: 'THE_DAY_BEFORE_INDEX',
        key: 'THE_DAY_BEFORE_INDEX',
        align: 'center',
      },
      {
        title: '사용량(㎥)',
        dataIndex: 'FLOW_AMOUNT',
        key: 'FLOW_AMOUNT',
        align: 'center',
      },
      {
        title: '검침시간',
        dataIndex: 'INSPECTION_TIME',
        key: 'INSPECTION_TIME',
        align: 'center',
      },
    ];

    return <AntdTable pagination={false} columns={columns} dataSource={listData.toJS()} />;
  }
}

StatusListTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
};

StatusListTable.defaultProps = {
  listData: [],
  handleModal: () => false,
};

export default StatusListTable;
