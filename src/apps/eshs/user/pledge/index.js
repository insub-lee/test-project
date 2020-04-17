import React, { Component } from 'react';

import BizBuilderBase from 'components/BizBuilderBase';
// import List from '../../pages/ListPage';

class pledge extends Component {
  componentDidMount() {}

  render() {
    return <BizBuilderBase sagaKey="pledge" workSeq={6141} viewType="INPUT" />;
  }
}

pledge.propTypes = {};

pledge.defaultProps = {};

export default pledge;
