import React from 'react';
import PropTypes from 'prop-types';

const Detail = ({ info }) => (
  <div>
    Detail
    {console.debug(info)}
  </div>
);

Detail.propTypes = {
  info: PropTypes.object,
};

Detail.defaultProps = {
  info: {},
};

export default Detail;
