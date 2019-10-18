import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import WorkFlowBase from '../index';

class ApprovalView extends Component {
  state = { draftDetail: {}, approvalProcessQueId: 0 };

  openOpinionModal = this.openOpinionModal.bind(this);

  handleCloselModal = () => {
    this.props.setSelectedDraft({}, false);
  };

  openOpinionModal() {
    const { selectedDraft } = this.props;
    this.setState({ approvalProcessQueId: selectedDraft.QUE_ID });
  }

  setDraftDetail = draftDetail => this.setState({ draftDetail });

  setApprovalProcessQueId = queId => this.setState({ approvalProcessQueId: queId });

  render() {
    const { CATE, visible } = this.props;
    const { draftDetail, approvalProcessQueId } = this.state;

    const btnArr = [
      <Button key="ApprovalViewClose" onClick={this.handleCloselModal}>
        닫기
      </Button>,
    ];

    if (CATE === 'unApproval' && draftDetail.STATUS !== 9) {
      btnArr.push(
        <Button key="ApprovalViewSummit" type="primary" onClick={this.openOpinionModal}>
          결재
        </Button>,
      );
    }

    return (
      <Modal title={draftDetail.TITLE} visible={visible} onCancel={this.handleCloselModal} width="1200PX" style={{ top: 60 }} footer={btnArr} destroyOnClose>
        <WorkFlowBase
          {...this.props}
          setDraftDetail={this.setDraftDetail}
          approvalProcessQueId={approvalProcessQueId}
          setApprovalProcessQueId={this.setApprovalProcessQueId}
          viewType="approval"
        />
      </Modal>
    );
  }
}

ApprovalView.propTypes = { selectedDraft: PropTypes.object, setSelectedDraft: PropTypes.func, visible: PropTypes.bool, CATE: PropTypes.string };

ApprovalView.defaultProps = { selectedDraft: { DRAFT_ID: 117, QUE_ID: 182 }, setSelectedDraft: () => false, visible: true, CATE: 'unApproval' };

export default ApprovalView;
