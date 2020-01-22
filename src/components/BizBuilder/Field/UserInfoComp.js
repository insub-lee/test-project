import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfoComp extends Component {
  componentDidMount = () => {};

  render() {
    const { colData, visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{colData}</span> : '';
  }
}

export default UserInfoComp;
