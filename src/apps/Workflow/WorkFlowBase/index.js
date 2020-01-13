import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import SearchViewer from 'apps/mdcs/user/Search/SearchViewer';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

// import SignStep from './SignStep';
// import SignLine from './SignLine';
// import HistoryGridData from './HistoryGridData';
// import OpinionModal from './OpinionModal';

import Styled from './Styled';
import { NodeInfo } from './nodeInfo';
import DraftModal from './DraftModal';

class WorkFlowBase extends Component {
  signlineApprover = this.signlineApprover.bind(this);

  draftRequest = this.draftRequest.bind(this);

  closeApprovalProcess = this.closeApprovalProcess.bind(this);

  componentDidMount() {
    const { selectedDraft, getDraftDetail, viewType, getProcessData, selectedInitDraft, setDraftDetail } = this.props;
    if (viewType === 'approval') {
      const payload = {
        DRAFT_ID: selectedDraft.DRAFT_ID,
        QUE_ID: selectedDraft.QUE_ID,
      };
      getDraftDetail(payload, setDraftDetail);
    } else if (viewType === 'draft') {
      getProcessData(selectedInitDraft.PRC_ID);
    }
  }

  componentWillUnmount() {
    this.props.initDraftDetail();
  }

  approvalRequest = (status, opinion, callbackFunc) => {
    const { draftDetail, requestApproval, setApprovalProcessQueId, setSelectedDraft } = this.props;
    const payload = {
      action: 'AP',
      QUE_ID: draftDetail.QUE_ID,
      DRAFT_ID: draftDetail.DRAFT_ID,
      STEP: draftDetail.STEP,
      APPV_STATUS: status,
      APPV_USER_ID: draftDetail.APPV_USER_ID,
      opinion,
    };
    requestApproval(payload, callbackFunc);
    setApprovalProcessQueId(0);
    setSelectedDraft({}, false);
  };

  rejectRequest = (status, opinion, callbackFunc) => {
    const { draftDetail, requestApproval, setApprovalProcessQueId, setSelectedDraft } = this.props;
    const payload = {
      action: 'AP',
      QUE_ID: draftDetail.QUE_ID,
      DRAFT_ID: draftDetail.DRAFT_ID,
      STEP: draftDetail.STEP,
      APPV_STATUS: status,
      APPV_USER_ID: draftDetail.APPV_USER_ID,
      opinion,
    };
    requestApproval(payload, callbackFunc);
    setApprovalProcessQueId(0);
    setSelectedDraft({}, false);
  };

  handleCloselModal = () => {
    this.props.setSelectedDraft({}, false);
  };

  signlineApprover() {
    const { setApprovalProcessQueId, draftDetail } = this.props;
    setApprovalProcessQueId(draftDetail.QUE_ID);
  }

  draftRequest() {
    const { addDraftLine, setIsDraftModal, selectedInitDraft, draftCompleteFunc } = this.props;
    const { REL_TYPE, REL_KEY, PRC_ID, TITLE } = selectedInitDraft;
    addDraftLine(REL_TYPE, REL_KEY, PRC_ID, TITLE);
    setIsDraftModal(false);
    draftCompleteFunc();
  }

  closeApprovalProcess() {
    const { setApprovalProcessQueId } = this.props;

    setApprovalProcessQueId(0);
  }

  render() {
    const {
      CATE,
      visible,
      draftDetail,
      signline,
      draftHistory,
      approvalProcessQueId,
      viewType,
      setIsDraftModal,
      isDraftModal,
      setDraftStepInfo,
      draftStepInfo,
      processStep,
      getExtraApiData,
      extraApiData,
      getDraftStepInfo,
      externalData,
    } = this.props;

    let stepProps = {};
    if (viewType === 'draft') {
      stepProps = { setDraftStepInfo, draftStepInfo };
    }

    let contentInfo = {};
    if (draftDetail && draftDetail.REL_TYPE && draftDetail.REL_TYPE === 1 && draftDetail.REL_KEY && draftDetail.REL_KEY.length > 0) {
      contentInfo = JSON.parse(draftDetail.REL_KEY);
    }

    return (
      <Styled>
        <div>
          {/* <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1>{draftDetail.TITLE}</h1>
          </div> */}
          <div className="line_component">
            {/* <SignStep signline={signline} />
              <SignLine signline={signline} /> */}
            {viewType === 'approval' &&
              signline.map(node =>
                NodeInfo[node.SRC_PATH].renderer({
                  viewType,
                  approvalProcess: approvalProcessQueId === node.QUE_ID,
                  nodeInfo: node,
                  approvalRequest: this.approvalRequest,
                  rejectRequest: this.rejectRequest,
                  closeApprovalProcess: this.closeApprovalProcess,
                  key: `stepNode_${node.STEP}_${node.DRAFT_ID}_${node.QUE_ID}`,
                  getExtraApiData,
                  extraApiData: extraApiData[node.STEP] || {},
                  externalData,
                }),
              )}
            {viewType === 'draft' &&
              processStep.map(node =>
                NodeInfo[node.SRC_PATH].renderer({
                  viewType,
                  stepInfo: node,
                  key: `draftStepNode_${node.PRC_ID}_${node.STEP}_${node.PRC_STEP_ID}`,
                  getExtraApiData,
                  extraApiData: extraApiData[node.STEP] || {},
                  setDraftStepInfoByApi: getDraftStepInfo,
                  ...stepProps,
                  externalData,
                }),
              )}
          </div>
          {viewType === 'approval' && contentInfo && contentInfo.WORK_SEQ && contentInfo.TASK_SEQ && (
            <div className="content" style={{ minHeight: '400px' }}>
              <SearchViewer workSeq={contentInfo.WORK_SEQ} taskSeq={contentInfo.TASK_SEQ} closeBtnUseYn={false} />
            </div>
          )}
          {/* <div className="history">
              <HistoryGridData draftHistory={draftHistory} />
            </div> */}
        </div>
        <DraftModal visible={isDraftModal} draftRequest={this.draftRequest} closeHandler={() => setIsDraftModal(false)} />
      </Styled>
    );
  }
}

