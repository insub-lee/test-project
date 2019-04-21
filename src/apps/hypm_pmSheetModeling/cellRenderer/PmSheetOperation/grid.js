import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Grid extends PureComponent {
  constructor(props) {
    // let a = 0;
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: '',
          field: '',
          width: 50,
          checkboxSelection: true,
          editable: false,
          headerCheckboxSelection: true,
        },
        {
          headerName: 'Operation No.',
          field: 'VORNR',
          cellStyle: { 'text-align': 'center' },
          editable: false,
        }, // BcolId: a++, , cellRenderer: "TestRenderer" ,  pinned: 'left'
        {
          headerName: 'Operation Description',
          field: 'LTXA1',
          cellClass: 'lock-pinned',
          sortable: false,
          editable: true,
        },
        {
          headerName: '용도 구분',
          field: 'OP_GUBUN',
          cellStyle: { 'text-align': 'center' },
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: { values: ['자사용', '도급사용'] },
        },
        {
          headerName: 'PM 주기',
          field: 'KTEX1',
          cellStyle: { 'text-align': 'center' },
          sortable: false,
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['1 DAY', '2 DAY', '3 DAY', '4 DAY', '5 DAY', '6 DAY', '8 DAY',
              '9 DAY', '10 DAY', '11 DAY', '16 DAY', '100 DAY', '1 WEEK', '2 WEEK',
              '3 WEEK', '6 WEEK', '9 WEEK', '12 WEEK', '18 WEEK', '24 WEEK', '48 WEEK',
              '1 MON', '2 MON', '3 MON', '4 MON', '5 MON', '6 MON', '8 MON', '9 MON',
              '10 MON', '18 MON', '1 YEAR', '2 YEAR', '3 YEAR', '5 YEAR'],
          },
        },
        {
          headerName: '점검 항목 수',
          field: 'MIC_COUNT',
          cellStyle: {
            'text-align': 'right',
            fontWeight: 'bold',
            fontSize: '13px',
            color: 'blue',
          },
          sortable: false,
          editable: false,
        },
        {
          headerName: '자재 예약 항목',
          field: 'SP_COUNT',
          cellStyle: {
            'text-align': 'right',
            fontWeight: 'bold',
            fontSize: '13px',
            color: 'blue',
          },
          sortable: false,
          editable: false,
        },
        {
          headerName: '표준작업시간 (분)',
          field: 'ARBEI',
          sortable: false,
          editable: false,
        },
        {
          headerName: '표준작업인원(Person)',
          field: 'ANZZL',
          sortable: false,
          editable: false,
        },
        {
          hide: true,
          field: 'PLNAL',
        },
        {
          hide: true,
          field: 'PLNNR',
        },
      ],
      defaultColDef: {
        editable: true,
        resizable: true,
        cellStyle: { color: 'black', 'background-color': 'white' },
        lockPosition: true,
      }, // 스타일 추가해봄. 아직 실험예정.
      editType: 'fullRow',
      frameworkComponents: {
        // TestRenderer,
      },
      selectedRows: [],
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  };

  onSelectionChanged(params) {
    this.gridApi = params.api;
    const selectedRows = this.gridApi.getSelectedRows();
    // this.gridApi.setPinnedTopRowData(selectedRows);
    // console.log('malang3..', selectedRows);
    console.log('selectedRows: ', selectedRows);
    this.setState({
      selectedRows: this.state.selectedRows,
    });
  }

  handleWorkTimeClicked = () => {
    const { workTimeClickedReturn } = this.props;
    console.log('handleWorkTimeClicked');
    console.log('this.props.pmSheetDataList: ', this.props.pmSheetDataList);
    // 워크타임 예외처리 아직안됨.
    if (this.props.pmSheetDataList[0].PLNAL === null || this.props.pmSheetDataList[0].PLNAL === undefined || this.props.pmSheetDataList[0].PLNNR === undefined || this.props.pmSheetDataList[0].PLNNR === '' || this.props.pmSheetDataList[0].PLNAL === '') {
      alert('값을 선택해주세요.');
    } else {
      const param = {
        PARAM_PLNAL: this.props.pmSheetDataList[0].PLNAL, // 'F00466',
        PARAM_PLNNR: this.props.pmSheetDataList[0].PLNNR, // '60',
      };
      workTimeClickedReturn(param);
    }
  };

  handleCellClicked = (e) => {
    // console.log('e.data..', e.data);
    const { cellClickedReturn } = this.props;
    const param = {
      columnGubun: e.colDef.field,
      PLNAL: e.data.PLNAL,
      PLNNR: e.data.PLNNR,
      VORNR: e.data.VORNR,
      REVISION: e.data.REVISION,
      LTXA1: e.data.LTXA1,
      KTEX1: e.data.KTEX1,
    };

    cellClickedReturn(param);
  };

  updateToTheSheet = () => { // key, char, pinned
    this.gridApi.startEditingCell({
      // this.gridApi.setFocusedCell(0, 'OP_GUBUN', pinned);
      colKey: 'LTXA1', // ['OP_GUBUN', 'KTEX1']
      rowIndex: 0,
    });
  };

  addLineToTheSheet = () => {
    const { m167OperationCreateRow } = this.props;
    m167OperationCreateRow();
  };

  render() {
    const {
      pmSheetDataList,
    } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '700px',
        width: '100%',
        }}
      >
        <AgGridReact
          headerHeight="40"
          rowSelection="multiple"
          enableSorting={true}
          enableFilter={false}
          columnDefs={this.state.columnDefs}
          rowData={pmSheetDataList}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
          editType={this.state.editType}
          onCellClicked={this.handleCellClicked}
          // eslint-disable-next-line react/jsx-no-bind
          onGridReady={this.onGridReady}
          suppressClickEdit={true}
          onSelectionChanged={this.onSelectionChanged}
          addLineToTheSheet={this.addLineToTheSheet}
          // handleWorkTimeClicked={this.handleWorkTimeClicked}
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
  cellClickedReturn: PropTypes.func.isRequired,
  workTimeClickedReturn: PropTypes.func.isRequired,
  m167OperationCreateRow: PropTypes.func.isRequired,
};
export default Grid;
