import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import { intlObj } from 'utils/commonUtils';
import messages from './messages';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

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
        <Spin indicator={antIcon} />
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
            {intlObj.get(messages.error)}
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
