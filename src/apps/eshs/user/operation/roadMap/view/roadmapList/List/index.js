import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community';

import ContentsWrapper from 'commonStyled/EshsStyled/Wrapper/ContentsWrapper';
import StyledButton from 'commonStyled/Buttons/StyledButton';
import './styled.css';

import moment from 'moment';

const { MonthPicker } = DatePicker;
class List extends Component {
  // 날짜 바꿔줄 때 마다 입력값 초기화해야 함
  constructor(props) {
    super(props);
    this.state = {
      startMonth: '',
      endMonth: '',
      isDisabled: true,
      endPlaceholder: '기준일을 먼저 선택하세요.',
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
      // sorter: true,
      width: 100,
      pinned: 'left',
      rowSpan: () => 3,
      cellClassRules: { 'cell-span': "value=== 'WF 생산량 (장)'" },
    },
    { headerName: '구분', field: 'site', filter: true, sorter: true, pinned: 'left', width: 63 },
    // { headerName: '합계', field: 'total', pinned: 'right', valueFormatter: this.numberFormatter },
    { headerName: '합계', field: 'total', pinned: 'right' },
    { headerName: '비교 Factor', pinned: 'right' },
    { headerName: '단위', field: 'unit', pinned: 'right' },
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
      monthArr.push(moment(startDate).format('YMM'));
      startDate = moment(startDate).add(1, 'months');
      if (monthArr.length > 12) {
        return monthArr;
      }
    }

    const startMonth = moment(start).format('YMM');
    const endMonth = moment(end).format('YMM');

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
  };

  changeColumnDefs = param => {
    const { columnDefs } = this.state;
    const tempCol = [];
    param.monthArr.map(item => {
      tempCol.push({
        headerName: `${moment(item.substring(0, 4)).format('Y')}년 ${moment(item.substring(4)).format('MMMM')}`,
        field: item,
        // valueFormatter: this.numberFormatter,
      });
      const newColumnInfo = [...columnDefs.slice(0, 2), ...tempCol, ...columnDefs.slice(-3)];
      return this.setState({
        columnDefs: newColumnInfo,
      });
    });
  };

  disabledMonth = current => {
    const month = this.state.startMonth || moment().format('YMM');
    return (
      (current.format('YMM') &&
        current.format('YMM') >
          moment(month)
            .add(11, 'months')
            .format('YMM')) ||
      current <= moment(month).startOf('month')
    );
  };

  handleFilterReset = () => {
    this.handleGridReady();
    this.setState({
      startMonth: '',
      endMonth: '',
      isDisabled: true,
      endPlaceholder: '기준일을 먼저 선택하세요.',
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { extraApiData } = nextProps;
    if (extraApiData.filteredData && extraApiData.filteredData.roadmapList) {
      if (prevState.filteredList !== extraApiData.filteredData.roadmapList) {
        return { filteredList: extraApiData.filteredData.roadmapList };
      }
    }
    return null;
  }

  // numberFormatter = params => params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  render() {
    const { isDisabled, defaultColDef, filteredList, gridOptions, columnDefs, startMonth, endMonth, endPlaceholder } = this.state;
    return (
      <ContentsWrapper>
        <div style={{ margin: '5px' }}>
          <div className="selSaveWrapper alignLeft">
            <span style={{ marginRight: '10px' }}>기간 별 검색</span>
            <MonthPicker
              placeholder="기준일을 선택하세요."
              value={startMonth}
              onChange={e => this.setState({ startMonth: e, isDisabled: false, endPlaceholder: '종료일을 선택하세요.' })}
              style={{ marginRight: '5px' }}
              format="Y년 MMM"
            />
            {'  ~  '}
            <MonthPicker
              disabled={isDisabled}
              value={endMonth}
              disabledDate={this.disabledMonth}
              onChange={this.handleDateChange}
              placeholder={endPlaceholder}
              style={{ marginRight: '10px', marginLeft: '5px' }}
              format="Y년 MMM"
            />
            <StyledButton className="btn-primary" onClick={this.handleFilterReset}>
              초기화
            </StyledButton>
          </div>
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="ag-theme-balham tableWrapper" style={{ height: '560px' }}>
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
      </ContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

export default List;
