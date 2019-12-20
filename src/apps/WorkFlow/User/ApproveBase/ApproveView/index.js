import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import BizBuilderBase from 'components/BizBuilderBase';
import StyledButton from 'components/CommonStyled/StyledButton';

import OpinionModal from './OpinionModal';

class ApproveView extends Component {
  componentDidMount() {}

  handleCloseModal = () => {
    this.props.setSelectedRow({});
    this.props.setViewVisible(false);
  };

  getButtons = isBtn => {
    if (isBtn) {
      return [
        <StyledButton key="closeBtn" className="btn-light" onClick={this.handleCloseModal}>
          닫기
        </StyledButton>,
        <StyledButton key="appvBtn" className="btn-primary" onClick={() => this.props.setOpinionVisible(true)}>
          결재
        </StyledButton>,
      ];
    }
  };

  render() {
    const { selectedRow, viewVisible, category } = this.props;

    return (
      <Modal
        title={selectedRow.DRAFT_TITLE}
        visible={viewVisible}
        onOk={this.handleCloseModal}
        onCancel={this.handleCloseModal}
        width="65%"
        style={{ top: 50 }}
        footer={this.getButtons(category === 'unApproval' && (selectedRow.STATUS === 1 || selectedRow.STATUS === 2))}
      >
        <BizBuilderBase
          id="approveBase_approveView"
          viewType="VIEW"
          workSeq={selectedRow.WORK_SEQ}
          taskSeq={selectedRow.TASK_SEQ}
          draftId={selectedRow.DRAFT_ID}
          metaSeq={selectedRow.RULE_CONFIG.META_SEQ}
        />
        <OpinionModal {...this.props} />
      </Modal>
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
