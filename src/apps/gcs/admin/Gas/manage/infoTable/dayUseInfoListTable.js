import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tooltip } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// 일간정보 리스트 테이블
class DayUseInfoListTable extends Component {
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

    const renderCell = (data, record, useTooltip) => {
      if (useTooltip) {
        return (
          <Tooltip placement="topLeft" title={data}>
            <div
              style={{ width: '100%', height: '100%' }}
              role="button"
              tabIndex={0}
              onKeyPress={() => false}
              onClick={() => handleModal('DAY_VIEW', true, record)}
            >
              <span>{data}</span>
            </div>
          </Tooltip>
        );
      }
      return (
        <div
          style={{ width: '100%', height: '100%' }}
          role="button"
          tabIndex={0}
          onKeyPress={() => false}
          onClick={() => handleModal('DAY_VIEW', true, record)}
        >
          <span>{data}</span>
        </div>
      );
    };

    const renderHideCell = (data, record, index, useTooltip) => {
      let labelData = data;
      if (index > 0) {
        const prevRecord = listData[index - 1]; // 렌더할 record의 이전 record 정보
        const prevCabiNo = prevRecord.CABINO;
        const prevProdnm = prevRecord.PRODNM;
        const prevCabiArea = prevRecord.CABIAREA;
        const prevCabiSensor = prevRecord.CABISENSOR;
        const { CABINO, PRODNM, CABIAREA, CABISENSOR } = record;
        if (prevCabiNo === CABINO && prevProdnm === PRODNM && prevCabiArea === CABIAREA && prevCabiSensor === CABISENSOR) labelData = '';
      }
      if (useTooltip) {
        return (
          <Tooltip placement="topLeft" title={data}>
            <span>{labelData}</span>
          </Tooltip>
        );
      }
      return <span>{labelData}</span>;
    };

