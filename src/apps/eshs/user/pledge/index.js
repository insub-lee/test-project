import React, { Component } from 'react';

import BizBuilderBase from 'components/BizBuilderBase';
import Input from './pages/InputPage';

class pledge extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="pledge" workSeq={6141} viewType="INPUT" CustomInputPage={Input} />;
  }
}

pledge.propTypes = {};

pledge.defaultProps = {};

export default pledge;
// eshs/user/pledge