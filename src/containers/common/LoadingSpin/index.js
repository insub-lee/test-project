import React, { PureComponent } from 'react';
import { Icon, Spin } from 'antd';
import PropTypes from 'prop-types';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class LoadingSpin extends PureComponent {
  render() {
    const {
      isLoading,
    } = this.props;

    const result = isLoading ? (
      <div
        className="loading"
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          margin: '-10px',
        }}
      >
        <Spin indicator={antIcon} />
      </div>
    ) : '';

    return result;
  }
}

LoadingSpin.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingSpin;
