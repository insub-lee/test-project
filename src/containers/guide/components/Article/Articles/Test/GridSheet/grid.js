import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: 'Team', field: 'KTEXT2', checkboxSelection: true },
        { headerName: 'SDPT', field: 'KTEXT3' },
        { headerName: 'EQ ID', field: 'TIDNR' },
        { headerName: 'Model', field: 'EQKTX' },
        { headerName: 'G/C', field: 'PLNAL' },
        { headerName: 'EQ Master Code', field: 'EQUNR' },
        { headerName: 'PM Sheet', field: 'KTEXT' },
        { headerName: 'PM 주기', field: 'DUE_PACKAGES' },
        { headerName: 'Shift/Fix', field: '' },
        { headerName: 'Rev. Code', field: 'REVISION' },
        { headerName: 'Active', field: 'STATUS' },
        { headerName: 'Start Date', field: 'TARGET' },
        { headerName: 'PM InterLock 발생시간', field: 'PLAN_SORT' },
        { headerName: '결재상태', field: 'STATUS_T' },
        { headerName: '기안자', field: 'REQ_NAME' },
        { headerName: '기안일자', field: 'REQ_DT' },
        { headerName: '결재자', field: 'APPROVE_NAME' },
        { headerName: '승인일자', field: 'APPROVE_DT' },
        { headerName: 'Comment', field: '' },
        { headerName: 'A S-IS', field: 'ASIS_COMMENT' },
        { headerName: 'TO-BE', field: 'TOBE_COMMENT' },
        { headerName: 'Plan Create Time', field: 'CREATE_DATE' },
      ],
      defaultColDef: { editable: true },
    };
  }

  render() {
    const { pmSheetDataList } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '100%',
        }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting
          enableFilter
          columnDefs={this.state.columnDefs}
          rowData={pmSheetDataList}
          defaultColDef={this.state.defaultColDef}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  pmSheetDataList: [],
};

Grid.propTypes = {
  pmSheetDataList: PropTypes.array,
};
export default Grid;
