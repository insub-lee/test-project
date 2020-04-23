import React, { Component } from 'react';

import BizBuilderBase from 'components/BizBuilderBase';
import Input from './pages/InputPage';
import Modify from './pages/ModifyPage';

class pledge extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="pledge" workSeq={6141} viewType="INPUT" CustomInputPage={Input} CustomModifyPage={Modify} />;
  }
}

pledge.propTypes = {};

pledge.defaultProps = {};

export default pledge;
