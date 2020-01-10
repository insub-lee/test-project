import React from 'react';
import PropTypes from 'prop-types';
import LayoutContentWrapper from './layoutWrapper.style';

class LayoutWrapper extends React.PureComponent {
  render() {
    return (
      <LayoutContentWrapper
        className={this.props.className != null ? `${this.props.className} storeLayoutContentWrapper` : 'storeLayoutContentWrapper'}
        {...this.props}
      >
        {this.props.children}
      </LayoutContentWrapper>
    );
  }
}

LayoutWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.object,
};
export default LayoutWrapper;
