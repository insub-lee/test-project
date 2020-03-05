import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from 'antd';

class DraftModal extends Component {
  handleCloselModal = () => {
    const { closeHandler } = this.props;
    closeHandler(false);
  };

  handleDraftModal = () => {
    this.props.draftRequest();
    this.handleCloselModal();
  };

  render() {
    const { visible } = this.props;
    return (
      <Modal
        title="결재"
        visible={visible}
        onOk={this.handleOkModal}
        onCancel={this.handleCloselModal}
        width="500px"
        style={{ top: 100 }}
        footer={[
          <Button key="close" onClick={this.handleCloselModal}>
            닫기
          </Button>,
          <Button key="ok" type="primary" onClick={() => this.handleDraftModal()}>
            결재요청
          </Button>,
        ]}
      ></Modal>
    );
  }
}

DraftModal.propTypes = {
  visible: PropTypes.bool,
  closeHandler: PropTypes.func,
  draftRequest: PropTypes.func,
};

DraftModal.defaultProps = {
  visible: false,
  closeHandler: () => {},
  draftRequest: () => {},
};

export default DraftModal;
