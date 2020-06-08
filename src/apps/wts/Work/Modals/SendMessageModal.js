import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
import StyledContent from './StyledContent';
import service from '../service';

class SendMessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id: '',
      empNo: '',
      workDt: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleOpenModal(empNo, workDt) {
    this.setState({ isOpen: true, empNo, workDt });
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
      empNo: '',
      workDt: '',
    });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  submitData(e) {
    e.stopPropagation();
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {};
    data.forEach((value, key) => {
      payload[key] = value;
    });
    // Will Send with origin Contents
    this.updateEvent(payload).then(result => {
      if (result) {
        this.handleCloseModal();
        this.props.callbackHandler();
      } else {
        alert('저장하는데 실패했습니다.');
      }
    });
  }

  async updateEvent(payload) {
    let result = false;
    const { response, error } = await service.manHisChief.put(payload);
    if (response && !error) {
      result = response.updateyn;
    }
    return result;
  }

  render() {
    const { isOpen, empNo, workDt } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 500,
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
              메시지
              <button type="button" className="icon icon_pclose" onClick={this.handleCloseModal} />
            </div>
            <div className="pop_con">
              <StyledCommonForm onSubmit={this.submitData} autoComplete="off">
                <input type="hidden" name="empNo" value={empNo} />
                <input type="hidden" name="workDt" value={workDt} />
                <input type="hidden" name="vacation" value="O" />
                <input type="hidden" name="bansign" value="X" />
                <input type="hidden" name="type" value="vacation" />
                <ul className="sub_form small2">
                  <li>
                    <label htmlFor="banmsg" className="title">
                      내용
                    </label>
                    <textarea name="banmsg" id="banmsg" cols="30" rows="10" placeholder="내용을 입력해주세요." required maxLength={500} />
                  </li>
                </ul>
                <div className="btn_wrap">
                  <Button type="submit" size="small" color="primary">
                    확인
                  </Button>
                </div>
              </StyledCommonForm>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

SendMessageModal.propTypes = {
  callbackHandler: PropTypes.func,
};

SendMessageModal.defaultProps = {
  callbackHandler: () => false,
};

export default SendMessageModal;
