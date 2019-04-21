import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { warning } from '../../../components/Feedback/functions';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: 'OP', field: 'INSPOPER', align: 'center' },
        { headerName: '작업명', field: 'INSPOPER_T', align: 'center' },
        { headerName: '작업시간', field: 'INSPOPER', align: 'center' },
        { headerName: '지연사유', field: 'INSPOPER', align: 'center' },
        { headerName: '표준기준', field: 'INSPOPER', align: 'center' },
        { headerName: '작업자', field: 'INSPOPER', align: 'center' },
        { headerName: 'Check Item', field: 'MIC_T', align: 'center' },
        { headerName: 'SPEC', field: 'SPEC', align: 'center' },
        { headerName: 'ZCODE1', field: 'ZCODE1', hide: true },
        { headerName: '1st Value', field: 'ZVAL1', align: 'center' },
        { headerName: 'Decision', field: 'ZEVAL1', align: 'center' },
        { headerName: 'Remark', field: 'REMARK', align: 'center' },
        { headerName: 'ZCODE2', field: 'ZCODE2', hide: true },
        { headerName: 'Final Value', field: 'ZVAL2', align: 'center' },
        { headerName: 'Decision', field: 'ZEVAL2', align: 'center' },
        { headerName: 'APC Modeling 값', field: 'DUMMY10', hide: true },
        { headerName: '분', field: 'ARBEI', hide: true },
        { headerName: 'MIN', field: 'ARBEH', hide: true },
        { headerName: '인원수', field: 'DAUNO', hide: true },
        { headerName: '시작일자', field: 'NTANF', hide: true },
        { headerName: '시작시간', field: 'NTANZ', hide: true },
        { headerName: '완료일자', field: 'NTEND', hide: true },
        { headerName: '완료시간', field: 'NTENZ', hide: true },
        { headerName: '작업자', field: 'ZTXT', hide: true },
        { headerName: '지연사유', field: 'USR01', hide: true },
      ],
      defaultColDef: { editable: true },
      // editType: "fullRow",
      // frameworkComponents: {
      // TestRenderer,
      // },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isExcelDownload !== nextProps.isExcelDownload) {
      if (nextProps.contractorGrid.length === 0) {
        warning('데이터 없음', '다운로드 할 데이터가 없습니다.');
        return;
      }
      if (nextProps.isExcelDownload > 0) {
        const dateString = moment().format('YYYYMMDDHHmmss');
        const params = {
          columnGroups: true,
          allColumns: true,
          fileName: 'fabInformNoticeList'.concat(dateString),
        };
        this.gridApi.exportDataAsCsv(params);
      }
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  render() {
    const {
      contractorGrid,
    } = this.props;
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
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          onGridReady={this.onGridReady}
          rowData={contractorGrid}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
          editType={this.state.editType}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  contractorGrid: [],
};

Grid.propTypes = {
  contractorGrid: PropTypes.array,
  isExcelDownload: PropTypes.number.isRequired,
};
export default Grid;
