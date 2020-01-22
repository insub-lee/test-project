import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Label extends Component {
  render() {
    const { visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{this.props.colData}</span> : '';
  }
}

export default Label;
