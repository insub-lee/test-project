import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import Button from 'components/Button';
import StyledContent from './StyledContent';
import service from '../service';

class NightWorkAcceptModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      empNo: '',
      workDt: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.accept = this.accept.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  handleOpenModal(empNo, workDt) {
    this.setState({ isOpen: true, empNo, workDt });
  }

  handleCloseModal() {
    this.setState({ isOpen: false, empNo: '', workDt: '' });
  }

  handleAfterOpen() {
    const { id } = this.state;
    console.debug('Opened Modal : ', id);
  }

  accept() {
    const { empNo, workDt } = this.state;
    const payload = {
      empNo,
      workDt,
      bsign: 'O',
      vacation: 'X',
      type: 'manHis',
    };
    this.updateEvent(payload).then(result => {
      if (result) {
        this.handleCloseModal();
        this.props.callbackHandler();
      } else {
        console.debug('Success Fail');
      }
    });
  }

  async updateEvent(payload) {
    let result = false;
    const { response, error } = await service.manHisChief.put(payload);
    if (response && !error) {
      result = true;
    }
    return result;
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 300,
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
              승인하시겠습니까?
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <div className="btn_wrap">
                <Button type="button" color="primary" size="small" onClick={this.accept}>
                  확인
                </Button>
                <Button type="button" color="gray" size="small" onClick={this.handleCloseModal}>
                  취소
                </Button>
              </div>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

NightWorkAcceptModal.propTypes = {
  callbackHandler: PropTypes.func,
};

NightWorkAcceptModal.defaultProps = {
  callbackHandler: () => false,
};

export default NightWorkAcceptModal;
