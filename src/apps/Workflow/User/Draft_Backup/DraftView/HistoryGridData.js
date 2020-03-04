import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class HistoryGridData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: 'No',
          field: 'RNUM',
          sortable: true,
          width: 100,
        },
        {
          headerName: 'Title',
          field: 'TITLE',
          sortable: true,
          width: 500,
        },
        {
          headerName: '상태',
          field: 'APPV_STATUS_NM',
          sortable: true,
          width: 150,
        },
        {
          headerName: '승인(반려)자',
          field: 'NAME_KOR',
          sortable: true,
          width: 200,
        },
        {
          headerName: '승인(반려)일',
          field: 'APPV_DTTM',
          sortable: true,
          width: 250,
        },
      ],
    };
  }

  render() {
    const { columnDefs } = this.state;
    const { draftHistory } = this.props;

    return (
      <div className="ag-theme-balham" style={{ width: '1205px', height: '200px' }}>
        <AgGridReact columnDefs={columnDefs} rowData={draftHistory} />
      </div>
    );
  }
}

HistoryGridData.propTypes = {
  draftHistory: PropTypes.array,
};

HistoryGridData.defaultProps = {
  draftHistory: {},
};

export default HistoryGridData;
