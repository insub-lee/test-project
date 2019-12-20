import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfoComp extends Component {
  componentDidMount = () => {};

  render() {
    const { colData, visible } = this.props;
    return visible ? <span>{colData}</span> : '';
  }
}

export default UserInfoComp;
