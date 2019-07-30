import React from 'react';
import PropTypes from 'prop-types';
import Styled from './Styled';

const Title = ({ title, count }) => (
  <Styled>
    <p className="board_header__title">{title}</p>
  </Styled>
);

Title.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};

Title.defaultProps = {
  title: '',
  count: 0,
};

export default Title;
