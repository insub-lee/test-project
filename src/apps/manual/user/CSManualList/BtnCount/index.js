import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const BtnCount = ({ count }) => (
  <Styled>
    <span className="board-header__count">{count}</span>
    {/* <i className="fa fa-chevron-down"></i> */}
  </Styled>
);

BtnCount.propTypes = {
  count: PropTypes.number,
};

BtnCount.defaultProps = {
  count: 0,
};

export default BtnCount;
