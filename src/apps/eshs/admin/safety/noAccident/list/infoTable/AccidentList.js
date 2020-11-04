import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

class RawWaterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData, info } = this.props;
    const columns = [
      {
        title: '연도-월',
        dataIndex: 'WORK_MONTH',
        key: 'WORK_MONTH',
        align: 'center',
      },
      {
        title: '구미',
        dataIndex: 'WORK_HOURS_1',
        key: 'WORK_HOURS_1',
        align: 'center',
        render: data => {
          if (data) return data;
          return 0;
        },
      },
      {
        title: '청주',
        dataIndex: 'WORK_HOURS_3',
        key: 'WORK_HOURS_3',
        align: 'center',
        render: data => {
          if (data) return data;
          return 0;
        },
      },
      {
        title: '서울',
        dataIndex: 'WORK_HOURS_2',
        key: 'WORK_HOURS_2',
        align: 'center',
        render: data => {
          if (data) return data;
          return 0;
        },
      },
      {
        title: '합계',
        dataIndex: 'TOTAL_HOURS',
        key: 'TOTAL_HOURS',
        align: 'center',
      },
    ];
    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={listData}
        footer={() => (
          <div style={{ textAlign: 'left' }}>
            <h3>무재해시간 검색결과 내 합계</h3>
            <p>&#8251; 구미(총 근무시간) : {`${info.WORK_HOURS_SUM_1}`}</p>
            <p>&#8251; 청주(총 근무시간) : {`${info.WORK_HOURS_SUM_3}`}</p>
            <p>&#8251; 서울(총 근무시간) : {`${info.WORK_HOURS_SUM_2}`}</p>
            <p>&#8251; 총 근무시간(구미, 청주, 서울) : {`${info.TOTAL_HOURS_SUM}`}</p>
          </div>
        )}
      />
    );
  }
}

RawWaterTable.propTypes = {
  listData: PropTypes.array,
  info: PropTypes.object,
};

RawWaterTable.defaultProps = {
  listData: [],
  info: {},
};

export default RawWaterTable;
