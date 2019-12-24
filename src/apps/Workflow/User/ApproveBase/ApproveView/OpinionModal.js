import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';

import StyledButton from 'components/CommonStyled/StyledButton';

const { TextArea } = Input;

class OpinionModal extends Component {
  componentDidMount() {}

  handleReqApprove = (e, appvStatus) => {
    e.preventDefault();
    this.props.reqApprove(appvStatus);
  };

  handleCloseOpinionModal = () => {
    this.props.setOpinion('');
    this.props.setOpinionVisible(false);
  };

  render() {
    const { opinionVisible, opinion } = this.props;

    return (
      <Modal
        title="결재"
        visible={opinionVisible}
        onOk={this.handleOkModal}
        onCancel={this.handleCloseOpinionModal}
        width="500px"
        style={{ top: 100 }}
        footer={[
          <StyledButton key="close" className="btn-light" onClick={this.handleCloseOpinionModal}>
            닫기
          </StyledButton>,
          <StyledButton key="back" className="btn-gray" onClick={e => this.handleReqApprove(e, 9)}>
            반려
          </StyledButton>,
          <StyledButton key="ok" className="btn-primary" onClick={e => this.handleReqApprove(e, 1)}>
            승인
          </StyledButton>,
        ]}
      >
        <div>
          <p>의견</p>
          <TextArea rows={8} value={opinion} onChange={e => this.props.setOpinion(e.target.value)} />
        </div>
      </Modal>
    );
  }
}

OpinionModal.propTypes = {
  opinionVisible: PropTypes.bool,
  setOpinionVisible: PropTypes.func,
  opinion: PropTypes.string,
  setOpinion: PropTypes.func,
  reqApprove: PropTypes.func,
};

OpinionModal.defaultProps = {
  opinionVisible: false,
  opinion: '',
};

export default OpinionModal;
