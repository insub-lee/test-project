import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// Ehs - 용폐수 - 관리 - 유량 (검색결과 리스트 테이블)
class RawWaterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData } = this.props;
    const columns = [
      {
        title: 'Date',
        dataIndex: 'TOTAL_MONTH',
        key: 'TOTAL_MONTH',
        align: 'center',
        render: data => <span>{moment(data, 'YYYYMMDD').format('YYYY.MM')}</span>,
      },
      {
        title: 'COD',
        dataIndex: 'COD_TOTAL',
        key: 'COD_TOTAL',
        align: 'center',
      },
      {
        title: 'BOD',
        dataIndex: 'BOD_TOTAL',
        key: 'BOD_TOTAL',
        align: 'center',
      },
      {
        title: 'SS',
        dataIndex: 'SS_TOTAL',
        key: 'SS_TOTAL',
        align: 'center',
      },
      {
        title: 'F',
        dataIndex: 'F_TOTAL',
        key: 'F_TOTAL',
        align: 'center',
      },
      {
        title: 'T-N',
        dataIndex: 'TN_TOTAL',
        key: 'TN_TOTAL',
        align: 'center',
      },
      {
        title: 'T-P',
        dataIndex: 'TP_TOTAL',
        key: 'TP_TOTAL',
        align: 'center',
      },
    ];
    return <AntdTable pagination={false} columns={columns} dataSource={listData} footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>} />;
  }
}

RawWaterTable.propTypes = {
  listData: PropTypes.array,
};

RawWaterTable.defaultProps = {
  listData: [],
};

export default RawWaterTable;
