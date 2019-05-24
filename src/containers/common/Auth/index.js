import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spin } from 'antd';
import { Cookies } from 'react-cookie';

import Input from 'components/Input';
import Button from 'components/Button';
import SignInStyleWrapper from './signin.style';

import * as selectors from './selectors';
import * as authActions from './actions';

class SignIn extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    const cookies = new Cookies();
    this.state = { token: cookies.get('token') };
  }
  componentDidMount() {
    console.log('didmount signin', this.props.isLoggedIn);
    console.log('!@@@@@@@@@@@@@@', this.props.location);
    const { token } = this.state;
    if (token != null) {
      const loc = this.props.location;
      const url = loc.state ? loc.state.from.pathname + loc.state.from.search : '/';
      const { pathname } = loc;
      this.props.boot(url, pathname, '');
      this.loc = this.props.location;
    }
  }
  handleLogin() {
    console.log('!@@@@@@@@@@@@@@', this.props.location);
    const loc = this.props.location;
    const url = loc.state ? loc.state.from.pathname + loc.state.from.search : '/';
    const { pathname } = loc;
    const username = document.querySelector('#username').value !== '' ? document.querySelector('#username').value : 'X0101006';
    console.log('LOCQ!!!!!!!!!!!!!!:', username);
    this.props.boot(url, pathname, username);
  }
  render() {
    if (this.state.token != null) {
      return <Spin size="large" style={{ margin: 'auto', width: '100%', padding: '20%' }} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input size="large" id="username" placeholder="Username" />
              </div>
              <div className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" onClick={this.handleLogin}>
                  로그인
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

SignIn.propTypes = {
  boot: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object, // eslint-disable-line
  intl: PropTypes.object, // eslint-disable-line
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    boot: (url, pathname, username) => dispatch(authActions.checkAuthorization(url, pathname, username)),
  }
);

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectors.makeSelectIdToken(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
