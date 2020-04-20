import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator/index';

export default function Loading({ isLoading, pastDelay }) {
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
  }
  return null;
}

Loading.propTypes = {
  isLoading: PropTypes.bool, // eslint-disable-line
  pastDelay: PropTypes.bool, // eslint-disable-line
  error: PropTypes.object, // eslint-disable-line
};
