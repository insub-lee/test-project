import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import LoadingIndicator from 'components/LoadingIndicator/index';

export default function Loading({ isLoading, pastDelay, error }) {
  if (isLoading && pastDelay) {
    return (
      <div
        className="loading"
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingIndicator style={{ margin: 'auto', width: '100%', padding: '20%' }} />
      </div>
    ); // <p>Loading...</p>;
  } else if (error && !isLoading) {
    return (
      <div style={{ display: 'table', width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'table-cell',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
        >
          <Icon type="frown" theme="outlined" />
          <h4>
            해당 앱을 사용할 수 없습니다.
          </h4>
        </div>
      </div>);
  }
  return null;
}

Loading.propTypes = {
  isLoading: PropTypes.bool, // eslint-disable-line
  pastDelay: PropTypes.bool, // eslint-disable-line
  error: PropTypes.object, // eslint-disable-line
};
