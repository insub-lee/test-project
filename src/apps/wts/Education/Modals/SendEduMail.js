import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';
import StyledContent from './StyledContent';
import service from '../service';

class SendEduMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id: '',
      target: '',
      isNotice: true,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleOpenModal(target = [], isNotice = false) {
    if (target.length > 0) {
      this.setState({ isOpen: true, target, isNotice });
    } else {
      alert('지정된 대상자가 없습니다.');
    }
  }

  handleCloseModal() {
    this.setState({
      isOpen: false,
    });
  }

  handleAfterOpen() {
    const { id } = this.state;
  }

  submitData(e) {
    e.stopPropagation();
    e.preventDefault();
    const { target } = this.state;
    const { empno, sagaKey, submitHandlerBySaga } = this.props;

    const data = new FormData(e.target);
    const payload = {
      sysid: 'WTS',
      from: empno,
      to: target,
      cc: [],
      bcc: [],
    };
    data.forEach((value, key) => {
      payload[key] = value;
    });
    // console.debug('# Mail Form', payload);
    submitHandlerBySaga(sagaKey, 'POST', '/api/wts/v1/common/sendEmailByEmpNo', { PARAM: payload }, () => false);
    // Todo - send mail
    // Will Send with origin Contents
  }

  render() {
    const { isOpen, isNotice } = this.state;
    return (
      <Modal
        maskClosable={false}
        visible={isOpen}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.handleCloseModal}
        style={{
          width: 600,
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
                <ul className="sub_form small2">
                  <li>
                    <label htmlFor="mail-subject" className="title">
                      제목
                    </label>
                    <input type="text" className="input" name="subject" id="mail-subject" required maxLength={100} />
                  </li>
                  <li>
                    <label htmlFor="mail-content" className="title">
                      내용
                    </label>
                    <textarea
                      name="content"
                      id="mail-content"
                      cols="30"
                      rows="10"
                      placeholder="내용을 입력해주세요."
                      required
                      maxLength={500}
                      style={{ height: '300px' }}
                    />
                  </li>
                </ul>
                <div className="btn_wrap">
                  <StyledButton type="submit" className="btn-sm btn-primary">
                    확인
                  </StyledButton>
                </div>
                {isNotice && <div>※ 미수료자만 발송대상에 포함됩니다.</div>}
              </StyledCommonForm>
            </div>
          </StyledContent>
        </div>
      </Modal>
    );
  }
}

SendEduMail.propTypes = {
  callbackHandler: PropTypes.func,
  empno: PropTypes.string,
};

SendEduMail.defaultProps = {
  callbackHandler: () => false,
  empno: '',
};

export default SendEduMail;
