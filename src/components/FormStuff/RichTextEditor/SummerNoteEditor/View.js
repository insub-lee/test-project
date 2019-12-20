import React from 'react';
import PropTypes from 'prop-types';
import StyledSummerNote from './StyledSummerNote';

const View = ({ model }) => <StyledSummerNote dangerouslySetInnerHTML={{ __html: model }} />;

View.propTypes = {
  model: PropTypes.string,
};

View.defaultProps = {
  model: '',
};

export default View;
