import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import FileTextReaderer from './cellRenderer/FileTextReaderer';
import FileImgReaderer from './cellRenderer/FileImgReaderer';
import FileMovReaderer from './cellRenderer/FileMovReaderer';
import MicCountTextReaderer from './cellRenderer/MicCountTextReaderer';
import SpCountTextReaderer from './cellRenderer/SpCountTextReaderer';
import Ktext1select from './CustomEdit/Ktext1select';
import OpGubunSelect from './CustomEdit/OpGubunSelect';

let m167GridSavable = 'Y';
class Grid extends PureComponent {
  constructor(props) {
    // let a = 0;
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: '',
          field: 'opertionCheckBox',
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
          cellClass: 'opNum',
          cellRenderer: function(params){
            console.log('cellRenderer on Operation No!!!!!', params);
            console.log('cellRenderer on Operation No!!!!! in params.data', params.data);
            console.log('cellRenderer on Operation No: params.colDef.editable!!!!!', params.colDef.editable);
            if (params.value.ROW_TYPE == undefined || params.value.SLWID == 'P000001' || params.value.SLWID == 'P000002') {
              params.colDef.editable = false;
            } else {
              params.colDef.editable = true;
            }
            return params.value;
          }
        },
        {
          headerName: 'Operation Description',
          field: 'LTXA1',
          cellClass: 'lock-pinned',
          sortable: false,
          editable: true,
          cellClass: 'opDes',
        },
        {
          headerName: '용도 구분',
          field: 'OP_GUBUN',
          cellStyle: { 'text-align': 'center' },
          editable: true,
          cellRenderer: 'opGubunCellRenderer',
          cellEditor: 'opGubunSelect',
          cellEditorParams: {
            cellRenderer: 'opGubunCellRenderer',
            values: []
          },
          cellClass: 'opGubun',
          cellRenderer: function(params){
            if (m167GridSavable != 'Y'){
              params.colDef.editable = false;
            } else{
              params.colDef.editable = true;
            }
            return params.value;
          },
        },
        {
          headerName: 'PM 주기',
          field: 'KTEX1',
          cellStyle: { 'text-align': 'center' },
          // sortable: false,
          editable: true,
          cellRenderer: 'ktext1CellRenderer',
          cellEditor: 'ktext1select',
          cellEditorParams: {
            cellRenderer: 'ktext1CellRenderer',
            values: [],
          },
          cellClass: 'opRotate',
          cellRenderer: function(params){
            if (m167GridSavable != 'Y'){
              params.colDef.editable = false;
            } else {
              // if (m167_current_param.PARAM_STRAT == "") return false; //CBM일때는 strategy를 입력안함. strategy는 pm주기 가져오는 키로 사용함.. 필수아님/저장안함
              // else return true;
              // params.colDef.editable = true;
            }
            return params.value;
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
          cellRenderer: 'micCountTextReaderer',
          cellClass: 'opMicCount',
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
          cellRenderer: 'spCountTextReaderer',
          cellClass: 'opReservation',
        },
        {
          headerName: '표준작업시간(분)',
          field: 'ARBEI',
          sortable: false,
          editable: false,
          cellClass: 'opStandTime',
        },
        {
          headerName: '표준작업인원(Person)',
          field: 'ANZZL',
          sortable: false,
          editable: false,
          cellClass: 'opStandPerson',
        },
        {
          headerName: 'PM 문서',
          field: 'fileText',
          cellStyle: { textAlign: 'center' },
          cellRenderer: 'fileTextReaderer',
          sortable: false,
          editable: false,
        },
        {
          headerName: '사진',
          field: 'fileImg',
          cellStyle: { textAlign: 'center' },
          cellRenderer: 'fileImgReaderer',
          sortable: false,
          editable: false,
        },
        {
          headerName: '동영상',
          field: 'fileMov',
          cellStyle: { textAlign: 'center' },
          cellRenderer: 'fileMovReaderer',
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
        {
          hide: true,
          field: 'SLWID',
        },
        {
          hide: true,
          field: 'USE04',
        },
      ],
      defaultColDef: {
        editable: true,
        resizable: true,
        cellStyle: { color: 'black', 'background-color': 'white' },
        lockPosition: true,
        suppressKeyboardEvent: function(event){
          const params = {
            editing: false,
          };
          console.log('event: ', event);
          return params;
        }
      }, // 스타일 추가해봄. 아직 실험예정.
      editType: 'fullRow',
      components: {
        ktext1CellRenderer: this.Ktext1CellRenderer,
        opGubunCellRenderer: this.OpGubunCellRenderer,
      },
      frameworkComponents: {
        // TestRenderer,
        modelCellRenderer: this.ModelCellRenderer,
        fileTextReaderer: FileTextReaderer,
        fileImgReaderer: FileImgReaderer,
        fileMovReaderer: FileMovReaderer,
        micCountTextReaderer: MicCountTextReaderer,
        spCountTextReaderer: SpCountTextReaderer,
        ktext1select: Ktext1select,
        opGubunSelect: OpGubunSelect,
      },
      ktxt1Value: '',
      excelStyles: [
        {
          id: 'opNum',
          alignment:{
            horizontal: 'Center',
          },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
        },
        {
          id: 'opDes',
          alignment:{
            horizontal: 'left',
          },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
          dataType: 'string',
        },
        {
          id: 'opGubun',
          alignment:{
            horizontal: 'Center',
          },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
        },
        {
          id: 'opRotate',
          alignment:{
            horizontal: 'Center',
          },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
        },
        {
          id: 'opMicCount',
          alignment:{
            horizontal: 'right',
          },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
        },
        {
          id: 'opReservation',
          alignment:{
            horizontal: 'right',
          },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
        },
        {
          id: 'opStandTime',
          alignment:{
            horizontal: 'right',
          },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
        },
        {
          id: 'opStandPerson',
          alignment:{
            horizontal: 'right',
          },
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
        },
        {
          id: 'header',
          borders: {
            borderBottom: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderLeft: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderRight: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            },
            borderTop: {
                color: "#000000",
                lineStyle: 'Continuous',
                weight: 1,
            }
          },
          font: {
            fontName: 'Calibri',
            size: 9,
          },
          alignment:{
            horizontal: 'Center',
            shrinkToFit: 'true',
          },
        },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('Operation_nextProps: ', nextProps);
    const columnDefsTamp = this.state.columnDefs.slice();
    console.log('columnDefsTamp: ', columnDefsTamp);
    columnDefsTamp[4].cellEditorParams.values = nextProps.pmTypeCombo;
    columnDefsTamp[3].cellEditorParams.values = nextProps.pmTypeCombo2;
    // columnDefsTamp[9].cellEditorParams.values = nextProps.stratCombo;
    console.log('nextProps.pmTypeCombo: ', nextProps.pmTypeCombo);
    console.log('nextProps.pmTypeCombo2: ', nextProps.pmTypeCombo2);
    this.setState({
      columnDefs: columnDefsTamp,
      ktxt1Value: '',
    });
    // for (let i = 0; i < this.props.pmSheetDataList.length; i += 1) {
    //   this.gridApi.refreshCells({force: true, rowNodes: [this.gridApi.getDisplayedRowAtIndex(i)]});
    // }
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.gridApi.updateRowData({ remove: selectedData }); 
    //
  }

