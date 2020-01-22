import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfoEdit extends Component {
  render() {
    const { colData, visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{colData}</span> : '';
  }
}

export default UserInfoEdit;
