import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const CommonSpin = ({ spinning, children }) => (
  <Spin indicator={antIcon} spinning={spinning}>
    {children}
  </Spin>
);

CommonSpin.propTypes = {
  spinning: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

CommonSpin.defaultProps = {
  spinning: false,
  children: null,
};

export default CommonSpin;
