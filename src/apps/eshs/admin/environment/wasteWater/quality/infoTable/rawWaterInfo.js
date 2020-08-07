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
    const { listData, division } = this.props;

    const childrenColumn1 = [
      {
        title: 'Date',
        dataIndex: 'WQ_DT',
        key: 'WQ_DT',
        align: 'center',
        render: data => <span>{moment(data, 'YYYYMMDD').format('YYYY.MM.DD')}</span>,
      },
      {
        title: 'F',
        dataIndex: 'F',
        key: 'F',
        align: 'center',
      },
      {
        title: 'BOD',
        dataIndex: 'BOD',
        key: 'BOD',
        align: 'center',
      },
      {
        title: 'CODmn',
        dataIndex: 'COD_MN',
        key: 'COD_MN',
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
    ];

    const childrenColumn2 = [
      {
        title: 'Date',
        dataIndex: 'WQ_DT',
        key: 'WQ_DT',
        align: 'center',
        render: data => <span>{moment(data, 'YYYYMMDD').format('YYYY.MM.DD')}</span>,
      },
      {
        title: 'F',
        dataIndex: 'F',
        key: 'F',
        align: 'center',
      },
      {
        title: 'BOD',
        dataIndex: 'BOD',
        key: 'BOD',
        align: 'center',
      },
      {
        title: 'CODmn',
        dataIndex: 'COD_MN',
        key: 'COD_MN',
        align: 'center',
      },
      {
        title: 'CODcr',
        dataIndex: 'COD_CR',
        key: 'COD_CR',
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
    ];

    const columns = [
      {
        title: `${division}`,
        children: division === '유기계' ? childrenColumn2 : childrenColumn1,
      },
    ];

    return <AntdTable pagination={false} columns={columns} dataSource={listData} footer={() => <span>{`${(listData && listData.length) || 0} 건`}</span>} />;
  }
}

RawWaterTable.propTypes = {
  division: PropTypes.string,
  listData: PropTypes.array,
};

RawWaterTable.defaultProps = {
  division: 'HF계',
  listData: [],
};

export default RawWaterTable;
