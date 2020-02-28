import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';
import StyledButton from 'components/BizBuilder/styled/StyledButton';

import moment from 'moment';

moment.locale('en-US');
const { MonthPicker } = DatePicker;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startMonth: '',
      endMonth: '',
      isDisabled: true,
      columnDefs: this.columnDefs,
      gridOptions: {
        defaultColDef: {
          width: 100,
          resizable: true,
        },
      },
      filteredList: [],
      defaultColDef: {
        width: 120,
        resizable: true,
      },
    };
  }

  columnDefs = [
    {
      headerName: '항목',
      field: 'category',
      filter: true,
      sorter: true,
      width: 100,
      pinned: 'left',
      rowSpan: params => {
        const { category } = params.data;
        switch (category) {
          case 'WF 생산량 (장)':
            return 2;
          case '전력 (KWH)':
            return 2;
          case '연료 (Nm³)':
            return 2;
          case '용수 (Ton)':
            return 2;
          case '경미재해 (건)':
            return 2;
          default:
            return 1;
        }
      },
    },
    { headerName: '구분', field: 'site', filter: true, sorter: true, pinned: 'left', width: 63 },
    { headerName: '합계', field: 'total', pinned: 'right' },
    { headerName: '비교 Factor', pinned: 'right' },
    { headerName: '단위', pinned: 'right' },
  ];

  handleGridReady = () => {
    const paramMap = this.getMonthBetweenStartToEnd(moment().startOf('year'), moment().endOf('year'));
    this.handleGetExtraApi(paramMap);
    this.changeColumnDefs(paramMap);
  };

  handleDateChange = e => {
    const { startMonth } = this.state;
    this.setState({
      endMonth: e,
    });
    const paramMap = this.getMonthBetweenStartToEnd(moment(startMonth), moment(e));
    this.handleGetExtraApi(paramMap);
    this.changeColumnDefs(paramMap);
  };

  getMonthBetweenStartToEnd = (start, end) => {
    const monthArr = [];
    let startDate = start;
    const endDate = end;
    if (startDate === endDate) {
      return null;
    }
    while (startDate <= endDate) {
      monthArr.push(moment(startDate).format('YYYYMM'));
      startDate = moment(startDate).add(1, 'months');
      if (monthArr.length > 12) {
        return monthArr;
      }
    }

    const startMonth = moment(start).format('YYYYMM');
    const endMonth = moment(end).format('YYYYMM');

    const param = {
      startMonth,
      endMonth,
      monthArr,
    };
    return param;
  };

  handleGetExtraApi = paramMap => {
    const { sagaKey: id, getExtraApiData } = this.props;
    const apiArr = [
      {
        key: 'filteredData',
        type: 'POST',
        url: '/api/eshs/v1/common/getroadmaplist',
        params: paramMap,
      },
    ];
    getExtraApiData(id, apiArr);
    return this.props.extraApiData;
  };

  changeColumnDefs = param => {
    const { columnDefs } = this.state;
    const tempCol = [];
    param.monthArr.map(item => {
      tempCol.push({
        headerName: `${moment(item.substring(0, 4)).format('YYYY')}년 ${moment(item.substring(4)).format('MM')}월`,
        field: item,
      });
      const newColumnInfo = [...columnDefs.slice(0, 2), ...tempCol, ...columnDefs.slice(-3)];
      return this.setState({
        columnDefs: newColumnInfo,
      });
    });
  };

  handleDisabledMonth = current => {
    const month = this.state.startMonth || moment().format('YYYYMM');
    return (
      (current.format('YYYYMM') &&
        current.format('YYYYMM') >
          moment(month)
            .add(11, 'months')
            .format('YYYYMM')) ||
      current <= moment(month).startOf('month')
    );
  };

  handleFilterReset = () => {
    this.handleGridReady();
    this.setState({
      startMonth: '',
      endMonth: '',
      isDisabled: true,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { extraApiData } = nextProps;
    if (extraApiData.filteredData) {
      if (prevState.filteredList !== extraApiData.filteredData.roadmapList) {
        return { filteredList: extraApiData.filteredData.roadmapList };
      }
    }
    return null;
  }

  render() {
    const { isDisabled, defaultColDef, filteredList, gridOptions, columnDefs, startMonth, endMonth } = this.state;
    return (
      <StyledViewDesigner>
        <Sketch>
          <div style={{ margin: '5px' }}>
            <div className="alignRight">
              <span style={{ 'margin-right': '10px' }}>기간 별 검색</span>
              <MonthPicker
                placeholder="start month"
                value={startMonth}
                onChange={e => this.setState({ startMonth: e, isDisabled: false })}
                style={{ 'margin-right': '5px' }}
              />
              {'  ~  '}
              <MonthPicker
                disabled={isDisabled}
                value={endMonth}
                disabledDate={this.handleDisabledMonth}
                onChange={this.handleDateChange}
                placeholder="end month"
                style={{ 'margin-right': '10px', 'margin-left': '5px' }}
              />
              <StyledButton className="btn-primary" onClick={this.handleFilterReset}>
                초기화
              </StyledButton>
            </div>
          </div>
          <div style={{ width: '100%', height: '100%' }}>
            <div className="ag-theme-balham" style={{ height: '560px' }}>
              <AgGridReact
                defaultColDef={defaultColDef}
                rowData={filteredList}
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                suppressRowTransform
                onGridReady={this.handleGridReady}
              />
            </div>
          </div>
        </Sketch>
      </StyledViewDesigner>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

export default List;
