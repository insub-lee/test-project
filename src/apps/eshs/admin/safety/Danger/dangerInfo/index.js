import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import ModifyPage from './Modify';

class DangerInfo extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="dangerInfo" workSeq={10341} viewType="INPUT" CustomInputPage={ModifyPage} />;
  }
}

DangerInfo.propTypes = {};

DangerInfo.defaultProps = {};

export default DangerInfo;
