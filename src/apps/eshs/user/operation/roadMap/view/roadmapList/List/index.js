import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DatePicker, message } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community';

import StyledContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';
import StyledCustomSearchWrapper from 'components/BizBuilder/styled/Wrapper/StyledCustomSearchWrapper';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledDatePicker from 'components/BizBuilder/styled/Form/StyledDatePicker';

import moment from 'moment';

const AntdPicker = StyledDatePicker(DatePicker.MonthPicker);
class List extends Component {
  // 날짜 바꿔줄 때 마다 입력값 초기화해야 함
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      isDisabled: true,
      endPlaceholder: '기준월을 먼저 선택하세요.',
      columnDefs: this.columnDefs,
      gridOptions: {},
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
      width: 125,
      pinned: 'left',
      rowSpan: () => 3,
      cellClassRules: { 'cell-span': "value=== 'WF 생산량 (장)'" },
    },
    {
      headerName: '구분',
      field: 'site',
      filter: true,
      sorter: true,
      pinned: 'left',
      width: 63,
    },
    {
      headerName: '합계',
      field: 'total',
      pinned: 'right',
      valueFormatter: param => Number(param.value).toLocaleString(),
      // valueFormatter: this.numberFormatter,
    },
    {
      headerName: '비교 Factor',
      pinned: 'right',
    },
    {
      headerName: '단위',
      field: 'unit',
      pinned: 'right',
    },
  ];

  handleGridReady = () => {
    // const paramMap = this.getMonthBetweenStartToEnd(moment().startOf('year'), moment().endOf('year'));
    this.handleGetExtraApi();
    // this.changeColumnDefs(paramMap);
  };

  handleDateChange = (key, value) => {
    if (key.toUpperCase() === 'STARTDATE') {
      this.setState({ [key]: value, isDisabled: false, endPlaceholder: '종료월을 선택하세요.', endDate: '' });
    } else {
      this.setState({
        [key]: value,
      });
    }
    // this.handleGetExtraApi();
  };

  handleGetExtraApi = (startDate = moment().startOf('year'), endDate = moment().endOf('year')) => {
    const { sagaKey: id, getExtraApiData } = this.props;

    if (!startDate && !endDate) {
      return message.error('검색월을 확인하세요.');
    }

    const paramMap = this.getMonthBetweenStartToEnd(moment(startDate), moment(endDate));
    const apiArr = [
      {
        key: 'filteredData',
        type: 'POST',
        url: '/api/eshs/v1/common/getroadmaplist',
        params: paramMap,
      },
    ];

    return getExtraApiData(id, apiArr, () => this.changeColumnDefs(paramMap));
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

  changeColumnDefs = param => {
    const { columnDefs } = this.state;
    const tempCol = [];
    param.monthArr.map(item => {
      tempCol.push({
        headerName: `${moment(item.substring(0, 4)).format('Y')}년 ${moment(item.substring(4)).format('MMMM')}`,
        field: item,
        valueFormatter: this.numberFormatter,
      });
      const newColumnInfo = [...columnDefs.slice(0, 2), ...tempCol, ...columnDefs.slice(-3)];
      return this.setState({
        columnDefs: newColumnInfo,
      });
    });
  };

  disabledMonth = current => {
    const month = this.state.startDate || moment().format('YMM');
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
      startDate: '',
      endDate: '',
      isDisabled: true,
      endPlaceholder: '기준월을 먼저 선택하세요.',
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

  // numberFormatter = params => params.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  numberFormatter = params => Number(params.value).toLocaleString();

  render() {
    const { isDisabled, defaultColDef, filteredList, gridOptions, columnDefs, startDate, endDate, endPlaceholder } = this.state;
    return (
      <StyledContentsWrapper>
        <StyledCustomSearchWrapper>
          <div style={{ margin: '5px' }}>
            <div className="search-input-area">
              <span className="text-label">기간 별 검색</span>
              <AntdPicker
                className="ant-picker-sm"
                placeholder="기준월을 선택하세요."
                value={startDate}
                // onChange={e => this.setState({ startMonth: e, isDisabled: false, endPlaceholder: '종료월을 선택하세요.' })}
                onChange={value => this.handleDateChange('startDate', value)}
                style={{ marginRight: '5px' }}
                format="Y년 MMM"
              />
              {'  ~  '}
              <AntdPicker
                className="ant-picker-sm"
                disabled={isDisabled}
                value={endDate}
                disabledDate={this.disabledMonth}
                onChange={value => this.handleDateChange('endDate', value)}
                placeholder={endPlaceholder}
                style={{ marginRight: '10px', marginLeft: '5px' }}
                format="Y년 MMM"
              />
              <div className="btn-area">
                <StyledButton className="btn-gray mr5 btn-sm" onClick={() => this.handleGetExtraApi(startDate, endDate)}>
                  검색
                </StyledButton>
                <StyledButton className="btn-gray btn-sm" onClick={this.handleFilterReset}>
                  초기화
                </StyledButton>
              </div>
            </div>
          </div>
        </StyledCustomSearchWrapper>
        <div style={{ width: '100%', height: '100%' }}>
          <div className="ag-theme-balham" style={{ height: '365px' }}>
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
        <div className="div-comment div-comment-antd">WF생산량(In2) = WF생산량(장) * 4 * 4 * 3.14</div>
        <div className="div-comment div-comment-antd">WF생산량(m2) = WF생산량(장) * 6.4516 / 10000</div>
      </StyledContentsWrapper>
    );
  }
}

List.propTypes = {
  sagaKey: PropTypes.string,
  getExtraApiData: PropTypes.func,
  extraApiData: PropTypes.object,
};

export default List;
