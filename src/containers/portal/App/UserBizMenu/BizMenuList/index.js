import React, { Component } from 'react';
import StyleBizMenuList from './StyleBizMenuList';

class BizMenuList extends Component {
  componentDidMount() {
    console.debug('>>>>>>>>>biz menu props: ', this.props);
  }

  render() {
    return (
      <StyleBizMenuList>
        <div>여기로</div>
      </StyleBizMenuList>
    );
  }
}

export default BizMenuList;
