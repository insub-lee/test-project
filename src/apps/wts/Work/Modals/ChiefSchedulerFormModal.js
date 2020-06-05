import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import StyledContent from './StyledContent';
import SchedulerForm from './SchedulerForm';

class ChiefSchedulerFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      empNo: '',
      usrNm: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.handleInserted = this.handleInserted.bind(this);
  }

  handleOpenModal(empNo, usrNm) {
    this.setState({ isOpen: true, empNo, usrNm });
  }

  handleCloseModal() {
    this.setState({ isOpen: false, empNo: '', usrNm: '' });
  }

  handleAfterOpen() {}

  handleInserted() {
    this.setState({ isOpen: false, empNo: '', usrNm: '' }, () => {
      this.props.callbackHandler();
    });
  }

  render() {
    const { isOpen, empNo, usrNm } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 860,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <div>
          <StyledContent>
            <div className="pop_tit">
              휴가 등록
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <SchedulerForm empNo={empNo} usrNm={usrNm} callbackHandler={this.handleInserted} isAutoBanSign />
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

ChiefSchedulerFormModal.propTypes = {
  callbackHandler: PropTypes.func,
};

ChiefSchedulerFormModal.defaultProps = {
  callbackHandler: () => false,
};

export default ChiefSchedulerFormModal;
