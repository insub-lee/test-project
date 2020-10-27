import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LogoLogin2 from '../../images/logo_login_w.png';
import StyledLoginPage from './StyledLoginPage';
import Checkbox from '../CheckboxGroup/Checkbox';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.idRef = React.createRef();
    this.passwordRef = React.createRef();
    this.nameRef = React.createRef();
  }

  render() {
    const { formAction, system, isResetPwd } = this.props;
    const checkBoxOption = {
      id: 'test01',
      name: 'test01',
      value: '테스트',
      labelText: '로그인 정보 기억하기',
      otherOption: false,
    };
    return (
      <StyledLoginPage>
        {!isResetPwd ? (
          <form
            autoComplete="off"
            ref={this.form}
            name="loginForm"
            onSubmit={e => {
              e.preventDefault();
              const { idRef, passwordRef } = this;
              const payload = {
                id: idRef.current.value,
                password: passwordRef.current.value,
              };
              formAction.login(payload);
            }}
          >
            <div className="login">
              <h1>
                <img src={LogoLogin2} alt="" />
                <span>{`- ${system} -`}</span>
              </h1>
              <input type="text" key="id" ref={this.idRef} name="id" placeholder="ID" required />
              <input type="password" key="password" ref={this.passwordRef} name="password" placeholder="PASSWORD" required />
              <button type="submit">로그인</button>
              <Checkbox {...checkBoxOption} />
              <ul>
                <li>
                  <button type="button" onClick={() => formAction.toggleResetPwd(true)}>
                    비밀번호 초기화
                  </button>
                </li>
                {/* <li>
                  <button type="button" onClick={() => formAction.findId()}>
                    아이디 찾기
                  </button>
                  <span />
                </li>
                <li>
                  <button type="button" onClick={() => formAction.findPw()}>
                    비밀번호 찾기
                  </button>
                  <span />
                </li>
                <li>
                  <button type="button" onClick={() => formAction.goSignUp()}>
                    회원가입
                  </button>
                </li> */}
              </ul>
            </div>
          </form>
        ) : (
          <form
            autoComplete="off"
            // ref={this.form}
            name="resetPwdForm"
            onSubmit={e => {
              e.preventDefault();
              const { nameRef, idRef } = this;
              const payload = {
                id: idRef.current.value,
                name: nameRef.current.value,
              };
              formAction.resetPwd(payload);
            }}
          >
            <div className="login">
              <h1>
                <img src={LogoLogin2} alt="" />
                <span>{`- ${system} -`}</span>
              </h1>
              <input type="text" key="resetId" ref={this.idRef} name="id" placeholder="ID" required />
              <input type="text" key="resetName" ref={this.nameRef} name="name" placeholder="NAME" required />
              <button type="submit">초기화</button>
              <ul>
                <li>
                  <button type="button" onClick={() => formAction.toggleResetPwd(false)}>
                    로그인 하기
                  </button>
                </li>
              </ul>
            </div>
          </form>
        )}
      </StyledLoginPage>
    );
  }
}

LoginPage.propTypes = {
  formAction: PropTypes.shape({
    login: PropTypes.func,
    findId: PropTypes.func,
    findPw: PropTypes.func,
    goSignUp: PropTypes.func,
    resetPwd: PropTypes.func,
    successResetPwd: PropTypes.func,
  }),
  isResetPwd: PropTypes.bool,
};

LoginPage.defaultProps = {
  formAction: {
    login: () => false,
    findId: () => false,
    findPw: () => false,
    goSignUp: () => false,
    resetPwd: () => false,
    successResetPwd: () => false,
  },
  isResetPwd: false,
};
export default LoginPage;
