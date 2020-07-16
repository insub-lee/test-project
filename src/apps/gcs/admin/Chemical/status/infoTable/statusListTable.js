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

  componentDidMount() {}

  renderCell = (data, record, index) => {
    const { listData } = this.props;
    let labelData = data;
    if (index > 0) {
      const prevRecord = listData[index - 1]; // 렌더할 record의 이전 record 정보
      const prevGongNo = prevRecord.GONGNO;
      const gongNo = record.GONGNO;
      if (prevGongNo === gongNo) labelData = '';
    }
    return <span>{labelData}</span>;
  };

  render() {
    const { listData, handleModal } = this.props;

    // 동일한 장치번호 일경우 컬럼 렌더링 X

    const columns = [
      {
        title: '장치번호',
        dataIndex: 'GONGNO',
        key: 'GONGNO',
        width: '10%',
        align: 'center',
        render: (data, record, index) => this.renderCell(data, record, index),
      },
      {
        title: '장치명',
        dataIndex: 'PRODNM',
        key: 'PRODNM',
        width: '20%',
        align: 'center',
        render: (data, record, index) => this.renderCell(data, record, index),
      },
      {
        title: '위치',
        dataIndex: 'GONGAREA',
        key: 'GONGAREA',
        width: '10%',
        align: 'center',
        render: (data, record, index) => this.renderCell(data, record, index),
      },
      {
        title: '기타정보',
        dataIndex: 'GONGINFO',
        key: 'GONGINFO',
        width: '10%',
        align: 'center',
        render: (data, record, index) => this.renderCell(data, record, index),
      },
      {
        title: 'Point',
        dataIndex: 'POINTCNT',
        key: 'POINTCNT',
        width: '5%',
        align: 'center',
        render: (data, record, index) => this.renderCell(data, record, index),
      },
      {
        title: 'KEY-NO',
        dataIndex: 'FAB_KEYNO',
        key: 'FAB_KEYNO',
        width: '10%',
        align: 'center',
      },
      {
        title: 'BAY',
        dataIndex: 'FAB_AREA',
        key: 'FAB_AREA',
        width: '15%',
        align: 'center',
      },
      {
        title: '공정명',
        dataIndex: 'FAB_PROC',
        key: 'FAB_PROC',
        width: '10%',
        align: 'center',
      },
      {
        title: '공급일',
        dataIndex: 'GONGDT',
        key: 'GONGDT',
        width: '10%',
        align: 'center',
      },
    ];
    return (
      <AntdTable
        pagination={false}
        columns={columns}
        dataSource={listData}
        scroll={{ y: 550 }}
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
