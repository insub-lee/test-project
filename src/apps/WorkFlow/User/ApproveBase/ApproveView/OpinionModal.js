import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';

import StyledButton from 'components/CommonStyled/StyledButton';

const { TextArea } = Input;

class OpinionModal extends Component {
  handleReqApprove = (e, appvStatus) => {
    e.preventDefault();
    this.props.reqApprove(appvStatus);
    this.props.setOpinionVisible(false);
  };

  handleCloseOpinionModal = () => {
    this.props.setOpinion('');
    this.props.setOpinionVisible(false);
  };

  render() {
    const { opinion, CustomActionView } = this.props;
    return (
      <div>
        {typeof CustomActionView === 'function' && <CustomActionView {...this.props} />}
        <p>의견</p>
        <TextArea rows={8} value={opinion} onChange={e => this.props.setOpinion(e.target.value)} />
      </div>
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
