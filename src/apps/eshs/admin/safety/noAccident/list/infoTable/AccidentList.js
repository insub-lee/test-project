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
    const { listData } = this.props;
    const columns = [
      {
        title: '기간',
        dataIndex: 'WORK_DT',
        key: 'WORK_DT',
        align: 'center',
      },
      {
        title: '지역',
        dataIndex: 'SITE',
        key: 'SITE',
        align: 'center',
      },
      {
        title: '분기',
        dataIndex: 'WORK_QUARTER',
        key: 'WORK_QUARTER',
        align: 'center',
      },
      {
        title: '재해발생여부',
        dataIndex: 'ACCIDENT_YN',
        key: 'ACCIDENT_YN',
        align: 'center',
        render: data => {
          if (data === 0) return '미발생';
          return '발생';
        },
      },
      {
        title: '근무시간',
        dataIndex: 'WORK_HOURS',
        key: 'WORK_HOURS',
        align: 'center',
      },
      {
        title: '누적시간',
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
          <div style={{ textAlign: 'center' }}>
            <span>총 {listData.length} 건</span>
          </div>
        )}
      />
    );
  }
}

RawWaterTable.propTypes = {
  listData: PropTypes.array,
};

RawWaterTable.defaultProps = {
  listData: [],
};

export default RawWaterTable;
