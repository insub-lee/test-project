import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { BtnSearchDkGray } from './buttons.style';
import Grid from './grid.js';


class InformNote extends PureComponent {
  constructor(props) {
    super(props);
    const { params } = props.match;
    const { PARAM } = params;
    let arrParam = [];
    arrParam = PARAM.split('|');

    this.state = {
      selectedRows: [],
      // insplot: post.insplot,
      PARAM_INSP_LOT: arrParam[0],
      // PARAM_OPEN_TYPE: arrParam[1],
      // PARAM_APPROVE_YN: arrParam[2],
      // PARAM_AUFNR: arrParam[3],
    };

    this.props.handleLoadingGridParam({ PARAM_INSP_LOT: this.state.PARAM_INSP_LOT });
  }

  onSelectionChanged = (params) => {
    this.gridApi = params.api;
    const selectedRow = this.gridApi.getSelectedRows();
    this.setState({
      selectedRows: selectedRow,
    });
  }

  handleSearch = () => {
    const {
      selectedRows,
    } = this.state;

    if (selectedRows.length === 0) {
      feed.error('선택된 항목이 없습니다');
    } else {
      // this.state.selectedRows.map(t => {return t.ANLZU });

      const ownCode = 'O';
      const pmSheetNo = this.state.PARAM_INSP_LOT;
      const operatorCodes = selectedRows.map(t => t.INSPOPER);
      const compSheetStatus = '';// 도급사 Sheet 상태
      const workOrderNo = '';

      let sUrl = '/sm/pmSheetList/PmSheetDetailPMCardPopup/';
      let sParam = '';
      sParam += pmSheetNo;
      sParam += '|';
      sParam += operatorCodes;
      sParam += '|';
      sParam += ownCode;
      sParam += '|';
      sParam += compSheetStatus;
      sParam += '|';
      sParam += workOrderNo;
      sUrl += sParam;
      const popOption = 'width=1200, height=850, toolbar=yes, resizable=yes, menubar=yes, status=yes, location=yes';
      window.open(
        sUrl,
        '',
        popOption,
      );
      window.close();
    }
  }

  render() {
    const {
      informNoteListCBMSelectList,
    } = this.props;

    return (

      <div>
        <div className="PMSheetTitle" style={{ height: '39px', backgroundColor: '#735a5a' }}>
          <br />
        </div>
        <div>
          <Grid
            informNoteListCBMSelectList={informNoteListCBMSelectList}
            onSelectionChanged={this.onSelectionChanged}
          />
        </div>
        <div style={{ padding: 20, textAlign: 'right' }}>
          <BtnSearchDkGray
            title="선택"
            className="searchBtn"
            onClick={this.handleSearch}
          >
          선택완료
          </BtnSearchDkGray>
        </div>
      </div>
    );
  }
}

InformNote.propTypes = {
  handleLoadingGridParam: PropTypes.func.isRequired,
  informNoteListCBMSelectList: PropTypes.array,
  match: PropTypes.object.isRequired,
};

InformNote.defaultProps = {
  informNoteListCBMSelectList: [],
};

const mapStateToProps = createStructuredSelector({
  informNoteListCBMSelectList: selectors.makeInformNoteListCBMSelectList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingGridParam: value => dispatch(actions.loadingGridParam(value)),
  };
}

const withReducer = injectReducer({ key: 'InformNoteListCBMSelectListPopup', reducer });
const withSaga = injectSaga({ key: 'InformNoteListCBMSelectListPopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(InformNote);
