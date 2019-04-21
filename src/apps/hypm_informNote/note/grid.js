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
        {
          headerName: 'No',
          field: 'KTEXT2',
          width: 60,
          pinned: 'left',
        },
        {
          headerName: 'SDPT',
          field: '',
          width: 80,
          pinned: 'left',
        },
        { headerName: 'F/L', field: '', pinned: 'left' },
        { headerName: 'EQ ID', field: '', pinned: 'left' },
        {
          headerName: 'Model',
          field: '',
          pinned: 'left',
        },
        {
          headerName: 'SVID Value',
          field: '',
          pinned: 'left',
        },
        { headerName: 'Down', field: '', pinned: 'left' },
        { headerName: 'Down Type', field: '', pinned: 'left' },
        { headerName: 'Auto/Manual', field: '', pinned: 'left' },
        { headerName: 'Down Time', field: '' },
        { headerName: 'Up Time', field: '' },
        { headerName: 'Total Time', field: '' },
        { headerName: 'Work Time', field: '' },
        { headerName: 'Down Comment', field: '' },
        { headerName: 'Problem', field: '' },
        { headerName: '조치상세내용', field: '' },
        { headerName: 'Unit', field: '' },
        { headerName: '유형/현상', field: '' },
        { headerName: '원인', field: '' },
        { headerName: '원인부품(군)', field: '' },
        { headerName: '조치 및 결과', field: '' },
        { headerName: '조치자', field: '' },
        { headerName: 'Last Recipe ID', field: '' },
        { headerName: 'Lot ID', field: '' },
        { headerName: 'Wafer ID', field: '' },
        { headerName: 'Remark', field: '' },
        // { headerName: 'EQ ID', field: 'TIDNR' },
        // { headerName: 'Model', field: 'EQKTX' },
        // { headerName: 'G/C', field: 'PLNAL' },
        // { headerName: 'EQ Master Code', field: 'EQUNR' },
        // { headerName: 'PM Sheet', field: 'KTEXT' },
        // { headerName: 'PM 주기', field: 'DUE_PACKAGES' },
        // { headerName: 'Shift/Fix', field: '' },
        // { headerName: 'Rev. Code', field: 'REVISION' },
        // { headerName: 'Active', field: 'STATUS' },
        // { headerName: 'Start Date', field: 'TARGET' },
        // { headerName: 'PM InterLock 발생시간', field: 'PLAN_SORT' },
        // { headerName: '결재상태', field: 'STATUS_T' },
        // { headerName: '기안자', field: 'REQ_NAME' },
        // { headerName: '기안일자', field: 'REQ_DT' },
        // { headerName: '결재자', field: 'APPROVE_NAME' },
        // { headerName: '승인일자', field: 'APPROVE_DT' },
        // { headerName: 'Comment', field: '' },
        // { headerName: 'A S-IS', field: 'ASIS_COMMENT' },
        // { headerName: 'TO-BE', field: 'TOBE_COMMENT' },
        // { headerName: 'Plan Create Time', field: 'CREATE_DATE' },
      ],
      defaultColDef: { editable: true, resizable: true },
      editType: 'fullRow',
    };
  }

  render() {
    const {
      pmSheetDataList,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '100%',
        padding: '5px',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={pmSheetDataList}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          editType={this.state.editType}
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
