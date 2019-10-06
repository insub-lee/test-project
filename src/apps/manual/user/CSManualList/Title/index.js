import React from 'react';
import PropTypes from 'prop-types';

import BtnCount from '../BtnCount';

import Styled from './Styled';

const Title = ({ title, count }) => (
  <Styled>
    <p className="board_header__title">{title}</p>
    <BtnCount count={count} />
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
