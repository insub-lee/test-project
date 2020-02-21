import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community';
import request from 'utils/request';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: '구분', field: 'category', filter: true, sorter: true },
        { headerName: '지역', field: 'site', filter: true, sorter: true },
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
        { headerName: '합계', field: 'total' },
        { headerName: '비교 Factor' },
        { headerName: '단위' },
      ],
      rowData: [],
    };
  }

  componentDidMount() {
    const getList = async () => {
      const result = await request({
        method: 'GET',
        url: `/api/eshs/v1/common/getroadmaplist?category=387&year=2020`,
      });
      this.setState({
        rowData: result.response.roadmapList,
      });
      return result.response;
    };
    getList();
  }

  handleGridReady = () => {
    this.setState({
      rowData: [],
    });
  };

  gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    suppressRowTransform: true,
  };

  render() {
    console.debug(this.state.rowData);

    return (
      <div className="ag-theme-balham" style={{ width: '100%', height: '560px' }}>
        <AgGridReact columnDefs={this.state.columnDefs} rowData={this.state.rowData} onGirdReady={this.handleGridReady} />
      </div>
    );
  }
}

List.propTypes = {
  listData: PropTypes.array,
};

export default List;
