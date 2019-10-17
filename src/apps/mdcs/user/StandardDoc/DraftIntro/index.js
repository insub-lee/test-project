import React, { Component } from 'react';

import BizBuilderBase from 'apps/mdcs/components/BizBuilderBase';

import Edit from './Edit';
import List from './List';

class DraftIntro extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <BizBuilderBase id="test" component={Edit} {...this.props} workSeq={668} taskSeq={974} />
        <br />
        <br />
        {/* <BizBuilderBase id="test2" component={List} {...this.props} workSeq={813} taskSeq={723} viewType="LIST" /> */}
      </div>
    );
  }
}

export default DraftIntro;