    const columns = [
      {
        title: 'Gas Cabinet 정보',
        fixed: true,
        children: [
          {
            title: 'Cabinet번호',
            dataIndex: 'CABINO',
            key: 'CABINO',
            width: 85,
            align: 'center',
            onCell: record => ({
              onClick: () => {
                handleModal('FAB_LIST', true, record);
              },
            }),
            render: (data, record, index) => {
              const prevRecord = listData[index - 1];
              return <div>{index > 0 ? <span>{data === prevRecord.CABINO ? '' : data}</span> : <span>{data}</span>}</div>;
            },
          },
          {
            title: 'Gas Name',
            dataIndex: 'PRODNM',
            key: 'PRODNM',
            width: 80,
            align: 'center',
            ellipsis: true,
            onCell: record => ({
              onClick: () => {
                handleModal('DAY_VIEW', true, record);
              },
            }),
            render: (data, record, index) => renderHideCell(data, record, index, true),
          },
          {
            title: '위치',
            dataIndex: 'CABIAREA',
            key: 'CABIAREA',
            width: 80,
            align: 'center',
            onCell: record => ({
              onClick: () => {
                handleModal('DAY_VIEW', true, record);
              },
            }),
            render: (data, record, index) => renderHideCell(data, record, index),
          },
          {
            title: '감지기',
            dataIndex: 'CABISENSOR',
            key: 'CABISENSOR',
            width: 100,
            align: 'center',
            onCell: record => ({
              onClick: () => {
                handleModal('DAY_VIEW', true, record);
              },
            }),
            render: (data, record, index) => renderHideCell(data, record, index),
          },
          {
            title: 'Vent Line',
            dataIndex: 'CABIVENTLINE',
            key: 'CABIVENTLINE',
            width: 100,
            align: 'center',
            onCell: record => ({
              onClick: () => {
                handleModal('DAY_VIEW', true, record);
              },
            }),
            render: (data, record, index) => renderHideCell(data, record, index),
          },
          {
            title: '기타정보',
            dataIndex: 'CABIINFO',
            key: 'CABIINFO',
            width: 65,
            align: 'center',
            onCell: record => ({
              onClick: () => {
                handleModal('DAY_VIEW', true, record);
              },
            }),
            render: (data, record, index) => renderHideCell(data, record, index),
          },
        ],
      },
      {
        title: 'Gas 정보',
        width: 300,
        fixed: true,
        children: [
          {
            title: '품명',
            dataIndex: 'GASNM',
            key: 'GASNM',
            width: 200,
            align: 'center',
            ellipsis: true,
            render: (data, record) => renderCell(data, record, true),
          },
          {
            title: '단위',
            dataIndex: 'GASUNIT',
            key: 'GASUNIT',
            width: 50,
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '용량',
            dataIndex: 'GASSIZE',
            key: 'GASSIZE',
            width: 50,
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '1',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY1',
            key: 'DAY1',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY1_USE',
            key: 'DAY1_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '2',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY2',
            key: 'DAY2',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY2_USE',
            key: 'DAY2_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '3',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY3',
            key: 'DAY3',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY3_USE',
            key: 'DAY3_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '4',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY4',
            key: 'DAY4',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY4_USE',
            key: 'DAY4_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '5',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY5',
            key: 'DAY5',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY5_USE',
            key: 'DAY5_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '6',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY6',
            key: 'DAY6',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY6_USE',
            key: 'DAY6_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '7',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY7',
            key: 'DAY7',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY7_USE',
            key: 'DAY7_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '8',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY8',
            key: 'DAY8',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY8_USE',
            key: 'DAY8_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '9',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY9',
            key: 'DAY9',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY9_USE',
            key: 'DAY9_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '10',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY10',
            key: 'DAY10',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY10_USE',
            key: 'DAY10_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '11',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY11',
            key: 'DAY11',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY11_USE',
            key: 'DAY11_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '12',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY12',
            key: 'DAY12',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY12_USE',
            key: 'DAY12_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '13',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY13',
            key: 'DAY13',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY13_USE',
            key: 'DAY13_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '14',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY14',
            key: 'DAY14',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY14_USE',
            key: 'DAY14_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '15',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY15',
            key: 'DAY15',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY15_USE',
            key: 'DAY15_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '16',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY16',
            key: 'DAY16',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY16_USE',
            key: 'DAY16_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '17',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY17',
            key: 'DAY17',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY17_USE',
            key: 'DAY17_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '18',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY18',
            key: 'DAY18',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY18_USE',
            key: 'DAY18_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '9',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY19',
            key: 'DAY19',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY19_USE',
            key: 'DAY19_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '20',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY20',
            key: 'DAY20',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY20_USE',
            key: 'DAY20_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '21',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY21',
            key: 'DAY21',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY21_USE',
            key: 'DAY21_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '22',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY22',
            key: 'DAY22',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY22_USE',
            key: 'DAY22_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '23',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY23',
            key: 'DAY23',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY23_USE',
            key: 'DAY23_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '24',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY24',
            key: 'DAY24',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY24_USE',
            key: 'DAY24_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '25',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY25',
            key: 'DAY25',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY25_USE',
            key: 'DAY25_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '26',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY26',
            key: 'DAY26',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY26_USE',
            key: 'DAY26_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '27',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY27',
            key: 'DAY27',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY27_USE',
            key: 'DAY27_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '28',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY28',
            key: 'DAY28',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY28_USE',
            key: 'DAY28_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '29',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY29',
            key: 'DAY29',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY29_USE',
            key: 'DAY29_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '30',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY30',
            key: 'DAY30',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY30_USE',
            key: 'DAY30_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
      {
        title: '31',
        children: [
          {
            title: '사용수량',
            dataIndex: 'DAY31',
            key: 'DAY31',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'DAY31_USE',
            key: 'DAY31_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
        ],
      },
    ];

    return <AntdTable columns={columns} dataSource={listData} pagination={{ pageSize: 20 }} scroll={{ x: 5470 }} />;
  }
}

DayUseInfoListTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
};

DayUseInfoListTable.defaultProps = {
  listData: [],
  handleModal: () => false,
};

export default DayUseInfoListTable;
