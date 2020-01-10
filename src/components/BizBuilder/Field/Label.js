import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Label extends Component {
  render() {
    const { visible } = this.props;
    return visible ? <span>{this.props.colData}</span> : '';
  }
}

export default Label;
