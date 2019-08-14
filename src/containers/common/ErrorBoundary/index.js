import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import { intlObj } from 'utils/commonUtils';

import messages from './messages';

const errorWrapStyle = {
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'block',
  textAlign: 'center',
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo }, () => console.log('errorInfo : ', errorInfo));
  }

  render() {
    const { errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      return (
        <div style={errorWrapStyle}>
          <Icon type="frown" theme="outlined" />
          <h4>{intlObj.get(messages.error)}</h4>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ErrorBoundary;
