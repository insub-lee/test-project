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
        dataIndex: 'WQ_DT',
        key: 'WQ_DT',
        align: 'center',
        render: data => <span>{moment(data, 'YYYYMMDD').format('YYYY.MM.DD')}</span>,
      },
      {
        title: 'COD',
        dataIndex: 'COD',
        key: 'COD',
        align: 'center',
      },
      {
        title: 'BOD',
        dataIndex: 'BOD',
        key: 'BOD',
        align: 'center',
      },
      {
        title: 'SS',
        dataIndex: 'SS',
        key: 'SS',
        align: 'center',
      },
      {
        title: 'T-N',
        dataIndex: 'TN',
        key: 'TN',
        align: 'center',
      },
      {
        title: 'T-P',
        dataIndex: 'TP',
        key: 'TP',
        align: 'center',
      },
      {
        title: 'Flow',
        dataIndex: 'FLOW',
        key: 'FLOW',
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
