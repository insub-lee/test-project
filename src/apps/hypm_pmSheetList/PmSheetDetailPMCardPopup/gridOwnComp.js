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
        {
          headerName: 'Operation',
          field: 'INSPOPER',
          // rowSpan: (params) => {
          //   const athlete = params.data.INSPOPER;
          //   alert(athlete);
          //   if (athlete === '10') {
          //     return 3;
          //   } else if (athlete === '0020') {
          //     return 4;
          //   }
          //   return 1;
          // },
          // cellClassRules: { 'cell-span': "value==='10' || value==='0020'" },
          width: 110,
          align: 'center',
        },
        {
          headerName: 'Operation Name',
          field: 'INSPOPER_T',
          width: 280,
          align: 'center',
        },
        {
          headerName: 'Check Item',
          field: 'MIC_T',
          width: 280,
          align: 'center',
        },
        {
          headerName: 'SPEC',
          field: 'SPEC',
          width: 120,
          align: 'center',
        },
        {
          headerName: 'ZCODE1',
          field: 'ZCODE1',
          hide: true,
        },
        {
          headerName: '1st Value',
          field: 'ZVAL1',
          width: 100,
          align: 'center',
        },
        {
          headerName: 'Decision',
          field: 'ZEVAL1',
          width: 100,
          align: 'center',
        },
        {
          headerName: 'Remark',
          field: 'REMARK',
          width: 150,
          align: 'center',
        },
        {
          headerName: 'ZCODE2',
          field: 'ZCODE2',
          hide: true,
        },
        {
          headerName: 'Final Value',
          field: 'ZVAL2',
          width: 100,
          align: 'center',
        },
        {
          headerName: 'Decision',
          field: 'ZEVAL2',
          width: 100,
          align: 'center',
        },
        {
          headerName: 'Long Text',
          field: 'DESC',
          hide: true,
        },
        {
          headerName: 'APC Modeling 값',
          field: 'DUMMY10',
          hide: true,
        },
      ],
      defaultColDef: { editable: false },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isExcelDownload !== nextProps.isExcelDownload) {
      if (nextProps.ownCompGrid.length === 0) {
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
      ownCompGrid,
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
          rowData={ownCompGrid}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  ownCompGrid: [],
};

Grid.propTypes = {
  ownCompGrid: PropTypes.array,
  isExcelDownload: PropTypes.number.isRequired,
};
export default Grid;
