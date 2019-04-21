import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlObj } from 'utils/commonUtils';
import { Icon } from 'antd';
import messages from './messages';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // this.state = { error: null, errorInfo: null };
    this.state = { errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      // error,
      errorInfo,
    });

    console.log('error : ', error);
    console.log('errorInfo : ', errorInfo);
  }

  render() {
    const {
      // error,
      errorInfo,
    } = this.state;

    if (errorInfo) {
      return (
        <div
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'block',
            textAlign: 'center',
          }}
        >
          <Icon type="frown" theme="outlined" />
          <h4>
            {intlObj.get(messages.error)}
          </h4>
          {/* <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details> */}
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
