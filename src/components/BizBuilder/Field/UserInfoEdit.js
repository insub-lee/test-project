import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInfoEdit extends Component {
  render() {
    const { colData, visible } = this.props;
    return visible ? colData : '';
  }
}

export default UserInfoEdit;
