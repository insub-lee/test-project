/* eslint-disable camelcase */
import React from 'react';
// import Modal from 'react-Modal';
import Modal from 'rc-dialog';

import Spin from '../../AntdSpinner';

// import modalStyles from '../modalStyles';
import StyledContent from './StyledContent';
import Button from '../../Button';
import service from './service';
import alertMessage from '../../Notification/Alert';

// Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,.7)';

class DropModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modalParam: {},
      isSaving: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const { callback } = this.props;
    const { modalParam } = this.state;
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    payload.IMPROVE_CONTENT = modalParam.IMPROVE_CONTENT;
    payload.SUCCESS_REASON = modalParam.SUCCESS_REASON;
    payload.ATTACH_FILE_PATH = modalParam.ATTACH_FILE_PATH;
    payload.ATTACH_FILE = modalParam.ATTACH_FILE;
    payload.signref = modalParam.signref;
    payload.files = modalParam.files;
    console.debug('#payload#', payload);
    this.setState({ isSaving: true }, () => {
      this.postData(payload).then(result => {
        if (result) {
          this.setState({ isOpen: false }, () => callback());
        } else {
          alertMessage.alert('Server Error');
        }
      });
    });
    this.setState({ isSaving: true });
  }

  async postData(payload) {
    const { response, error } = await service.sign.post(payload);
    if (response && !error) {
      const { insertyn } = response;
      return insertyn;
    }
    if (error.includes('401')) {
      alertMessage.alert('비밀번호가 틀렸습니다.');
    }
    return false;
  }

  handleOpen(payload) {
    this.setState({ isOpen: true, modalParam: payload });
    // Todo - Need Common Api handler
  }

  handleClose() {
    this.setState({ isOpen: false, modalParam: {} });
    // Todo - Need Common Api handler
  }

  render() {
    const { isOpen, isSaving } = this.state;
    const { task_seq, step } = this.props;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleClose}
        style={{
          width: 500,
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
              Drop 사유
              <button type="button" aria-label="dclose" className="icon icon_pclose" onClick={this.handleClose} />
            </div>
            <div className="pop_con">
              <Spin spinning={isSaving}>
                <form autoComplete="off" onSubmit={this.onSubmit}>
                  <input type="hidden" name="task_seq" value={task_seq} />
                  <input type="hidden" name="step" value={step} />
                  <textarea placeholder="Drop 사유를 작성해 주세요." name="drop_reason" maxLength={45} required />
                  <div className="btn_wrap">
                    <Button type="submit" size="big" color="primary">
                      Drop하기
                    </Button>
                  </div>
                </form>
              </Spin>
            </div>
          </div>
        </StyledContent>
      </Modal>
    );
  }
}

export default DropModal;
