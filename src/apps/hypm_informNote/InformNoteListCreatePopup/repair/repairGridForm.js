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
          width: 250,
          cellEditor: "searchButton",
          cellEditorParams: {
            values: 'UNIT',
            PARAM_KATALOGART: 'B',
            PARAM_ZTPM_KATALOGART: 'B',
            PARAM_CODEGRUPPE: 'F01297',
            PARAM_ARBPL: this.props.searchState.sdpt,
            comboType: 'COMBO_CODING_TYPE4',
          },
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
            PARAM_CODEGRUPPE: 'F01297',
            PARAM_ARBPL: this.props.searchState.sdpt,
            comboType: 'COMBO_CODING_TYPE5',
          },
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
            PARAM_CODEGRUPPE: 'F0024790',
            PARAM_ARBPL: this.props.searchState.sdpt,
            comboType: 'COMBO_CODING_TYPE5',
          },
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
            PARAM_CODEGRUPPE: 'F01663',
            PARAM_ARBPL: this.props.searchState.sdpt,
            comboType: 'COMBO_CODING_TYPE4',
          },
        },
        { headerName: '조치 및 결과', field: 'RESULT', width: 550 },
        { headerName: '조치자', field: 'ACTION_BY', width: 250 },
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

    // params.api.sizeColumnsToFit();
  }

  onRowSelected = (event) => {
    if (event.node.selected) {
      const selectedRows = event.api.getSelectedRows();
      this.props.clickRowData(selectedRows[0].ITEM_NO);
    }
  }

  onRowEditingStarted = (event) => {
  }

  onRowEditingStopped = (event) => {
    const { unitCode, typeCode, causeCode, partCode, Item } = this.props;
    const rowIndex = event.rowIndex;
    let OTEIL = {};
    let FECOD = {};
    let URCOD = {};
    let MNCOD = {};
    if (rowIndex===unitCode.rowIndex) {
      OTEIL = unitCode.value;
    }
    if (rowIndex===typeCode.rowIndex) {
      FECOD = typeCode.value;
    }
    if (rowIndex===causeCode.rowIndex) {
      URCOD = causeCode.value;
    }
    if (rowIndex===partCode.rowIndex) {
      MNCOD = partCode.value;
    }
    const data = {
      OTEIL, FECOD, URCOD, MNCOD
    }
    event.data.OTEIL = OTEIL;
    event.data.FECOD = FECOD;
    event.data.URCOD = URCOD;
    event.data.MNCOD = MNCOD;
    console.log(event);
    console.log(Item);
    this.props.handleUpdateRepairList(Item);
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
          // suppressRowClickSelection={true}
          onRowSelected={this.onRowSelected}
          onRowEditingStopped={this.onRowEditingStopped}
          onRowEditingStarted={this.onRowEditingStarted}
          editType={this.state.editType}
          onGridReady={this.onGridReady}
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
  unitCode: undefined,
  typeCode: undefined,
  causeCode: undefined,
  partCode: undefined,
};

const mapStateToProps = createStructuredSelector({
  // unitCode: selectors.makeUnitCode(),
  // typeCode: selectors.makeTypeCode(),
  // causeCode: selectors.makeCauseCode(),
  // partCode: selectors.makePartCode(),
  // updateRepairList: selectors.makeUpdateRepairList(),
});


export function mapDispatchToProps(dispatch) {
  return {
    handleUpdateRepairList: value => dispatch(actions.updateRepairList(value)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(repairGridForm);
