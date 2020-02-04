import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Spin from 'antd/lib/spin';

import * as selectors from './selectors';
import * as authActions from './actions';

class SignIn extends Component {
  componentDidMount() {
    // console.log('didmount signin', this.props.isLoggedIn);
    // console.log('!@@@@@@@@@@@@@@', this.props.location);
    const loc = this.props.location;
    const url = loc.state ? loc.state.from.pathname : '/';
    const search = loc.state ? loc.state.from.search : '';
    const { pathname } = loc;
    // console.log('LOCQ!!!!!!!!!!!!!!:', loc);
    this.props.boot(url + search, pathname);
  }

  render() {
    return <Spin size="large" style={{ margin: 'auto', width: '100%', padding: '20%' }} />;
  }
}

SignIn.propTypes = {
  boot: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object, // eslint-disable-line
  intl: PropTypes.object, // eslint-disable-line
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  boot: (url, pathname, username) => dispatch(authActions.checkAuthorization(url, pathname, username)),
});

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectors.makeSelectIdToken(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
