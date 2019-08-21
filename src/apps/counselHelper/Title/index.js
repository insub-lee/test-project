import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const Title = ({ title }) => (
  <Styled>
    <p>{title}</p>
  </Styled>
);

Title.propTypes = {
  title: PropTypes.string,
};

Title.defaultProps = {
  title: '',
};

export default Title;
