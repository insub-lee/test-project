import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// Chemical 현황관리 리스트 테이블
class StatusListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { listData, handleModal } = this.props;

    // 동일한 장치번호 일경우 컬럼 렌더링 X

    const columns = [
      {
        title: '일자',
        dataIndex: 'OCCURDT',
        key: 'OCCURDT',
        width: '5%',
        align: 'center',
      },
      {
        title: 'FAB',
        dataIndex: 'FAB',
        key: 'FAB',
        width: '15%',
        align: 'center',
      },
      {
        title: 'No',
        dataIndex: 'GONGNO',
        key: 'GONGNO',
        width: '5%',
        align: 'center',
      },
      {
        title: '장치명',
        dataIndex: 'PRODNM',
        key: 'PRODNM',
        width: '10%',
        align: 'center',
      },
      {
        title: 'DOWN 시간',
        dataIndex: 'DOWNTIME',
        key: 'DOWNTIME',
        width: '10%',
        align: 'center',
      },
      {
        title: 'UP 시간',
        dataIndex: 'UPTIME',
        key: 'UPTIME',
        width: '10%',
        align: 'center',
      },
      {
        title: '문제점',
        dataIndex: 'PROBLEM',
        key: 'PROBLEM',
        width: '10%',
        align: 'center',
      },
      {
        title: '조치사항',
        dataIndex: 'MEASURE',
        key: 'MEASURE',
        width: '10%',
        align: 'center',
      },
      {
        title: 'Run 피해',
        dataIndex: 'DAMAGE',
        key: 'DAMAGE',
        width: '10%',
        align: 'center',
      },
      {
        title: '작업자',
        dataIndex: 'OWNID',
        key: 'OWNID',
        width: '10%',
        align: 'center',
      },
      {
        title: '비고',
        dataIndex: 'BIGO',
        key: 'BIGO',
        width: '10%',
        align: 'center',
      },
      {
        title: '생산장치 통보여부',
        dataIndex: 'EQUIPNOTI',
        key: 'EQUIPNOTI',
        width: '10%',
        align: 'center',
      },
    ];
    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={listData}
        scroll={{ x: 1600, y: 550 }}
        onRow={record => ({
          onClick: () => handleModal('MODIFY', true, record), // click row
        })}
      />
    );
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
