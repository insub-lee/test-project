import React from 'react';
import Modal from 'rc-dialog';

import pawwordImg from '../../../images/password.png';
import StyledContent from './StyledContent';
import Button from '../../Button';

class PwdChangeModal extends React.Component {
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
    if (payload.pwd1 === '' || payload.pwd1 === undefined || payload.pwd1.length < 8) {
      alert('기존 비밀번호를 8자리 이상 입력해주세요');
      return;
    }
    if (payload.pwd2 === '' || payload.pwd2 === undefined || payload.pwd1.length < 8) {
      alert('새 비밀번호를 8자리 이상 입력해주세요');
      return;
    }
    if (payload.pwd3 === '' || payload.pwd3 === undefined || payload.pwd1.length < 8) {
      alert('새 비밀번호 확인을 8자리 이상 입력해주세요');
      return;
    }
    if (payload.pwd2 !== payload.pwd3) {
      alert('새 비밀번호와 새 비밀번호 확인이 다릅니다. 다시 입력해주세요.');
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
          width: 1000,
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
              비밀번호 변경
              <button type="button" className="icon icon_pclose" onClick={this.handleClose} />
            </div>
            <div className="pop_con">
              <h1>
                <img src={pawwordImg} alt="" />
                <span>주기적인 비밀번호 변경을 통해 개인정보를 안전하게 보호하세요.</span>
              </h1>
              <div className="mb30">
                <ul>
                  <li>- 비밀번호는 8~32자의 영문 대/소문자, 숫자, 특수문자를 조합하여 사용하실 수 있습니다</li>
                  <li>- 쉬운 비밀번호나 자주 쓰는 사이트의 비밀번호가 같을 경우 도용되기 쉬워 주기적으로 변경하여 사용하는 것이 좋습니다.</li>
                  <li>- 비밀번호에 특수문자를 추가하여 사용하시면 기억하기도 쉽고, 비밀번호 안전도가 높아져 도용의 위험이 줄어듭니다.</li>
                </ul>
              </div>
              <div className="input_wrap">
                <form autoComplete="off" onSubmit={this.onSubmit}>
                  <label htmlFor="pwd1">기존 비밀번호</label>
                  <input type="password" key="pwd1" placeholder="기존 비밀번호를 입력해 주세요." name="pwd1" maxLength={32} />
                  <label htmlFor="pwd2">새 비밀번호</label>
                  <input type="password" key="pwd2" placeholder="새 비밀번호를 입력해 주세요." name="pwd2" maxLength={32} />
                  <label htmlFor="pwd3">새 비밀번호 확인</label>
                  <input type="password" key="pwd3" placeholder="새 비밀번호를 확인해 주세요." name="pwd3" maxLength={32} />
                  <div className="btn_wrap">
                    <Button type="submit" size="big" color="primary">
                      비밀번호 변경하기
                    </Button>
                    <Button type="button" size="big" color="default" onClick={this.handleClose}>
                      다음에 변경하기
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </StyledContent>
      </Modal>
    );
  }
}

export default PwdChangeModal;
