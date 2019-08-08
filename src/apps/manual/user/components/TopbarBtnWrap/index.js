import React from 'react';
import PropTypes from 'prop-types';

import TopbarBtn from '../TopbarBtn';
import Styled from './Styled';

const TopbarBtnWrap = ({ className, data }) => <Styled className={className}>{data && data.length > 0 && data.map(item => <TopbarBtn data={item} />)}</Styled>;

TopbarBtnWrap.propTypes = {
  className: PropTypes.string,
};

TopbarBtnWrap.defaultProps = {
  className: '',
};

export default TopbarBtnWrap;
