import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// 월간정보 리스트 테이블
class gasSensorListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate(nextProps) {
    const { listData } = this.props;
    if (listData.length !== nextProps.listData) return true;
    return false;
  }

  render() {
    const { listData, handleModal } = this.props;

    const columns = [
      {
        title: 'No',
        dataIndex: 'NO',
        key: 'NO',
        width: 80,
        align: 'center',
      },
      {
        title: '감지기번호',
        dataIndex: 'SENSORNO',
        key: 'SENSORNO',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '감지상태',
        dataIndex: 'SENSORSEL',
        key: 'SENSORSEL',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: 'Fab',
        dataIndex: 'FAB',
        key: 'FAB',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: 'Area',
        dataIndex: 'AREA',
        key: 'AREA',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: 'Key-No',
        dataIndex: 'KEY_NO',
        key: 'KEY_NO',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: 'Model',
        dataIndex: 'MODEL',
        key: 'MODEL',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: 'Monitor',
        dataIndex: 'MONITOR',
        key: 'MONITOR',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: 'Position',
        dataIndex: 'POSITION',
        key: 'POSITION',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '작동시간',
        dataIndex: 'SENSORTIME',
        key: 'SENSORTIME',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '측정방식',
        dataIndex: 'SENSORPUMP',
        key: 'SENSORPUMP',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '경보설정값',
        dataIndex: 'SENSORSET1',
        key: 'SENSORSET1',
        width: 200,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '경보기위치',
        dataIndex: 'SENSOR_AREA',
        key: 'SENSOR_AREA',
        width: 100,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '정밀도',
        dataIndex: 'SENSOR_PERCENT',
        key: 'SENSOR_PERCENT',
        width: 200,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '경보시 조치내용',
        dataIndex: 'SENSOR_COMENT',
        key: 'SENSOR_COMENT',
        width: 500,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '유지관리',
        dataIndex: 'SENSOR_AS',
        key: 'SENSOR_AS',
        width: 200,
        ellipsis: true,
        align: 'center',
      },
      {
        title: 'TWA-TLV',
        dataIndex: 'SENSOR_TWA',
        key: 'SENSOR_TWA',
        width: 150,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '참고사항',
        dataIndex: 'SENSOR_ADD',
        key: 'SENSOR_ADD',
        width: 200,
        ellipsis: true,
        align: 'center',
      },
      {
        title: '교체/점검 날짜',
        dataIndex: 'SENSOR_CHECKDT',
        key: 'SENSOR_CHECKDT',
        width: 120,
        align: 'center',
        ellipsis: true,
        render: data => {
          if (data === undefined || data === null) return <span>정보없음</span>;
          return <span>{moment(data, 'YYYYMMDD').format('YYYY.MM.DD')}</span>;
        },
      },
      {
        title: '교체/점검 주기',
        dataIndex: 'SENSOR_CYCLE',
        key: 'SENSOR_ADD',
        width: 120,
        align: 'center',
        ellipsis: true,
        render: data => {
          if (data === undefined || data === null) return <span>정보없음</span>;
          return <span>{`${data}년`}</span>;
        },
      },
      {
        title: '교체/점검 예정일',
        dataIndex: 'SENSOR_SCHEDT',
        key: 'SENSOR_SCHEDT',
        width: 120,
        align: 'center',
        ellipsis: true,
        render: data => {
          if (data === undefined || data === null) return <span>정보없음</span>;
          return <span>{moment(data, 'YYYYMMDD').format('YYYY.MM.DD')}</span>;
        },
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={listData}
        pagination={{ pageSize: 20 }}
        scroll={{ x: 2990 }}
        onRow={record => ({
          onClick: () => handleModal('MODIFY', record, record), // click row
        })}
      />
    );
  }
}

gasSensorListTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
};

gasSensorListTable.defaultProps = {
  listData: [],
  handleModal: () => false,
};

export default gasSensorListTable;