  // eslint-disable-next-line class-methods-use-this
  onGridReady = (params) => {
    const { onGridReady } = this.props;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    onGridReady(params);
  };

  handleWorkTimeClicked = () => {
    const { workTimeClickedReturn } = this.props;
    console.log('handleWorkTimeClicked');
    console.log('this.props.pmSheetDataList: ', this.props.pmSheetDataList);
    // 워크타임 예외처리 아직안됨.
    if (this.props.pmSheetDataList[0].PLNAL === null ||
      this.props.pmSheetDataList[0].PLNAL === undefined ||
      this.props.pmSheetDataList[0].PLNNR === undefined ||
      this.props.pmSheetDataList[0].PLNNR === '' ||
      this.props.pmSheetDataList[0].PLNAL === '') {
      feed.error('값을 선택해주세요.');
    } else {
      const param = {
        PARAM_PLNAL: this.props.pmSheetDataList[0].PLNAL, // 'F00466',
        PARAM_PLNNR: this.props.pmSheetDataList[0].PLNNR, // '60',
      };
      workTimeClickedReturn(param);
    }
  };

  Ktext1CellRenderer = (params) => { //eslint-disable-line
    console.log('Ktext1CellRenderer: ', params);
    return params.value;
  };
  OpGubunCellRenderer = (params) => { //eslint-disable-line
    console.log('OpGubunCellRenderer: ', params);
    return params.value;
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
      OPGUBUN: e.data.OP_GUBUN,
    };
    cellClickedReturn(param);
  };

  addLineToTheSheet = () => {
    const { m167OperationCreateRow } = this.props;
    m167OperationCreateRow();
  };

  ModelCellRenderer = (params) => { //eslint-disable-line
    console.log('malang3..', params);
    const returnVal = [];
    if (params.value.length > 1) {
      if (params.NAME !== 'undefined') {
        const modelName = params.value.map(modelKey => modelKey.NAME).slice();
        // const modelName = ['qkqq'];
        returnVal.push(modelName);
      } else {
        returnVal.push(params.value);
      }
    }
    return returnVal;
  };


  render() {
    const {
      pmSheetDataList,
    } = this.props;

    return (
      <div
        className="ag-theme-balham"
        style={{ height: '400px', width: '100%' }}
      >
          <AgGridReact
            // headerHeight="40"
            rowSelection="multiple"
            components={this.state.components}
            enableSorting={true}
            enableFilter={false}
            columnDefs={this.state.columnDefs}
            rowData={pmSheetDataList}
            defaultColDef={this.state.defaultColDef}
            suppressRowClickSelection={true}
            frameworkComponents={this.state.frameworkComponents}
            editType={this.state.editType}
            // onCellClicked={this.handleCellClicked}
            // eslint-disable-next-line react/jsx-no-bind
            onGridReady={this.onGridReady}
            suppressClickEdit={true}
            onSelectionChanged={this.onSelectionChanged}
            addLineToTheSheet={this.addLineToTheSheet}
            animateRows={true}
            stopEditingWhenGridLosesFocus={false}
            MicCountTextReturn={this.handleCellClicked}
            SpCountTextReturn={this.handleCellClicked}
            enableCellChangeFlash={true}
            excelStyles={this.state.excelStyles}
            suppressCellSelection={false}
          />
      </div>
    );
  }
}

Grid.defaultProps = {
  pmSheetDataList: [],
  pmTypeCombo: [],
  pmTypeCombo2: [],
};

Grid.propTypes = {
  pmSheetDataList: PropTypes.array,
  cellClickedReturn: PropTypes.func.isRequired,
  workTimeClickedReturn: PropTypes.func.isRequired,
  m167OperationCreateRow: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  pmTypeCombo: PropTypes.array,
  pmTypeCombo2: PropTypes.array,
};
export default Grid;
