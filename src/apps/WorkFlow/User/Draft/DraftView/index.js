import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import WorkerBuilderView from 'apps/WorkBuilderApp/User/ViewPage';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import SignStep from './SignStep';
import SignLine from './SignLine';
import HistoryGridData from './HistoryGridData';
import OpinionModal from './OpinionModal';
import StyleDraftView from './StyleDraftView';

class DraftView extends Component {
  componentDidMount() {
    const { selectedDraft, getDraftDetail } = this.props;
    const payload = {
      DRAFT_ID: selectedDraft.DRAFT_ID,
      QUE_ID: selectedDraft.QUE_ID,
    };
    getDraftDetail(payload);
  }

  componentWillUnmount() {
    this.props.initDraftDetail();
  }

  getButtons = (condition = false) => {
    const btnArr = [
      <Button key="close" onClick={this.handleCloseModal}>
        닫기
      </Button>,
    ];
    if (condition) btnArr.push(<Button type="primary" onClick={this.openOpinionModal}>결재</Button>);
    return btnArr;
  };

  approvalRequest = (e, status, opinion) => {
    e.preventDefault();
    const { draftDetail, requestApproval } = this.props;
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
  };

  openOpinionModal = () => {
    const { setVisibleOpinionModal } = this.props;
    setVisibleOpinionModal(true);
  };

  handleCloseModal = () => {
    this.props.setSelectedDraft({}, false);
  };

  render() {
    const {
      CATE, visible, draftDetail, signline, draftHistory, visibleOpinionModal, setVisibleOpinionModal,
    } = this.props;

    return (
      <Modal
        title={draftDetail.TITLE}
        visible={visible}
        onOk={this.handleOkModal}
        onCancel={this.handleCloseModal}
        width="1200px"
        style={{ top: 50 }}
        footer={this.getButtons(CATE === 'unApproval' && draftDetail.STATUS !== 9)}
      >
        <StyleDraftView>
          <div>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h1>{draftDetail.TITLE}</h1>
            </div>
            <div className="line_component">
              <SignStep signline={signline} />
              <SignLine signline={signline} />
            </div>
            <div className="content" style={{ minHeight: '400px' }}>
              {draftDetail && draftDetail.VIEW_API && (
                <WorkerBuilderView apiUrl={draftDetail.VIEW_API} />
              )}
            </div>
            {/* <div className="history">
              <HistoryGridData draftHistory={draftHistory} />
            </div> */}
          </div>
          <OpinionModal visible={visibleOpinionModal} approvalRequest={this.approvalRequest} closeHandler={setVisibleOpinionModal} />
        </StyleDraftView>
      </Modal>
    );
  }
}

DraftView.propTypes = {
  CATE: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  selectedDraft: PropTypes.object.isRequired,
  setSelectedDraft: PropTypes.func.isRequired,
  draftDetail: PropTypes.object.isRequired,
  signline: PropTypes.array.isRequired,
  draftHistory: PropTypes.array,
  visibleOpinionModal: PropTypes.bool.isRequired,
  getDraftDetail: PropTypes.func.isRequired,
  requestApproval: PropTypes.func.isRequired,
  setVisibleOpinionModal: PropTypes.func.isRequired,
  initDraftDetail: PropTypes.func.isRequired,
};

DraftView.defaultProps = {
  draftHistory: [],
};

const mapStateToProps = createStructuredSelector({
  draftDetail: selectors.makeDraftDetail(),
  signline: selectors.makeSignline(),
  draftHistory: selectors.makeDraftHistoryList(),
  isRedirect: selectors.makeIsRedirect(),
  visibleOpinionModal: selectors.makeVisibleOpinionModal(),
});

const mapDispatchToProps = dispatch => ({
  getDraftDetail: payload => dispatch(actions.getDraftDetail(payload)),
  requestApproval: payload => dispatch(actions.requestApproval(payload)),
  setVisibleOpinionModal: visibleOpinionModal => dispatch(actions.setVisibleOpinionModal(visibleOpinionModal)),
  initDraftDetail: () => dispatch(actions.initDraftDetail()),
});

const withReducer = injectReducer({ key: 'apps.WorkFlow.User.Draft.DraftView', reducer });
const withSaga = injectSaga({ key: 'apps.WorkFlow.User.Draft.DraftView', saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(DraftView);
