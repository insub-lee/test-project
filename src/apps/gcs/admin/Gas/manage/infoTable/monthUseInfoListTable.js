import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Tooltip } from 'antd';
import StyledAntdTable from 'components/BizBuilder/styled/Table/StyledAntdTable';

const AntdTable = StyledAntdTable(Table);

// 월간정보 리스트 테이블
class MonthUseInfoListTable extends Component {
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
    const { listData, handleModal, setPaginationIdx, paginationIdx, listTotalCnt, pageSize } = this.props;

    const renderCell = (data, record, isfixed, useTooltip) => {
      let cellData = data;
      if (isfixed) cellData = Number(data);
      if (useTooltip) {
        return (
          <Tooltip placement="topLeft" title={isfixed ? cellData.toFixed(2) : cellData}>
            <span>{isfixed ? cellData.toFixed(2) : cellData}</span>
          </Tooltip>
        );
      }
      return (
        <div
          style={{ width: '100%', height: '100%' }}
          role="button"
          tabIndex={0}
          onKeyPress={() => false}
          onClick={() => handleModal('MONTH_VIEW', true, record)}
        >
          <span>{isfixed ? cellData.toFixed(2) : cellData}</span>
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

    const renderYearAvgCell = record => {
      const {
        MONTH1_AVG,
        MONTH2_AVG,
        MONTH3_AVG,
        MONTH4_AVG,
        MONTH5_AVG,
        MONTH6_AVG,
        MONTH7_AVG,
        MONTH8_AVG,
        MONTH9_AVG,
        MONTH10_AVG,
        MONTH11_AVG,
        MONTH12_AVG,
      } = record;
      const totalAvg =
        (MONTH1_AVG +
          MONTH2_AVG +
          MONTH3_AVG +
          MONTH4_AVG +
          MONTH5_AVG +
          MONTH6_AVG +
          MONTH7_AVG +
          MONTH8_AVG +
          MONTH9_AVG +
          MONTH10_AVG +
          MONTH11_AVG +
          MONTH12_AVG) /
        12;
      return (
        <div
          style={{ width: '100%', height: '100%' }}
          role="button"
          tabIndex={0}
          onKeyPress={() => false}
          onClick={() => handleModal('MONTH_VIEW', true, record)}
        >
          <span>{totalAvg.toFixed(2)}</span>
        </div>
      );
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
                handleModal('MONTH_VIEW', true, record);
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
                handleModal('MONTH_VIEW', true, record);
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
                handleModal('MONTH_VIEW', true, record);
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
                handleModal('MONTH_VIEW', true, record);
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
                handleModal('MONTH_VIEW', true, record);
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
            render: (data, record) => renderCell(data, record, false, true),
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
        title: '1월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH1',
            key: 'MONTH1',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH1_USE',
            key: 'MONTH1_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH1_AVG',
            key: 'MONTH1_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '2월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH2',
            key: 'MONTH2',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH2_USE',
            key: 'MONTH2_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH2_AVG',
            key: 'MONTH2_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '3월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH3',
            key: 'MONTH3',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH3_USE',
            key: 'MONTH3_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH3_AVG',
            key: 'MONTH3_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '4월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH4',
            key: 'MONTH4',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH4_USE',
            key: 'MONTH4_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH4_AVG',
            key: 'MONTH4_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '5월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH5',
            key: 'MONTH5',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH5_USE',
            key: 'MONTH5_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH5_AVG',
            key: 'MONTH5_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '6월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH6',
            key: 'MONTH6',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH6_USE',
            key: 'MONTH6_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH6_AVG',
            key: 'MONTH6_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '7월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH7',
            key: 'MONTH7',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH7_USE',
            key: 'MONTH7_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH7_AVG',
            key: 'MONTH7_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '8월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH8',
            key: 'MONTH8',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH8_USE',
            key: 'MONTH8_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH8_AVG',
            key: 'MONTH8_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '9월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH9',
            key: 'MONTH9',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH9_USE',
            key: 'MONTH9_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH9_AVG',
            key: 'MONTH9_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '10월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH10',
            key: 'MONTH10',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH10_USE',
            key: 'MONTH10_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH10_AVG',
            key: 'MONTH10_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '11월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH11',
            key: 'MONTH11',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH11_USE',
            key: 'MONTH11_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH11_AVG',
            key: 'MONTH11_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '12월',
        children: [
          {
            title: '사용수량',
            dataIndex: 'MONTH12',
            key: 'MONTH12',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'MONTH12_USE',
            key: 'MONTH12_USE',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: 'MONTH12_AVG',
            key: 'MONTH12_AVG',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record, true),
          },
        ],
      },
      {
        title: '연간',
        children: [
          {
            title: '사용수량',
            dataIndex: 'GASDISCHARGEY',
            key: 'GASDISCHARGEY',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '사용량',
            dataIndex: 'GASUSAGEY',
            key: 'GASUSAGEY',
            width: '80px',
            align: 'center',
            render: (data, record) => renderCell(data, record),
          },
          {
            title: '평균사용량',
            dataIndex: '',
            width: '80px',
            align: 'center',
            render: (data, record) => renderYearAvgCell(record),
          },
        ],
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={listData || []}
        scroll={{ x: 3930 }}
        pagination={{ current: paginationIdx, total: listTotalCnt, pageSize }}
        onChange={pagination => setPaginationIdx(pagination.current)}
      />
    );
  }
}

MonthUseInfoListTable.propTypes = {
  listData: PropTypes.array,
  handleModal: PropTypes.func,
  setPaginationIdx: PropTypes.func,
  paginationIdx: PropTypes.number,
  listTotalCnt: PropTypes.number,
  pageSize: PropTypes.number,
};

MonthUseInfoListTable.defaultProps = {
  listData: [],
  handleModal: () => false,
};

export default MonthUseInfoListTable;
