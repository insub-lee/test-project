import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Input from 'components/Input';
import Button from 'components/Button';
import SignInStyleWrapper from './signin.style';

import * as selectors from './selectors';
import * as authActions from './actions';

class SignIn extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount() {
    console.log('didmount signin', this.props.isLoggedIn);
    this.loc = this.props.location;
  }
  handleLogin() {
    console.log('!@@@@@@@@@@@@@@', this.loc);
    const url = this.loc.state ? this.loc.state.from.pathname : '/';
    const { pathname } = this.loc;
    const username = document.querySelector('#username').value;
    console.log('LOCQ!!!!!!!!!!!!!!:', username);
    this.props.boot(url + this.loc.state.from.search, pathname, username);
  }
  render() {
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
  isLoggedIn: PropTypes.string.isRequired,
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
