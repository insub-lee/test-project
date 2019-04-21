import React, { PureComponent } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TechSafeDetailPop from './techSafeDetailPop'
import * as actions from '../actions';

class techSafeGridForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { 
          headerName: '요청항목',
          field: 'REQ_ITEM_NM',
          width: 480,
          cellEditor: 'richSelect',
          cellEditorParams: {
            values: [
               "PUMP점검 및 교체",
               "SCRUBBER점검",
               "PUMP/SCRUBBER점검",
            ]
          },
          sortable: false,
        },
        { headerName: 'Request Time', field: 'REQ_TIME', width: 240, editable: false, sortable: false, },
        { headerName: 'Status', field: 'REQ_STATUS_NM', width: 240, editable: false, sortable: false, },
        { headerName: 'Complete Time', field: 'REQ_ENDTIME', width: 240, editable: false, sortable: false, },
        { headerName: 'Work Time', field: 'WORK_TIME', width: 240, editable: false, sortable: false, },
        {
          headerName: '기술안전 인폼노트',
          field: 'IN_U_ID',
          width: 300,
          editable: false,
          cellRendererFramework: TechSafeDetailPop,
          sortable: false,
        },
        { headerName: 'REQ_ITEM', field: 'REQ_ITEM',width: 0, hide: 'true' },
      ],
      rowSelection: 'single',
      defaultColDef: { editable: true, resizable: false },
      editType: 'fullRow',
      // components: {
      //   techSafeDetailPop: this.techSafeDetailPop,
      // },
      suppressClickEdit: false,
      domLayout: 'autoHeight',
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onRowSelected = (event) => {
    if (event.node.selected) {
      const {eqId} = this.props;
      const rowIndex = event.rowIndex;
      const data = {
        ITEM_TECH_NO: event.data.ITEM_TECH_NO,
        REQ_ITEM: event.data.REQ_ITEM,
        REQ_ITEM_NM: event.data.REQ_ITEM_NM,
        IN_U_ID: event.data.IN_U_ID,
        EQ_ID: eqId,
      };
      this.props.clickRowData(data, rowIndex);
    }
  }

   //데이터가 존재하는 셀 클릭시 편집 불가
  handleCellClicked = (event) => {
    if(event.data.REQ_ITEM_NM){
      this.setState({
        suppressClickEdit: true,
      });
    } else if(event.data.REQ_TIME){
      this.setState({
        suppressClickEdit: true,
      });
    } else if(event.data.REQ_STATUS_NM){
      this.setState({
        suppressClickEdit: true,
      });
    } else if(event.data.REQ_ENDTIME){
      this.setState({
        suppressClickEdit: true,
      });
    } else if(event.data.WORK_TIME){
      this.setState({
        suppressClickEdit: true,
      });
    } else if(event.data.IN_U_ID){
      this.setState({
        suppressClickEdit: true,
      });
    } else if(event.data.REQ_ITEM){
      this.setState({
        suppressClickEdit: true,
      });
    } else {
      this.setState({
        suppressClickEdit: false,
      });
    }
  }

  onRowEditingStopped = (event) => {
    let {Item} = this.props;
    const REQ_ITEM_NM = event.data.REQ_ITEM_NM;
    if (REQ_ITEM_NM==='PUMP점검 및 교체') {
      event.data.REQ_ITEM = '0010';
    } else if (REQ_ITEM_NM==='SCRUBBER점검') {
      event.data.REQ_ITEM = '0020';
    } else if (REQ_ITEM_NM==='PUMP/SCRUBBER점검') {
      event.data.REQ_ITEM = '0030';
    }
    let removeNo = 'noRemoveData';
    Item.map(data => {
      if(data.ITEM_TECH_NO){
        removeNo = data.ITEM_TECH_NO;
      }
    });
    Item = Item.filter(data => data.ITEM_TECH_NO !== removeNo);
    this.props.handleUpdateTechSafeList(Item);
  }

  render() {
    const { Item } = this.props;

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
          defaultColDef={this.state.defaultColDef}
          suppressClickEdit={this.state.suppressClickEdit}
          onRowEditingStopped={this.onRowEditingStopped}
          onRowSelected={this.onRowSelected}
          editType={this.state.editType}
          onGridReady={this.onGridReady}
          onCellClicked  ={this.handleCellClicked}
          domLayout={this.state.domLayout}
        />
      </div>
    );
  }
}

techSafeGridForm.defaultProps = {
  Item: {},
};

techSafeGridForm.propTypes = {
  Item: PropTypes.array,
  clickRowData: PropTypes.func.isRequired,
  handleUpdateTechSafeList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    handleUpdateTechSafeList: value => dispatch(actions.updateTechSafeList(value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(techSafeGridForm);

