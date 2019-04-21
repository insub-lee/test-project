import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import * as selectors from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import searchButton from './searchbutton';

class repairGridForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: 'UNIT',
          field: 'OTEIL_NM',
          width: 240,
          cellEditor: "searchButton",
          cellEditorParams: {
            values: 'UNIT',
            PARAM_KATALOGART: 'B',
            PARAM_ZTPM_KATALOGART: 'B',
            PARAM_CODEGRUPPE: this.props.eqart,
            PARAM_ARBPL: this.props.searchState.sdpt,
            comboType: 'COMBO_CODING_TYPE4',
          },
          sortable: false,
        },
        {
          headerName: '유형/현상',
          field: 'FECOD_NM',
          width: 250,
          cellEditor: 'searchButton',
          cellEditorParams: {
            values: '유형/현상',
            PARAM_KATALOGART: 'C',
            PARAM_ZTPM_KATALOGART: 'B',
            PARAM_CODEGRUPPE: this.props.eqart,
            PARAM_ARBPL: this.props.searchState.sdpt,
            comboType: 'COMBO_CODING_TYPE5',
          },
          sortable: false,
        },
        { 
          headerName: '원인',
          field: 'URCOD_NM',
          width: 250 ,
          cellEditor: 'searchButton',
          cellEditorParams: {
            values: '원인',
            PARAM_KATALOGART: '5',
            PARAM_ZTPM_KATALOGART: 'C',
            PARAM_CODEGRUPPE: '',
            PARAM_ARBPL: this.props.searchState.sdpt,
            comboType: 'COMBO_CODING_TYPE5',
          },
          sortable: false,
        },
        { 
          headerName: '원인부품(군)',
          field: 'MNCOD_NM',
          width: 250,
          cellEditor: 'searchButton',
          cellEditorParams: {
            values: '원인부품(군)',
            PARAM_KATALOGART: 'A',
            PARAM_ZTPM_KATALOGART: 'B',
            PARAM_CODEGRUPPE: this.props.eqart,
            PARAM_ARBPL: this.props.searchState.sdpt,
            comboType: 'COMBO_CODING_TYPE4',
          },
          sortable: false,
        },
        { headerName: '조치 및 결과', field: 'RESULT', width: 550, sortable: false, },
        { headerName: '조치자', field: 'ACTION_BY', width: 230, editable: false, sortable: false, },
        { headerName: 'OTEIL', field: 'OTEIL', width: 0, hide: 'true' },
        { headerName: 'FECOD', field: 'FECOD', width: 0, hide: 'true' },
        { headerName: 'URCOD', field: 'URCOD', width: 0, hide: 'true' },
        { headerName: 'MNCOD', field: 'MNCOD', width: 0, hide: 'true' },
      ],
      rowSelection: 'single',
      defaultColDef: { editable: true, resizable: false },
      editType: 'fullRow',
      frameworkComponents: {
        searchButton: searchButton,
      },
      suppressClickEdit: false,
      domLayout: 'autoHeight',
    };
  }

  componentDidMount() {
    // console.log(this.props.Item[this.props.Item.length - 1]);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      // if (nextProps.Item[nextProps.Item.length - 1].ITEM_NO === undefined) {
        console.log(nextProps);
      // }
    }
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onRowSelected = (event) => {
    if (event.node.selected) {
      const selectedRows = event.api.getSelectedRows();
      const rowIndex = event.rowIndex;
      this.props.clickRowData(selectedRows[0].ITEM_NO, rowIndex);
    }
  }

  //데이터가 존재하는 셀 클릭시 편집 불가
  onCellClicked  = (event) => {
    if(event.data.OTEIL){
      this.setState({
        suppressClickEdit: true,
        defaultColDef: {
          editable: false,
        }
      });
    } else if(event.data.FECOD){
      this.setState({
        suppressClickEdit: true,
        defaultColDef: {
          editable: false,
        }
      });
    } else if(event.data.URCOD){
      this.setState({
        suppressClickEdit: true,
        defaultColDef: {
          editable: false,
        }
      });
    } else if(event.data.MNCOD){
      this.setState({
        suppressClickEdit: true,
        defaultColDef: {
          editable: false,
        }
      });
    } else if(event.data.RESULT){
      this.setState({
        suppressClickEdit: true,
        defaultColDef: {
          editable: false,
        }
      });
    } else {
      this.setState({
        suppressClickEdit: false,
        defaultColDef: {
          editable: true,
        }
      });
    }
  }

  onRowEditingStarted = (event) => {
    // console.log(event);
  }

  onRowEditingStopped = (event) => {
    const { unitCode, typeCode, causeCode, partCode} = this.props;
    let {Item} = this.props;
    const rowIndex = event.rowIndex;
    let OTEIL = undefined;
    let FECOD = undefined;
    let URCOD = undefined;
    let MNCOD = undefined;
    if (unitCode && rowIndex===unitCode.rowIndex) {
      OTEIL = unitCode.value;
    }
    if (typeCode && rowIndex===typeCode.rowIndex) {
      FECOD = typeCode.value;
    }
    if (causeCode && rowIndex===causeCode.rowIndex) {
      URCOD = causeCode.value;
    }
    if (partCode && rowIndex===partCode.rowIndex) {
      MNCOD = partCode.value;
    }
    event.data.OTEIL = OTEIL;
    event.data.FECOD = FECOD;
    event.data.URCOD = URCOD;
    event.data.MNCOD = MNCOD;
    let removeNo = 'noRemoveData';
    Item.map(data => {
      if(data.ITEM_NO){
        removeNo = data.ITEM_NO;
      }
    });
    Item = Item.filter(data => data.ITEM_NO !== removeNo);
    console.log(Item);
    this.props.handleUpdateRepairList(Item);
    // reapir rowGrid 데이터 초기화
    this.resetRepairCode();
  }

  resetRepairCode = () => {
    this.props.handleSetUnitCode(undefined);
    this.props.handleSetTypeCode(undefined);
    this.props.handleSetCauseCode(undefined);
    this.props.handleSetPartCode(undefined);
    this.props.handleResetUnitList(undefined);
    this.props.handleResetTypeList(undefined);
    this.props.handleResetCauseList(undefined);
    this.props.handleResetPartList(undefined);
  }

  render() {
    const {
      Item,
    } = this.props; 
    // if (Item.length === 0) {
    //   return (
    //     <div
    //       className="ag-theme-balham"
    //       style={{
    //       width: '100%',
    //       }}
    //     >
    //       <AgGridReact
    //         rowSelection={this.state.rowSelection}
    //         enableSorting={true}
    //         enableFilter={true}
    //         columnDefs={this.state.columnDefs}
    //         rowData={Item}
    //         frameworkComponents={this.state.frameworkComponents}
    //         defaultColDef={this.state.defaultColDef}
    //         // suppressRowClickSelection={true}
    //         onRowSelected={this.onRowSelected}
    //         onRowEditingStopped={this.onRowEditingStopped}
    //         onRowEditingStarted={this.onRowEditingStarted}
    //         editType={this.state.editType}
    //         onGridReady={this.onGridReady}
    //       />
    //     </div>
    //   );
    // }
    return (
      <div
        className="ag-theme-balham"
        style={{
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection={this.state.rowSelection}
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={Item}
          frameworkComponents={this.state.frameworkComponents}
          defaultColDef={this.state.defaultColDef}
          suppressClickEdit={this.state.suppressClickEdit}
          onRowSelected={this.onRowSelected}
          onRowEditingStopped={this.onRowEditingStopped}
          onRowEditingStarted={this.onRowEditingStarted}
          editType={this.state.editType}
          onGridReady={this.onGridReady}
          onCellClicked  ={this.onCellClicked}
          domLayout={this.state.domLayout}
          suppressCellSelection={true}
        />
      </div>
    );
  }
}

repairGridForm.defaultProps = {
  Item: {},
  searchState: {},
};

repairGridForm.propTypes = {
  Item: PropTypes.array,
  clickRowData: PropTypes.func.isRequired,
  handleUpdateRepairList: PropTypes.func,
  searchState: PropTypes.object,
  handleSetUnitCode: PropTypes.func,
  handleSetTypeCode: PropTypes.func,
  handleSetCauseCode: PropTypes.func,
  handleSetPartCode: PropTypes.func,
  handleResetUnitList: PropTypes.func,
  handleResetTypeList: PropTypes.func,
  handleResetCauseList: PropTypes.func,
  handleResetPartList: PropTypes.func,
  unitCode: '',
  typeCode: '',
  causeCode: '',
  partCode: '',
};

const mapStateToProps = createStructuredSelector({
  unitCode: selectors.makeUnitCode(),
  typeCode: selectors.makeTypeCode(),
  causeCode: selectors.makeCauseCode(),
  partCode: selectors.makePartCode(),
  // updateRepairList: selectors.makeUpdateRepairList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleUpdateRepairList: value => dispatch(actions.updateRepairList(value)),
    handleSetUnitCode: value => dispatch(actions.loadingSetUnitCode(value)),
    handleSetTypeCode: value => dispatch(actions.loadingSetTypeCode(value)),
    handleSetCauseCode: value => dispatch(actions.loadingSetCauseCode(value)),
    handleSetPartCode: value => dispatch(actions.loadingSetPartCode(value)),
    handleResetUnitList: value => dispatch(actions.resetUnitList(value)),
    handleResetTypeList: value => dispatch(actions.resetTypeList(value)),
    handleResetCauseList: value => dispatch(actions.resetCauseList(value)),
    handleResetPartList: value => dispatch(actions.resetPartList(value)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(repairGridForm);
