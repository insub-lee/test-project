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
        { headerName: 'EQ ID', field: 'TIDNR', align: 'center', width : 80 },
        { headerName: 'Plan Desc', field: 'PSTXT', align: 'center' },
        { headerName: '이전 작업 일자', field: 'LSLDT_U', align: 'center', width : 150 },
        { headerName: '이전 작업 주기', field: 'PACKS1', align: 'center', width : 130 },
        { headerName: '다음 작업 일자', field: 'USLDT_U', align: 'center', width : 150 },
        { headerName: '다음 작업 주기', field: 'PACKS2', align: 'center', width : 150 },
        { headerName: 'PM Interlock 발생시간', field: 'PLAN_SORT', align: 'center', width : 160 },
        { field: 'WARPL', hide: true },
        { field: 'PLNNR', hide: true },
        { field: 'PLNAL', hide: true },
        { field: 'STRAT', hide: true },
        { field: 'EQUNR', hide: true },
        { field: 'MARK', hide: true },
        { field: 'KTEXT', hide: true },
        { field: 'MPTYP', hide: true },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
        lockPosition: true,
      },
    };
  }
  render() {
    const {
      PlanChangeDataList,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '300px',
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          // enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={PlanChangeDataList}
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
  PlanChangeDataList: [],
};

Grid.propTypes = {
  PlanChangeDataList: PropTypes.array,
};
export default Grid;
