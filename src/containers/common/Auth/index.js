import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spin } from 'antd';

import * as selectors from './selectors';
import * as authActions from './actions';

class SignIn extends Component {
  componentDidMount() {
    const loc = this.props.location;
    const url = loc.state ? loc.state.from.pathname : '/';
    const { pathname } = loc;
    console.log('LOCQ!!!!!!!!!!!!!!:', loc);
    this.props.boot(url + loc.state.from.search, pathname);
  }
  render() {
    return (
      <Spin size="large" style={{ margin: 'auto', width: '100%', padding: '20%' }} />
    );
  }
}

SignIn.propTypes = {
  boot: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object, // eslint-disable-line
  intl: PropTypes.object, // eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    boot: (url, pathname) => dispatch(authActions.checkAuthorization(url, pathname)),
  }
);

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectors.makeSelectIdToken(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
