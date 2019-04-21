import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import ModelCellRenderer from './cellRenderer/ModelCellRenderer';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: '',
          field: '',
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
          // cellRenderer: 'modelCellRenderer',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            // cellRenderer: 'modelCellRenderer',
            values: props.modelList,
            // values: [
            //   { name: 'Ireland', code: 'IE' },
            //   { name: 'UK', code: 'UK' },
            //   { name: 'France', code: 'FR' },
            // ],
          },
        },
        {
          headerName: 'PM 유형',
          field: 'TXT',
          width: 110,
          cellStyle: { textAlign: 'center' },
        },
        {
          headerName: 'GC',
          field: 'PLNAL',
          width: 70,
          cellStyle: { textAlign: 'center' },
          editable: true,
        },
        {
          headerName: 'PM Sheet',
          field: 'HEADER_KTEXT',
          cellStyle: { fontWeight: 'bold', fontSize: '13px', color: 'blue' },
          width: 200,
        },
        {
          headerName: 'Plan 영향 List',
          field: 'planCheckCnt',
          cellStyle: { fontWeight: 'bold', fontSize: '13px', color: 'blue' },
          width: 20,
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
        { headerName: 'PM 전략', field: 'KTEXT3', width: 150 },
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
      ],
      defaultColDef: {
        // editable: true,
        resizable: true,
        // cellStyle: { color: 'black', 'background-color': 'white' },
        // lockPosition: true,
        editType: 'fullRow',
      },
      frameworkComponents: {
        modelCellRenderer: this.ModelCellRenderer,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('malang1..', this.state.columnDefs);
    console.log('malang2..', nextProps);
    console.log('malang4..', this.state.frameworkComponents);


    // // const modelName = nextProps.modelList.map(modelKey => modelKey.NAME).slice();
    // const modelList = nextProps.modelList.slice();
    // // const modelName = [
    // //   { name: 'Ireland', code: 'IE' },
    // //   { name: 'UK', code: 'UK' },
    // //   { name: 'France', code: 'FR' },
    // // ];
    // const columnDefsTamp = this.state.columnDefs.slice();
    // columnDefsTamp[2].cellEditorParams.values = modelList;

    // // const frameworkComponentsTamp = this.state.frameworkComponents;
    // // frameworkComponentsTamp.modelCellRenderer(modelName);

    // // this.state.frameworkComponents.modelCellRenderer(modelName);
    // // const frameworkComponentsTamp = this.state.frameworkComponents.slice();
    // // frameworkComponentsTamp.modelCellRenderer = this.ModelCellRenderer(modelName);

    // this.setState({
    //   columnDefs: columnDefsTamp,
    //   // frameworkComponents: frameworkComponentsTamp,
    // });
  }

  onGridReady = (params) => {
    // this.gridApi = params.api;
    const { onGridReady } = this.props;
    onGridReady(params);
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
    // if (params.length > 0) {
    //   returnVal.push(params);
    // }
    return returnVal;
  };

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
    };

    cellClickedReturn(param);
  };

  render() {
    const {
      pmSheetDataList,
      // onAddRow,
    } = this.props;

    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '100px',
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          // enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={pmSheetDataList}
          defaultColDef={this.state.defaultColDef}
          suppressRowClickSelection={true}
          frameworkComponents={this.state.frameworkComponents}
          editType={this.state.editType}
          onCellClicked={this.handleCellClicked}
          onGridReady={this.onGridReady}
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  pmSheetDataList: [],
  modelList: [],
};

Grid.propTypes = {
  pmSheetDataList: PropTypes.array,
  cellClickedReturn: PropTypes.func.isRequired,
  onGridReady: PropTypes.func.isRequired,
  modelList: PropTypes.array,
};
export default Grid;
