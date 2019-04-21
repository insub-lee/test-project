import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// import * as feed from 'components/Feedback/functions';
// 
import CellRenderer from '../cellRenderer/CellRenderer';
import CellPersonRenderer from '../cellRenderer/CellPersonRenderer';
import TestRenderer from '../cellRenderer/TestRenderer';
import SheetRenderer from '../cellRenderer/SheetRenderer';
import WorkOrderRenderer from '../cellRenderer/WorkOrderRenderer';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        // { headerName: '', field: '', checkboxSelection: true },
        {
          headerName: 'MODEL',
          field: 'EQART_T',
          width: 140,
          lockPosition: true,
          cellRenderer: 'testRenderer',
          // cellStyle: { fontWeight: 'bold', fontSize: '13px' },
        },
        {
          headerName: 'EQID',
          field: 'TIDNR',
          width: 120,
          lockPosition: true,
          sortable: true,
          unSortIcon: true,
        },
        {
          headerName: 'PM Sheet',
          field: 'PRUEFLOS',
          lockPosition: true,
          width: 130,
          cellRenderer: 'sheetRenderer',
        },
        {
          headerName: 'Down Date',
          field: 'DOWN_DATE',
          width: 120,
          lockPosition: true,
          sortable: true,
          unSortIcon: true,
        },
        {
          headerName: 'Down Type',
          field: 'ILART_T',
          width: 110,
          lockPosition: true,
          sortable: true,
        },
        {
          headerName: 'Sheet 상태',
          field: 'STATUS_TX',
          width: 110,
          lockPosition: true,
          sortable: true,
        },
        // {
        //   headerName: '중요도',
        //   field: 'IMPORT',
        //   cellRenderer: 'cellRenderer',
        //   autoHeight: true,
        //   lockPosition: true,
        // },
        // {
        //   headerName: '작업자',
        //   field: 'PERSON',
        //   cellRenderer: 'cellPersonRenderer',
        //   autoHeight: true,
        //   lockPosition: true,
        // },
        {
          headerName: 'Inform Note',
          field: 'U_ID',
          width: 110,
          lockPosition: true,
          cellRenderer: 'cellRenderer',
        },
        {
          headerName: 'Work Order',
          field: 'AUFNR',
          lockPosition: true,
          width: 140,
          cellRenderer: 'workOrderRenderer'
        },
      ],
      defaultColDef: { resizable: true },
      // editType: "fullRow",
      // domLayout: 'autoHeight',
      rowSelection: 'single',
      frameworkComponents: {
        cellRenderer: CellRenderer,
        cellPersonRenderer: CellPersonRenderer,
        testRenderer: TestRenderer,
        sheetRenderer: SheetRenderer,
        workOrderRenderer: WorkOrderRenderer,
      },
    };
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  onSelectionChanged = (params) => {
    const selectedRows = params.api.getSelectedRows();
    console.log(selectedRows);

    if (selectedRows[0].STATUS_TX === '입력중') {
      // feed.error('다른 작업자가 PM 진행중인 작업입니다. 다른 작업을 선택해주세요');
      this.props.selectedSheet(selectedRows[0]);
      this.props.selectedSheet(undefined);
    } else if (selectedRows[0].STATUS_TX === '송부완료') {
      // this.props.selectedSheet(selectedRows[0]);
      this.props.selectedSheet(undefined);
    } else {
      // this.props.selectedSheet(selectedRows[0]);
      this.props.selectedSheet(undefined);
    }
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '500px',
        width: '100%',
        padding: '20px',
      }}
      >
        <AgGridReact
          // enableSorting={true}
          // enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={this.props.dataList}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
          // editType={this.state.editType}
          // domLayout={this.state.domLayout}
          rowSelection={this.state.rowSelection}
          onSelectionChanged={this.onSelectionChanged}
          onClickSheet={this.props.selectedSheet}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  dataList: [],
};

Grid.propTypes = {
  dataList: PropTypes.array,
  selectedSheet: PropTypes.func.isRequired,
};
export default Grid;
