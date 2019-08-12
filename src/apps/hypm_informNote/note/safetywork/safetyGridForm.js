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
import safetyButton from './safetyButton';
import * as actions from '../actions';
import * as selectors from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

class safetyGridForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { 
          headerName: '허가서번호',
          field: 'WORK_NO',
          width: 350,
          cellEditor: "safetyButton",
          cellEditorParams: {
            itemNoteNo: this.props.itemNoteNo,
            itemMaker: this.props.itemMaker,
            itemModel: this.props.itemModel,
          },
          sortable: false,
        },
        { headerName: 'STATUS', field: 'PRMS_PROGRESS_STATUS_NAME', width: 230, editable: false, sortable: false, },
        { headerName: '작업명', field: 'WORK_NAME', width: 400, editable: false, sortable: false, },
        { headerName: '작업일', field: 'WORK_DD', width: 200, editable: false, sortable: false, },
        { headerName: '작업시간', field: 'WORK_START_TIME', width: 200, editable: false, sortable: false, },
        { headerName: '담당자', field: 'RESP', width: 190, editable: false, sortable: false, },
        { headerName: '감독자', field: 'MANGR_NAME', width: 190, editable: false, sortable: false, },
      ],
      rowSelection: 'single',
      defaultColDef: { editable: true, resizable: false },
      editType: 'fullRow',
      frameworkComponents: {
        safetyButton: safetyButton,
      },
      suppressClickEdit: false,
      domLayout: 'autoHeight',
    };
  }

  onRowSelected = (event) => {
    if (event.node.selected) {
      const selectedRows = event.api.getSelectedRows();
      const rowIndex = event.rowIndex;
      this.props.clickRowData(selectedRows[0].WORK_NO, rowIndex);
    }
  }
  
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onRowEditingStopped = (event) => {
    const { safeWorkPopData } = this.props;
    let {Item} = this.props;
    if ( safeWorkPopData ) {
      const WORK_NO = safeWorkPopData.WORK_NO;
      const PRMS_PROGRESS_STATUS_NAME = safeWorkPopData.PRMS_PROGRESS_STATUS_NAME;
      const WORK_NAME = safeWorkPopData.WORK_NAME;
      const WORK_DD = safeWorkPopData.WORK_DD;
      const WORK_START_TIME = safeWorkPopData.WORK_START_TIME;
      const RESP = safeWorkPopData.RESP;
      const MANGR_NAME = safeWorkPopData.MANGR_NAME;
  
      event.data.WORK_NO = WORK_NO;
      event.data.PRMS_PROGRESS_STATUS_NAME = PRMS_PROGRESS_STATUS_NAME;
      event.data.WORK_NAME = WORK_NAME;
      event.data.WORK_DD = WORK_DD;
      event.data.WORK_START_TIME = WORK_START_TIME;
      event.data.RESP = RESP;
      event.data.MANGR_NAME = MANGR_NAME;
  
      let removeNo = 'noRemoveData';
      Item.map(data => {
        if(data.EQ_ID){
          removeNo = data.EQ_ID;
        }
      });
      Item = Item.filter(data => data.EQ_ID !== removeNo);
      this.props.handleUpdateSafeWorkList(Item);
      this.props.handleSafeWorkPopData(undefined);
      this.gridApi.refreshCells();
    }
  }

  //데이터가 존재하는 셀 클릭시 편집 불가
  onCellClicked  = (event) => {
    if(event.data.WORK_NO){
      this.setState({
        suppressClickEdit: true,
      });
    } else {
      this.setState({
        suppressClickEdit: false,
      });
    }
  }

  render() {
    const { Item } = this.props;
    return (
      <div
        className="ag-theme-balham"
        style={{
        height: 'auto',
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection={this.state.rowSelection}
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={Item}
          defaultColDef={this.state.defaultColDef}
          suppressClickEdit={this.state.suppressClickEdit}
          frameworkComponents={this.state.frameworkComponents}
          onRowSelected={this.onRowSelected}
          onCellClicked  ={this.onCellClicked}
          onRowEditingStopped={this.onRowEditingStopped}
          editType={this.state.editType}
          onGridReady={this.onGridReady}
          domLayout={this.state.domLayout}
        />
      </div>
    );
  }
}

safetyGridForm.defaultProps = {
  Item: {},
};

safetyGridForm.propTypes = {
  Item: PropTypes.array,
  clickRowData: PropTypes.func.isRequired,
  safeWorkPopData: PropTypes.object,
  handleUpdateSafeWorkList: PropTypes.func,
  updateSafeWorkList: PropTypes.array,
  handleSafeWorkPopData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  safeWorkPopData: selectors.makeSafeWorkPopData(),
  updateSafeWorkList: selectors.makeUpdateSafeWorkList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleUpdateSafeWorkList: value => dispatch(actions.updateSafeWorkList(value)),
    handleSafeWorkPopData: value => dispatch(actions.safeWorkPopData(value)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(safetyGridForm);
// export default safetyGridForm;
