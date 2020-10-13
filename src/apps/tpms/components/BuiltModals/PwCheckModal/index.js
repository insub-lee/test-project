import React from 'react';
// import Modal from 'react-Modal';
import Modal from 'rc-dialog';

// import modalStyles from '../modalStyles';
import StyledContent from './StyledContent';
import Button from '../../Button';

// Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';

class PwCheckModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      callback: () => false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { callback } = this.state;
    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    // Todo - Need Common Api handler
    // Success - callback();
    // Fail - alert message
    if (payload.pwd === '' || payload.pwd === undefined) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    callback(payload);
  }

  handleOpen(callback) {
    this.setState({ isOpen: true, callback });
  }

  handleClose() {
    this.setState({ isOpen: false, callback: () => false });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleClose}
        style={{
          width: 300,
        }}
        bodyStyle={{
          padding: 0,
        }}
        closable={false}
        destroyOnClose
      >
        <StyledContent>
          <div>
            <div className="pop_tit">
              비밀번호 입력
              <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
            </div>
            <div className="pop_con">
              <form autoComplete="off" onSubmit={this.onSubmit}>
                <input type="password" placeholder="비밀번호를 입력해 주세요." name="pwd" />
                <div className="btn_wrap">
                  <Button type="submit" size="big" color="primary">
                    확인하기
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </StyledContent>
      </Modal>
    );
  }
}

export default PwCheckModal;
