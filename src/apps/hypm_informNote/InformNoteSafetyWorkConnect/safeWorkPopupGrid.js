import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import PropTypes from 'prop-types';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import { createStructuredSelector } from 'reselect';
// import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import * as actions from '../note/actions';
// import * as selectors from '../note/selectors';
// import reducer from '../note/reducer';
// import saga from '../note/saga';

class safeWorkPopupGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: '작업등급', field: 'WORKGRADE', width: 150 },
        { headerName: '작업번호', field: 'WORK_NO', width: 130 },
        { headerName: '작업일', field: 'WORK_DD', width: 130 },
        { headerName: '작업위치', field: 'WORK_LOC_DTL', width: 130 },
        { headerName: '작업명', field: 'WORK_NAME', width: 130 },
        { headerName: '작업업체', field: 'WORK_VENDOR_NAME', width: 130 },
        { headerName: '담당자', field: 'RESP', width: 130 },
        { headerName: '감독자', field: 'MANGR_NAME', width: 130 },
      ],
      rowSelection: 'single',
      defaultColDef: { editable: true, resizable: false },
      editType: 'fullRow',
    };
  }

  componentDidMount() {
    // this.props.handleSafeWorkConnectSearch();
  }

  onRowSelected = (event) => {
    if (event.node.selected) {
      const selectData = event.data;
      this.props.clickRowData(selectData);
    }
  }

  render() {
     const { connectSearchList } = this.props;

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
          rowData={connectSearchList}
          onRowSelected={this.onRowSelected}
          defaultColDef={this.state.defaultColDef}
          // suppressRowClickSelection={true}
          editType={this.state.editType}
        />
      </div>
    );
  }
}


safeWorkPopupGrid.defaultProps = {
  connectSearchList: [],
};

safeWorkPopupGrid.propTypes = {
  connectSearchList: PropTypes.array,
  handleSafeWorkConnectSearch: PropTypes.func,
  clickRowData: PropTypes.func,
  connectSearchList: '',
};

// const mapStateToProps = createStructuredSelector({
//   // safeWorkPopData: selectors.makeSafeWorkPopData(),
// });

// export function mapDispatchToProps(dispatch) {
//   return {
//     handleSafeWorkPopData: value => dispatch(actions.safeWorkPopData(value)),
//   };
// }

// const withReducer = injectReducer({ key: 'gridsheet', reducer });
// const withSaga = injectSaga({ key: 'gridsheet', saga });
// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export default compose(
//   withReducer,
//   withConnect,
//   withSaga,
// )(safeWorkPopupGrid);
export default safeWorkPopupGrid;
