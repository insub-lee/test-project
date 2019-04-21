import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import 'ag-grid-enterprise';
// import { LicenseManager } from 'ag-grid-enterprise';
// LicenseManager.setLicenseKey('MTU1MzczMTIwMDAwMA==555b6946f1f4ee082a509e13fbc32c10');

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: 'USER_ID', field: 'USER_ID', checkboxSelection: true },
        { headerName: 'EMP_NO', field: 'EMP_NO' },
        { headerName: 'NAME_KOR', field: 'NAME_KOR' },
        { headerName: 'NAME_ENG', field: 'NAME_ENG' },
        { headerName: 'NAME_CHN', field: 'NAME_CHN' },
        { headerName: 'NAME_JPN', field: 'NAME_JPN' },
        { headerName: 'NAME_ETC', field: 'NAME_ETC' },
        { headerName: 'EMAIL', field: 'EMAIL' },
        { headerName: 'PASSWD', field: 'PASSWD' },
        { headerName: 'STATUS_CD', field: 'STATUS_CD' },
        { headerName: 'DEPT_ID', field: 'DEPT_ID' },
        { headerName: 'PSTN_ID', field: 'PSTN_ID' },
        { headerName: 'DUTY_ID', field: 'DUTY_ID' },
        { headerName: 'PHOTO', field: 'PHOTO' },
        { headerName: 'SORT_SQ', field: 'SORT_SQ' },
        { headerName: 'OFFICE_TEL_NO', field: 'OFFICE_TEL_NO' },
        { headerName: 'MOBILE_TEL_NO', field: 'MOBILE_TEL_NO' },
        { headerName: 'COMP_CD', field: 'COMP_CD' },
        { headerName: 'SUB_EMP_NO', field: 'SUB_EMP_NO' },
        { headerName: 'SUB_COMP_CD', field: 'SUB_COMP_CD' },
        { headerName: 'SUB_EMAIL', field: 'SUB_EMAIL' },
        { headerName: 'EMP_TYPE', field: 'EMP_TYPE' },
        { headerName: 'DSPT_YN', field: 'DSPT_YN' },
        { headerName: 'REG_USER_ID', field: 'REG_USER_ID' },
        { headerName: 'REG_DTTM', field: 'REG_DTTM' },
        { headerName: 'UPD_USER_ID', field: 'UPD_USER_ID' },
        { headerName: 'UPD_DTTM', field: 'UPD_DTTM' },
        { headerName: 'JOB_CD', field: 'JOB_CD' },
        { headerName: 'BAREA_CD', field: 'BAREA_CD' },
        { headerName: 'EAI_YN', field: 'EAI_YN' },
      ],
      defaultColDef: { editable: true },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isExcelDownload !== nextProps.isExcelDownload) {
      if (nextProps.isExcelDownload > 0) {
        const params = {
          columnGroups: true,
          allColumns: true,
          fileName: 'AgGridTest',
          // sheetName: '',
        };
        this.gridApi.exportDataAsCsv(params);
        // this.gridApi.exportDataAsExcel(params);
        // this.gridApi.getDataAsCsv(params);
      }
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  render() {
    const {
      pmSheetDataList,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '1500px',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={pmSheetDataList}
          defaultColDef={this.state.defaultColDef}
          onGridReady={this.onGridReady}
          suppressRowTransform={true}
          // suppressCsvExport={true}
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
  isExcelDownload: PropTypes.number.isRequired,
};
export default Grid;
