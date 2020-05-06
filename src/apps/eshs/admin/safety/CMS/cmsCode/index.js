import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class CmsCode extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="cmsCode" component={List} dangerMainYN />;
  }
}

CmsCode.propTypes = {};
CmsCode.defaultProps = {};

export default CmsCode;
