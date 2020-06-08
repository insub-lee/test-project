import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import Modify from './Modify';

class DangerInfo extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="dangerInfo" workSeq={10341} viewType="MODIFY" CustomModifyPage={Modify} />;
  }
}

DangerInfo.propTypes = {};

DangerInfo.defaultProps = {};

export default DangerInfo;
