import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PostionSelectComp from './PostionSelectComp';

class PostionSelect extends Component {
  render() {
    return <BizMicroDevBase {...this.props} id="positionSelect" component={PostionSelectComp} />;
  }
}

export default PostionSelect;