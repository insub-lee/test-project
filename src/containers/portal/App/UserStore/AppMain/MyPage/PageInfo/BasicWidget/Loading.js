import React from 'react';
import PropTypes from 'prop-types';

export default function Loading({ isLoading, pastDelay, error }) {
  if (isLoading && pastDelay) {
    return <p>Loading...</p>;
  }
  if (error && !isLoading) {
    return <p>Error!</p>;
  }
  return null;
}

Loading.propTypes = {
  isLoading: PropTypes.bool, // eslint-disable-line
  pastDelay: PropTypes.bool, // eslint-disable-line
  error: PropTypes.object, // eslint-disable-line
};
