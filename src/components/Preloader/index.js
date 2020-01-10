import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';

import Styled from './Styled';

const indicator = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Preloader = ({ size, spinning, tip, wrapperClassName, children }) => (
  <Spin size={size} spinning={spinning} tip={tip} wrapperClassName={wrapperClassName} indicator={indicator}>
    {children}
  </Spin>
);

Preloader.propTypes = {
  size: PropTypes.string,
  spinning: PropTypes.bool,
  tip: PropTypes.string,
  wrapperClassName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Preloader.defaultProps = {
  size: 'default',
  spinning: true,
  tip: '',
  wrapperClassName: '',
};

const StyledSpin = Styled(Spin);

export default StyledSpin;
