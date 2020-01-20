import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class DocTemplate extends Component {
  componentDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="DocTemplate" component={List} {...this.props} />;
  }
}
export default DocTemplate;
