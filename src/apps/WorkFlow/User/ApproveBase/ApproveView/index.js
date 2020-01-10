import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'components/CommonStyled/StyledButton';

import OpinionModal from './OpinionModal';

import AppvView from './appvView';

import AppvActionComp from './appvActionComp';
import HoldRelease from './holdRelease';

const { TextArea } = Input;

class ApproveView extends Component {
  handleCloseModal = () => {
    this.props.setSelectedRow({});
    this.props.setViewVisible(false);
  };

  handleReqApprove = (e, appvStatus) => {
    e.preventDefault();
    this.props.reqApprove(appvStatus);
    this.props.setOpinionVisible(false);
  };

  handleCloseOpinionModal = () => {
    this.props.setOpinion('');
    this.props.setOpinionVisible(false);
  };

  changeWorkflowFormData = formData => {
    const { setBizFormData } = this.props;
    setBizFormData(formData);
  };

  onHoldRelase = () => {
    const { selectedRow, setSelectedRow } = this.props;
    const nSelectedRow = { ...selectedRow, APPV_STATUS: 4 };
    this.props.setSelectedRow(nSelectedRow);
    this.props.setOpinionVisible(true);
  };

  getButtons = (category, status, procStatus) => {
    console.debug(category, status, procStatus);
    const btnAry = [];
    if (category === 'unApproval' && (status === 1 || status === 2)) {
      btnAry.push(
        <StyledButton key="appvBtn" className="btn-primary" onClick={() => this.props.setOpinionVisible(true)}>
          결재
        </StyledButton>,
      );
    }

    if (procStatus === 3) {
      btnAry.push(
        <StyledButton key="appvBtn" className="btn-primary" onClick={() => this.onHoldRelase()}>
          홀드해제
        </StyledButton>,
      );
    }

    btnAry.push(
      <StyledButton key="closeBtn" className="btn-light" onClick={this.handleCloseModal}>
        닫기
      </StyledButton>,
    );

    return btnAry;
  };

  getApproveButtons = selectedRow => {
    const btnAry = [];
    btnAry.push(
      <StyledButton key="close" className="btn-light" onClick={this.handleCloseOpinionModal}>
        닫기
      </StyledButton>,
    );
    if (selectedRow.APPV_STATUS === 4) {
      btnAry.push(
        <StyledButton key="ok" className="btn-primary" onClick={e => this.handleReqApprove(e, selectedRow.APPV_STATUS)}>
          승인
        </StyledButton>,
      );
    } else {
      btnAry.push(
        <StyledButton key="back" className="btn-gray" onClick={e => this.handleReqApprove(e, 9)}>
          반려
        </StyledButton>,
        <StyledButton key="ok" className="btn-primary" onClick={e => this.handleReqApprove(e, 2)}>
          승인
        </StyledButton>,
      );
    }
    console.debug(btnAry);
    return btnAry;
  };

  render() {
    const { selectedRow, viewVisible, category, opinionVisible, opinion } = this.props;
    console.debug('selectedRow', selectedRow);
    console.debug('selectedRow.APPV_STATUS', selectedRow.APPV_STATUS);
    return (
      <React.Fragment>
        <Modal
          title={selectedRow.DRAFT_TITLE}
          visible={viewVisible}
          onOk={this.handleCloseModal}
          onCancel={this.handleCloseModal}
          width="65%"
          footer={this.getButtons(category, selectedRow.STATUS, selectedRow.PROC_STATUS)}
        >
          <BizBuilderBase
            sagaKey="approveBase_approveView"
            viewType="VIEW"
            CustomViewPage={AppvView}
            workSeq={selectedRow.WORK_SEQ}
            taskSeq={selectedRow.TASK_SEQ}
            draftId={selectedRow.DRAFT_ID}
            metaSeq={selectedRow.RULE_CONFIG.META_SEQ}
            changeWorkflowFormData={this.changeWorkflowFormData}
          />
        </Modal>
        <Modal
          title="결재"
          visible={opinionVisible}
          onOk={this.handleOkModal}
          onCancel={this.handleCloseOpinionModal}
          width="600px"
          style={{ top: 100 }}
          destroyOnClose
          footer={this.getApproveButtons(selectedRow)}
        >
          <OpinionModal {...this.props} CustomActionView={selectedRow.APPV_STATUS === 4 ? HoldRelease : AppvActionComp} />
        </Modal>
      </React.Fragment>
    );
  }
}

ApproveView.propTypes = {
  category: PropTypes.string,
  selectedRow: PropTypes.object,
  setSelectedRow: PropTypes.func,
  viewVisible: PropTypes.bool,
  setViewVisible: PropTypes.func,
  opinionVisible: PropTypes.bool,
  setOpinionVisible: PropTypes.func,
};

ApproveView.defaultProps = {
  category: 'draft',
  selectedRow: {},
  viewVisible: false,
  opinionVisible: false,
};

export default ApproveView;