WorkFlowBase.propTypes = {
  CATE: PropTypes.string,
  visible: PropTypes.bool,
  selectedDraft: PropTypes.object,
  draftDetail: PropTypes.object.isRequired,
  signline: PropTypes.array.isRequired,
  draftHistory: PropTypes.array,
  visibleOpinionModal: PropTypes.bool.isRequired,
  getDraftDetail: PropTypes.func.isRequired,
  requestApproval: PropTypes.func.isRequired,
  setVisibleOpinionModal: PropTypes.func.isRequired,
  initDraftDetail: PropTypes.func.isRequired,
  apiArr: PropTypes.array,
  viewType: PropTypes.string,
  addDraftLine: PropTypes.func.isRequired,
  setIsDraftModal: PropTypes.func,
  isDraftModal: PropTypes.bool,
  setDraftStepInfo: PropTypes.func,
  draftStepInfo: PropTypes.object,
  processStep: PropTypes.array,
  selectedInitDraft: PropTypes.object,
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  approvalProcessQueId: PropTypes.number,
  setApprovalProcessQueId: PropTypes.func,
  getDraftStepInfo: PropTypes.func.isRequired,
};

WorkFlowBase.defaultProps = {
  draftHistory: [],
  apiArr: [
    {
      key: '',
      url: '',
      type: '',
      params: {},
    },
  ],
  selectedDraft: { DRAFT_ID: 102, QUE_ID: 130 },
  selectedInitDraft: { REL_TYPE: 1, REL_KEY: { WORK_SEQ: 668, TASK_SEQ: 9004 }, PRC_ID: 138, TITLE: 'test draft' },
  CATE: 'unApproval',
  visible: true,
  viewType: 'draft',
  setIsDraftModal: () => false,
  isDraftModal: false,
  processStep: [],
  extraApiData: {},
  getExtraApiData: () => false,
  approvalProcessQueId: 0,
  setApprovalProcessQueId: () => false,
};

const mapStateToProps = createStructuredSelector({
  draftDetail: selectors.makeDraftDetail(),
  signline: selectors.makeSignline(),
  draftHistory: selectors.makeDraftHistoryList(),
  isRedirect: selectors.makeIsRedirect(),
  visibleOpinionModal: selectors.makeVisibleOpinionModal(),
  // approvalProcessQueId: selectors.makeApprovalProcessQueId(),
  draftStepInfo: selectors.makeStepLine(),
  processStep: selectors.makeProcessStep(),
  extraApiData: selectors.makeExtraApiData(),
});

const mapDispatchToProps = dispatch => ({
  getDraftDetail: (payload, setDraftDetail) => dispatch(actions.getDraftDetail(payload, setDraftDetail)),
  requestApproval: payload => dispatch(actions.requestApproval(payload)),
  setVisibleOpinionModal: visibleOpinionModal => dispatch(actions.setVisibleOpinionModal(visibleOpinionModal)),
  initDraftDetail: () => dispatch(actions.initDraftDetail()),
  getExtraApiData: (step, apiArr) => dispatch(actions.getExtraApiData(step, apiArr)),
  // setApprovalProcessQueId: queId => dispatch(actions.setApprovalProcessQueIdByReducr(queId)),
  getProcessData: prcId => dispatch(actions.getProcessDataBySaga(prcId)),
  addDraftLine: (REL_TYPE, REL_KEY, PRC_ID, TITLE) => dispatch(actions.addDraftLineBySaga(REL_TYPE, REL_KEY, PRC_ID, TITLE)),
  setDraftStepInfo: (step, stepList) => dispatch(actions.setDraftStepInfoByReducr(step, stepList)),
  getDraftStepInfo: (step, apiInfo) => dispatch(actions.getDraftStepInfoBySaga(step, apiInfo)),
});

const withReducer = injectReducer({ key: 'apps.WorkFlow.WorkFlowBase', reducer });
const withSaga = injectSaga({ key: 'apps.WorkFlow.WorkFlowBase', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(WorkFlowBase);
