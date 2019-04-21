import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { Select } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import * as feed from 'components/Feedback/functions';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { BtnSearchDkGray } from './buttons.style';
import Grid from './grid.js';
import { BtnSearchDkGray } from './buttons.style';

// const Options = Select.Option;

class PmSheetOperationModeling extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arbpl: this.props.operationParam.PARAM_ARBPL,
      eqktx: this.props.operationParam.PARAM_EQKTX,
      txt: this.props.operationParam.PARAM_TXT,
      revision: this.props.operationParam.PARAM_REVISION,
      plnal: this.props.operationParam.PARAM_PLNAL,
      beber: this.props.operationParam.PARAM_BEBER,
      plnnr: this.props.operationParam.PARAM_PLNNR,
      save: this.props.save,
      ptype: '',
      status: this.props.operationParam.PARAM_STATUS,
    };
    this.props.handleLoadingFactoryParam(this.props.operationParam);
    this.props.handleLoadingSaveYn({ paramPlnnr: this.state.plnnr, paramPlnal: this.state.plnal, paramRevision: this.state.revision });
  }

  // componentDidMount() {
  //   this.props.handleLoadingFactoryParam(this.props.operationParam);
  // }

  componentWillUpdate(nextProps, nextState) { //eslint-disable-line
    if (this.props.operationParam.PARAM_PLNAL !== nextProps.operationParam.PARAM_PLNAL ||
      this.props.operationParam.PARAM_PLNNR !== nextProps.operationParam.PARAM_PLNNR ||
      this.props.operationParam.PARAM_REVISION !== nextProps.operationParam.PARAM_REVISION
    ) {
      this.props.handleLoadingFactoryParam(nextProps.operationParam);
      this.props.handleLoadingSaveYn({ paramPlnnr: nextProps.operationParam.PARAM_PLNNR, paramPlnal: nextProps.operationParam.PARAM_PLNAL, paramRevision: nextProps.operationParam.PARAM_REVISION });
    }
    if (this.props.operationParam.PARAM_ARBPL !== nextProps.operationParam.PARAM_ARBPL ||
      this.props.operationParam.PARAM_EQKTX !== nextProps.operationParam.PARAM_EQKTX ||
      this.props.operationParam.PARAM_TXT !== nextProps.operationParam.PARAM_TXT ||
      this.props.operationParam.PARAM_REVISION !== nextProps.operationParam.PARAM_REVISION ||
      this.props.operationParam.PARAM_PLNAL !== nextProps.operationParam.PARAM_PLNAL ||
      this.props.operationParam.PARAM_BEBER !== nextProps.operationParam.PARAM_BEBER ||
      this.props.save !== nextProps.save ||
      this.props.operationParam.PARAM_STATUS !== nextProps.operationParam.PARAM_STATUS
    ) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({
        arbpl: nextProps.operationParam.PARAM_ARBPL,
        // eslint-disable-next-line react/no-unused-state
        eqktx: nextProps.operationParam.PARAM_EQKTX,
        // eslint-disable-next-line react/no-unused-state
        txt: nextProps.operationParam.PARAM_TXT,
        // eslint-disable-next-line react/no-unused-state
        revision: nextProps.operationParam.PARAM_REVISION,
        // eslint-disable-next-line react/no-unused-state
        plnal: nextProps.operationParam.PARAM_PLNAL,
        // eslint-disable-next-line react/no-unused-state
        beber: nextProps.operationParam.PARAM_BEBER,
        // eslint-disable-next-line react/no-unused-state
        save: nextProps.save,
        // eslint-disable-next-line react/no-unused-state
        status: nextProps.operationParam.PARAM_STATUS,
      });
    }
  }

  render() {
    const {
      pmSheetDataList,
    } = this.props;
    const cellClickedReturn = (e) => {
      const revision = e.REVISION; // 4. Revision Code(전/후) (detail의 조회조건)
      const plnal = e.PLNAL; // 5. //Count code(전/후) (detail의 조회조건)
      const plnnr = e.PLNNR;
      const vornr = e.VORNR;
      const ltxa1 = e.LTXA1;
      const ktex1 = e.KTEX1;
      if (e.columnGubun === 'MIC_COUNT') { // 점검항목 수
        window.open(`/apps/pmSheetModeling/pmSheetMicQualListPopup/${plnal}/${plnnr}/${vornr}/${revision}/${this.state.eqktx}/${this.state.beber}/${ltxa1}/${ktex1}`, '', 'width=1400,height=700,top=300,left=500,');
      } else if (e.columnGubun === 'SP_COUNT') { // 자재 예약 항목
        window.open(`/apps/pmSheetModeling/pmSheetSpListPopup/${plnal}/${plnnr}/${vornr}/${revision}`, '', 'width=1400,height=700,top=300,left=500,');
      }
    };

    const workTimeClickedReturn = () => {
      console.log('pmSheetDataList: ', pmSheetDataList);
      const plnal = pmSheetDataList[0].PLNAL;
      const plnnr = pmSheetDataList[0].PLNNR;
      // 시연용 URL
      // window.open(`/apps/pmSheetModeling/pmSheetWrokTimePopup/${plnnr}/${plnal}`, '', `top=${screen.availHeight/2-500/2}, left=${screen.availWidth/2-1050/2}, width=1050, height=500, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes`);
      // 개발용  URL
      window.open(`/apps/pmSheetModeling/pmSheetWrokTimePopup/${plnal}/${plnnr}`, '', `top=${screen.availHeight/2-500/2}, left=${screen.availWidth/2-1050/2}, width=1050, height=500, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes`); //eslint-disable-line
    };

    const m167OperationCreateRow = () => {
      // 결재 관련
      if ((this.state.status !== 'S' && this.state.status !== 'F' && this.state.status !== 'Y') || this.state.status === 'R' || this.state.status === null || this.state.status === undefined) {
        alert('결재상태가 상신인 경우\n 라인추가를 할수 없습니다.');
      }
      this.setState({
        ptype: 'add',
      });
      console.log(this.state.ptype);
      if (this.state.save === 'N') {
        alert('작성중인 Task List는 최종 REVISION이 아닙니다.\n최종 REVISION에 해당하는 Task List에 수정하시기 바랍니다.');
      }
    };
    return (
      <div>
        <h1>{this.state.arbpl}&nbsp;/&nbsp;
          {this.state.eqktx}&nbsp;/&nbsp;
          {this.state.txt}&nbsp;/&nbsp;
          {this.state.revision}&nbsp;/&nbsp;
          Group Counter&nbsp;{this.state.plnal}
          {/* <br />
          {this.state.save} */}

        </h1>
        <div className="PMSheetTitle">
          <BtnSearchDkGray
            title="도급사WorkTime설정"
            className="workTimeSetting"
            onClick={workTimeClickedReturn}
          >
          도급사WorkTime설정
          </BtnSearchDkGray>
          <BtnSearchDkGray
            title="HEADER로 이동"
            className="moveToHeader"
            onClick={this.moveToHeader}
          >
          HEADER로 이동
          </BtnSearchDkGray>
          <BtnSearchDkGray
            title="저장"
            className="saveToTheSheet"
            onClick={this.saveToTheSheet}
          >
          저장
          </BtnSearchDkGray>
          <BtnSearchDkGray
            title="수정"
            className="updateToTheSheet"
            onClick={this.updateToTheSheet}
          >
          수정
          </BtnSearchDkGray>
          <BtnSearchDkGray
            title="라인추가"
            className="m167OperationCreateRow"
            onClick={m167OperationCreateRow}
          >
          라인추가
          </BtnSearchDkGray>
          <BtnSearchDkGray
            title="라인삭제"
            className="deleteLineToTheSheet"
            onClick={this.deleteLineToTheSheet}
          >
          라인삭제
          </BtnSearchDkGray>
          <BtnSearchDkGray
            title="엑셀"
            className="fromExcelToTheSheet"
            onClick={this.fromExcelToTheSheet}
          >
          엑셀
          </BtnSearchDkGray>
        </div>
        <Grid
          pmSheetDataList={pmSheetDataList}
          cellClickedReturn={cellClickedReturn}
          workTimeClickedReturn={workTimeClickedReturn}
          m167OperationCreateRow={m167OperationCreateRow}
        />
      </div>
    );
  }
}

PmSheetOperationModeling.propTypes = {
  handleLoadingFactoryParam: PropTypes.func.isRequired,
  pmSheetDataList: PropTypes.array,
  operationParam: PropTypes.array,
  // handleWorkTimeClicked: PropTypes.func.isRequired,
  handleLoadingSaveYn: PropTypes.func.isRequired,
  save: PropTypes.string,
};

PmSheetOperationModeling.defaultProps = {
  pmSheetDataList: [],
  operationParam: [],
  save: '',
};

const mapStateToProps = createStructuredSelector({
  pmSheetDataList: selectors.makePmSheetDataList(),
  save: selectors.makeSavelKeyData(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFactoryParam: param => dispatch(actions.loadingFactoryParam(param)),
    handleLoadingSaveYn: value => dispatch(actions.loadingSaveYn(value)),
  };
}

const withReducer = injectReducer({ key: 'PmSheetOperationModeling', reducer });
const withSaga = injectSaga({ key: 'PmSheetOperationModeling', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(PmSheetOperationModeling);
