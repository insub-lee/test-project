import React from 'react';
import PropTypes from 'prop-types';

import TopbarBtn from '../TopbarBtn';
import Styled from './Styled';

const TopbarBtnWrap = ({ className, data }) => <Styled className={className}>{data && data.map(item => <TopbarBtn key={item.key} data={item} />)}</Styled>;

TopbarBtnWrap.propTypes = {
  className: PropTypes.string,
};

TopbarBtnWrap.defaultProps = {
  className: '',
};

export default TopbarBtnWrap;
