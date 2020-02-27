import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import request from 'utils/request';
import moment from 'moment';

moment.locale('en-US');
const { RangePicker, MonthPicker } = DatePicker;
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      startMonth: moment(),
      isDisabled: true,
      columnDefs: this.columnDefs,
      betweenMonth: [],
      gridOptions: {
        defaultColDef: {
          width: 100,
          resizable: true,
        },
      },
      rowData: [],
      defaultColDef: {
        width: 120,
        resizable: true,
      },
    };
  }

  columnDefs = [
    {
      headerName: '구분',
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
    { headerName: '지역', field: 'site', filter: true, sorter: true, pinned: 'left', width: 63 },
    { headerName: '1월', field: 'jan' },
    { headerName: '2월', field: 'feb' },
    { headerName: '3월', field: 'mar' },
    { headerName: '4월', field: 'apr' },
    { headerName: '5월', field: 'may' },
    { headerName: '6월', field: 'jun' },
    { headerName: '7월', field: 'jul' },
    { headerName: '8월', field: 'aug' },
    { headerName: '9월', field: 'sep' },
    { headerName: '10월', field: 'oct' },
    { headerName: '11월', field: 'nov' },
    { headerName: '12월', field: 'dec' },
    { headerName: '합계', field: 'total', pinned: 'right' },
    { headerName: '비교 Factor', pinned: 'right' },
    { headerName: '단위', pinned: 'right' },
  ];

  handleGridReady = () => {
    const getList = async () => {
      const result = await request({
        method: 'GET',
        url: `/api/eshs/v1/common/getroadmaplist?year=2020`,
      });
      this.setState({
        rowData: result.response.roadmapList,
      });
      return result.response;
    };
    getList();
  };

  // 처음에 전체 리스트 받아와서 slice로 처리
  // handleDateChange = e => {
  //   this.setState(
  //     {
  //       columnDefs: this.columnDefs,
  //       startDate: moment(e[0])
  //         .format('MMM')
  //         .toLowerCase(),
  //       endDate: moment(e[1])
  //         .format('MMM')
  //         .toLowerCase(),
  //     },
  //     this.handleChangeCallback,
  //   );
  // };

  // handleChangeCallback = () => {
  //   const { columnDefs, startDate, endDate } = this.state;
  //   const startIndex = columnDefs.findIndex(item => item.field === startDate);
  //   const endIndex = columnDefs.findIndex(item => item.field === endDate) + 1;
  //   const tempArr = [...columnDefs.slice(0, 2), ...columnDefs.slice(startIndex, endIndex), ...columnDefs.slice(-3)];
  //   this.setState({
  //     columnDefs: tempArr,
  //   });
  // };

  // onChange하면 api 호출
  handleDateChange = e => {
    console.debug(moment(e[0]), moment(e[1])); // 시작일과 종료일이 차이가 12달 넘지 않게 막기
    this.setState({
      startDate: e[0],
      endDate: e[1],
    });
    this.getMonthBetweenStartToEnd(moment(e[0]), moment(e[1]));
  };

  getMonthBetweenStartToEnd = (startDate, endDate) => {
    const monthArr = [];
    let startMonth = startDate;
    const endMonth = endDate;
    if (startMonth === endMonth) {
      return;
    }
    while (startMonth <= endMonth) {
      monthArr.push(moment(startMonth).format('YYYYMM'));
      startMonth = moment(startMonth).add(1, 'months');
      if (monthArr.length > 12) {
        return;
      }
    }
    this.setState({
      betweenMonth: monthArr,
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
      current <= moment(month).endOf('day')
    );
  };

  render() {
    return (
      <div>
        <MonthPicker placeholder="start month" onChange={e => this.setState({ startMonth: e, isDisabled: false })} /> ~{' '}
        <MonthPicker disabled={this.state.isDisabled} disabledDate={this.handleDisabledMonth} placeholder="end month" />
        <div style={{ width: '100%', height: '100%' }}>
          <div className="ag-theme-balham" style={{ height: '560px' }}>
            <AgGridReact
              defaultColDef={this.state.defaultColDef}
              rowData={this.state.rowData}
              gridOptions={this.state.gridOptions}
              columnDefs={this.state.columnDefs}
              suppressRowTransform
              onGridReady={this.handleGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {};

export default List;
