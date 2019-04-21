import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import { LicenseManager } from 'ag-grid-enterprise';
// import ModelCellRenderer from './cellRenderer/ModelCellRenderer';
// import CustomSelectBox from './cellRenderer/CustomSelectBox';

// LicenseManager.setLicenseKey('5095db85700c871b2d29d9537cd451b3');
import HeaderKtextReaderer from './cellRenderer/HeaderKtextReaderer';
import PlanCheckCntReaderer from './cellRenderer/PlanCheckCntReaderer';
import EqktxSelect from './CustomEdit/EqktxSelect';
import TxtSelect from './CustomEdit/TxtSelect';
import Ktext3select from './CustomEdit/Ktext3select';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: '',
          field: 'chk',
          checkboxSelection: true,
          sortable: false,
          lockPosition: true,
          resizable: false,
          width: 40,
        },
        { headerName: 'SDPT', field: 'KTEXT2', width: 105 },
        {
          headerName: 'Model',
          field: 'EQKTX',
          width: 105,
          editable: true,
          cellRenderer: 'eqktxCellRenderer',
          cellEditor: 'eqktxSelect',
          cellEditorParams: {
            cellRenderer: 'eqktxCellRenderer',
            values: [],
          },
        },
        {
          headerName: 'PM 유형',
          field: 'TXT',
          width: 110,
          editable: true,
          cellRenderer: 'txtCellRenderer',
          cellEditor: 'txtSelect',
          cellEditorParams: {
            cellRenderer: 'txtCellRenderer',
            values: [],
          },
        },
        {
          headerName: 'GC',
          field: 'PLNAL',
          width: 70,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'HyPM명',
          field: 'HEADER_KTEXT',
          // cellStyle: { fontWeight: 'bold', fontSize: '13px', color: 'blue' },
          width: 200,
          editable: true,
          // cellEditor: 'agCellEditor',
          cellRenderer: 'headerKtextReaderer',
        },
        {
          headerName: 'Plan 영향 List',
          field: 'planCheckCnt',
          // cellStyle: { fontWeight: 'bold', fontSize: '13px', color: 'blue' },
          width: 120,
          cellStyle: { textAlign: 'center' },
          cellRenderer: 'planCheckCntReaderer',
        },
        {
          headerName: 'Revision',
          field: 'REVISION',
          width: 90,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'Active',
          field: 'ACTIVE',
          width: 90,
          cellStyle: { textAlign: 'center' },
        },
        // { headerName: 'PM 전략', field: 'KTEXT3', width: 150 },
        {
          headerName: 'PM 전략',
          field: 'KTEXT3',
          width: 150,
          editable: false,
          cellRenderer: 'ktext3CellRenderer',
          cellEditor: 'ktext3select',
          cellEditorParams: {
            cellRenderer: 'ktext3CellRenderer',
            values: [],
          },  
          // editable: false,
          // cellRenderer: '',
          // cellEditor: '',
          // cellEditorParams: {
          //   cellRenderer: '',
          //   values: [],
          // },  
        },
        {
          headerName: '최종수정자',
          field: 'MODIFY_NM',
          width: 105,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: '최종수정일',
          field: 'MODIFY_DT',
          width: 105,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: '결제상태',
          field: 'STATUS_DESC',
          width: 90,
          cellStyle: { textAlign: 'center' },
        },
        { headerName: 'Comment', field: 'REQ_COMMENT', width: 400 },
        {
          headerName: 'AS-IS',
          field: 'ASIS_COMMENT',
          width: 200,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'TO-BE',
          field: 'TOBE_COMMENT',
          width: 200,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: '기안자',
          field: 'REQ_NAME',
          width: 105,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: '기안일자',
          field: 'REQ_DT',
          width: 105,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: '승인자',
          field: 'APPROVE_NAME',
          width: 90,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: '승인일자',
          field: 'APPROVE_DT',
          width: 105,
          cellStyle: { textAlign: 'center' },
        },
        {
          hide: true,
          field: 'BEBER',
        },
        {
          hide: true,
          field: 'STATUS',
        },
        {
          hide: true,
          field: 'PLNNR',
        },
        {
          hide: true,
          field: 'ARBPL',
        },
        {
          hide: true,
          field: 'STRAT',
        },
        {
          hide: true,
          field: 'ROW_TYPE',
        },
        {
          hide: true,
          field: 'VERWE',
        },
        {
          hide: true,
          field: 'U_ID',
        },
        {
          hide: true,
          field: 'APPROVE_ID',
        },
        {
          hide: true,
          field: 'FING',
        },
        {
          hide: true,
          field: 'REQ_ID',
        },
      ],
      defaultColDef: {
        resizable: true,
      },
      // frameworkComponents: {
      //   // modelCellRenderer: this.ModelCellRenderer,
      //   // modelCellRenderer2: this.ModelCellRenderer2,
      //   // customSelectBox: CustomSelectBox,
      // },
      components: {
        eqktxCellRenderer: this.EqktxCellRenderer,
        txtCellRenderer: this.TxtCellRenderer,
        ktext3CellRenderer: this.Ktext3CellRenderer,
      },
      frameworkComponents: {
        headerKtextReaderer: HeaderKtextReaderer,
        planCheckCntReaderer: PlanCheckCntReaderer,
        eqktxSelect: EqktxSelect,
        txtSelect: TxtSelect,
        ktext3select: Ktext3select,
      },
      editType: 'fullRow',

      eqktxValue: '',
      txtValue: '',
      ktxt3Value: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('malang.nextProps', nextProps);
    const columnDefsTamp = this.state.columnDefs.slice();
    columnDefsTamp[2].cellEditorParams.values = nextProps.modelList;
    columnDefsTamp[3].cellEditorParams.values = nextProps.pmTypeCombo;
    columnDefsTamp[9].cellEditorParams.values = nextProps.stratCombo;

    this.setState({
      columnDefs: columnDefsTamp,
    });
  }

  onGridReady = (params) => {
    const { onGridReady } = this.props;
    onGridReady(params);
    this.gridApi = params.api;
  };

  EqktxCellRenderer = (params) => { //eslint-disable-line
    return params.value;
  };

  TxtCellRenderer = (params) => { //eslint-disable-line
    return params.value;
  };

  Ktext3CellRenderer = (params) => { //eslint-disable-line
    return params.value;
  };

  // ktest3 = (params) => {
  //   console.log('malang..ktest3', params);  
  //   return Ktext3select;
  // };
  handleCellClicked = (e) => {
    // 파라미터 추가
    const { cellClickedReturn } = this.props;
    console.log('e.data: ', e.data);
    const param = {
      PARAM_PLNAL: e.data.PLNAL,
      PARAM_PLNNR: e.data.PLNNR,
      PARAM_REVISION: e.data.REVISION,
      field: e.colDef.field,
      planCheckCnt: e.data.planCheckCnt,
      PARAM_ARBPL: e.data.KTEXT2,
      PARAM_EQKTX: e.data.EQKTX,
      PARAM_TXT: e.data.TXT,
      PARAM_BEBER: e.data.BEBER,
      // PARAM_LTXA1: e.data.LTXA1,
      PARAM_KTEX1: e.data.KTEX1,
      PARAM_STATUS: e.data.STATUS,
      HEADER_KTEXT: e.data.HEADER_KTEXT,
      PARAM_U_ID: e.data.U_ID,
      PARAM_STRAT: e.data.STRAT,
      ACTIVE: e.data.ACTIVE,
    };
    cellClickedReturn(param);
  };

  // eqktxSelectReturn = (param) => {
  //   const rowNode = this.gridApi.getRowNode(param.node.id);
  //   rowNode.setDataValue('PLNNR', param.code);
  // };

  // txtSelectReturn = (param) => {
  //   const rowNode = this.gridApi.getRowNode(param.node.id);
  //   rowNode.setDataValue('VERWE', param.code);
  // };

  // ktxt3SelectReturn = (param) => {
  //   const rowNode = this.gridApi.getRowNode(param.node.id);
  //   rowNode.setDataValue('STRAT', param.code);
  // };

  render() {
    const {
      pmSheetDataList,
      // onAddRow,
    } = this.props;

    // const onCellValueChanged = (param) => {
    //   console.log('malang..onCellValueChanged', param);
    //   if (param.colDef.field === 'VERWE' && param.data.VERWE !== '') {
    //     const columnDefsTamp = this.state.columnDefs.slice();
    //     // pm전략 select 박스 활성화
    //     if (param.data.VERWE === 'F1' && param.data.ROW_TYPE === 'ADD') {
    //       columnDefsTamp[9].editable = true;
    //       this.gridApi.setColumnDefs(columnDefsTamp);
    //       this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'TXT' });
    //       // this.setState({
    //       //   columnDefs: columnDefsTamp,
    //       // });
    //     } else {
    //       columnDefsTamp[9].editable = false;
    //       this.gridApi.setColumnDefs(columnDefsTamp);
    //       const rowNode = this.gridApi.getRowNode(param.node.id);
    //       rowNode.setDataValue('KTEXT3', '');
    //       this.setState({
    //         ktxt3Value: '',
    //       });
    //       this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'TXT' });
    //     }
    //   }
    // };

    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '400px',
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection="single"
          enableSorting={true}
          // enableFilter={tr ue}
          columnDefs={this.state.columnDefs}
          rowData={pmSheetDataList}
          defaultColDef={this.state.defaultColDef}
          // suppressRowClickSelection={true}
          components={this.state.components}
          editType={this.state.editType}
          // onCellClicked={this.handleCellClicked}
          onGridReady={this.onGridReady}
          // customSelectBoxReturn={this.customSelectBoxReturn}
          // suppressRowTransform={true}
          // editType="fullRow"
          // editType={this.state.editType}
          // onCellValueChanged={onCellValueChanged}
          frameworkComponents={this.state.frameworkComponents}
          HeaderKtextReturn={this.handleCellClicked}
          eqktxSelectReturn={this.eqktxSelectReturn}
          txtSelectReturn={this.txtSelectReturn}
          ktxt3SelectReturn={this.ktxt3SelectReturn}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  pmSheetDataList: [],
  modelList: [],
  pmTypeCombo: [],
  stratCombo: [],
};

Grid.propTypes = {
  pmSheetDataList: PropTypes.array,
  cellClickedReturn: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  modelList: PropTypes.array,
  pmTypeCombo: PropTypes.array,
  stratCombo: PropTypes.array,
};
export default Grid;
