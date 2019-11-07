import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from 'antd';

const { TextArea } = Input;

class OpinionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opinion: '',
    };

    this.opinionRef = React.createRef();
  }

  handleCloselModal = () => {
    const { closeHandler } = this.props;
    closeHandler(false);
  };

  handleApprovalModal = (e, status) => {
    const { opinion } = this.state;
    this.props.approvalRequest(e, status, opinion);
    this.handleCloselModal();
  };

  setOpinion = e => {
    this.setState({ opinion: e.target.value });
  };

  render() {
    const { opinion } = this.state;
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
          <Button key="back" type="primary" onClick={e => this.handleApprovalModal(e, 9)}>
            반려
          </Button>,
          <Button key="ok" type="primary" onClick={e => this.handleApprovalModal(e, 1)}>
            승인
          </Button>,
        ]}
      >
        <div>
          <p>의견</p>
          <TextArea ref={this.opinionRef} row={8} defaultValue={opinion} onChange={e => this.setOpinion(e)} />
        </div>
      </Modal>
    );
  }
}

OpinionModal.propTypes = {
  visible: PropTypes.bool,
  closeHandler: PropTypes.func,
  approvalRequest: PropTypes.func,
};

OpinionModal.defaultProps = {
  visible: false,
  closeHandler: () => {},
  approvalRequest: () => {},
};

export default OpinionModal;
