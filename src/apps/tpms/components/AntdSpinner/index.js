import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

const Spinner = ({ spinning, children, size }) => (
  <Spin spinning={spinning} indicator={antIcon} size={size}>
    {children}
  </Spin>
);

Spinner.propTypes = {
  spinning: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  size: PropTypes.string,
};

Spinner.defaultProps = {
  spinning: false,
  children: null,
  size: 'default',
};

export default Spinner;
