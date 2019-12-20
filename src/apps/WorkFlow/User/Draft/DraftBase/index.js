import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

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

class DraftBase extends Component {
  signlineApprover = this.signlineApprover.bind(this);

  draftRequest = this.draftRequest.bind(this);

  componentDidMount() {
    const { selectedDraft, getDraftDetail, viewType, getProcessData, selectedInitDraft } = this.props;
    if (viewType === 'approval') {
      const payload = {
        DRAFT_ID: selectedDraft.DRAFT_ID,
        QUE_ID: selectedDraft.QUE_ID,
      };
      getDraftDetail(payload);
    } else if (viewType === 'draft') {
      getProcessData(selectedInitDraft.PRC_ID);
    }
  }

  componentWillUnmount() {
    this.props.initDraftDetail();
  }

  approvalRequest = (status, opinion) => {
    const { draftDetail, requestApproval, setApprovalProcessQueId } = this.props;
    const payload = {
      action: 'AP',
      QUE_ID: draftDetail.QUE_ID,
      DRAFT_ID: draftDetail.DRAFT_ID,
      STEP: draftDetail.STEP,
      APPV_STATUS: status,
      APPV_USER_ID: draftDetail.APPV_USER_ID,
      opinion,
    };
    requestApproval(payload);
    setApprovalProcessQueId(0);
  };

  openOpinionModal = () => {
    const { setVisibleOpinionModal } = this.props;
    setVisibleOpinionModal(true);
  };

  handleCloselModal = () => {
    this.props.setSelectedDraft({}, false);
  };

  signlineApprover() {
    const { setApprovalProcessQueId, draftDetail } = this.props;
    setApprovalProcessQueId(draftDetail.QUE_ID);
  }

  draftRequest() {
    const { addDraftLine, setIsDraftModal, selectedInitDraft } = this.props;
    const { REL_TYPE, REL_KEY, PRC_ID, TITLE } = selectedInitDraft;
    addDraftLine(REL_TYPE, REL_KEY, PRC_ID, TITLE);
    setIsDraftModal(false);
  }

  render() {
    const {
      CATE,
      visible,
      draftDetail,
      signline,
      draftHistory,
      visibleOpinionModal,
      setVisibleOpinionModal,
      approvalProcessQueId,
      setApprovalProcessQueId,
      viewType,
      setIsDraftModal,
      isDraftModal,
      setDraftStepInfo,
      draftStepInfo,
      processStep,
    } = this.props;

    let stepProps = {};
    if (viewType === 'draft') {
      stepProps = { setDraftStepInfo, draftStepInfo };
    }

    const btnArr = [
      <Button key="close" onClick={this.handleCloselModal}>
        닫기
      </Button>,
    ];

    if (CATE === 'unApproval' && draftDetail.STATUS !== 9) {
      btnArr.push(
        <Button key="draftBaseApproval" type="primary" onClick={this.signlineApprover}>
          결재
        </Button>,
      );
    }

    return (
      <Styled>
        <div>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1>{draftDetail.TITLE}</h1>
          </div>
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
                  setApprovalProcessQueId,
                  key: `stepNode_${node.STEP}_${node.DRAFT_ID}_${node.QUE_ID}`,
                }),
              )}
            {viewType === 'draft' &&
              processStep.map(node =>
                NodeInfo[node.SRC_PATH].renderer({
                  viewType,
                  setApprovalProcessQueId,
                  stepInfo: node,
                  key: `draftStepNode_${node.PRC_ID}_${node.STEP}_${node.PRC_STEP_ID}`,
                  ...stepProps,
                }),
              )}
          </div>
          {/* <div className="content" style={{ minHeight: '400px' }}>
              {draftDetail.VIEW_API}
            </div> */}
          {/* <div className="history">
              <HistoryGridData draftHistory={draftHistory} />
            </div> */}
        </div>
        {/* <OpinionModal visible={visibleOpinionModal} approvalRequest={this.approvalRequest} closeHandler={setVisibleOpinionModal} /> */}
        <Button onClick={this.draftRequest}>testbtn</Button>
        <DraftModal visible={isDraftModal} draftRequest={this.draftRequest} closeHandler={() => setIsDraftModal(false)} />
      </Styled>
    );
  }
}

DraftBase.propTypes = {
  CATE: PropTypes.string,
  visible: PropTypes.bool,
  selectedDraft: PropTypes.object,
  setSelectedDraft: PropTypes.func.isRequired,
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
};

DraftBase.defaultProps = {
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
};

const mapStateToProps = createStructuredSelector({
  draftDetail: selectors.makeDraftDetail(),
  signline: selectors.makeSignline(),
  draftHistory: selectors.makeDraftHistoryList(),
  isRedirect: selectors.makeIsRedirect(),
  visibleOpinionModal: selectors.makeVisibleOpinionModal(),
  approvalProcessQueId: selectors.makeApprovalProcessQueId(),
  draftStepInfo: selectors.makeStepLine(),
  processStep: selectors.makeProcessStep(),
});

const mapDispatchToProps = dispatch => ({
  getDraftDetail: payload => dispatch(actions.getDraftDetail(payload)),
  requestApproval: payload => dispatch(actions.requestApproval(payload)),
  setVisibleOpinionModal: visibleOpinionModal => dispatch(actions.setVisibleOpinionModal(visibleOpinionModal)),
  initDraftDetail: () => dispatch(actions.initDraftDetail()),
  getExtraApiData: (id, apiArr) => dispatch(actions.getExtraApiData(id, apiArr)),
  setApprovalProcessQueId: queId => dispatch(actions.setApprovalProcessQueIdByReducr(queId)),
  getProcessData: prcId => dispatch(actions.getProcessDataBySaga(prcId)),
  addDraftLine: (REL_TYPE, REL_KEY, PRC_ID, TITLE) => dispatch(actions.addDraftLineBySaga(REL_TYPE, REL_KEY, PRC_ID, TITLE)),
  setDraftStepInfo: (step, stepList) => dispatch(actions.setDraftStepInfoByReducr(step, stepList)),
});

const withReducer = injectReducer({ key: 'apps.WorkFlow.User.Draft.DraftBase', reducer });
const withSaga = injectSaga({ key: 'apps.WorkFlow.User.Draft.DraftBase', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(DraftBase);
