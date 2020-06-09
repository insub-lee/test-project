import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'rc-dialog';

import StyledCommonForm from 'apps/wts/components/CommonStyledElement/StyledCommonForm';
import Button from 'components/Button';
import StyledContent from './StyledContent';
import service from '../service';

class SendEduMail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id: '',
      target: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleAfterOpen = this.handleAfterOpen.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleOpenModal(target = []) {
    if (target.length > 0) {
      this.setState({ isOpen: true, target });
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
    const { empno } = this.props;
    const data = new FormData(e.target);
    const payload = {
      sysid: 'ESHS',
      from: empno,
      to: target,
      cc: [],
      bcc: [],
    };
    data.forEach((value, key) => {
      payload[key] = value;
    });
    console.debug('# Mail Form', payload);
    // Todo - send mail
    // Will Send with origin Contents
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
                    <textarea name="content" id="mail-content" cols="30" rows="10" placeholder="내용을 입력해주세요." required maxLength={500} />
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

SendEduMail.propTypes = {
  callbackHandler: PropTypes.func,
  empno: PropTypes.string,
};

SendEduMail.defaultProps = {
  callbackHandler: () => false,
  empno: '',
};

export default SendEduMail;
