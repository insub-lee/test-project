import React, { Component } from 'react';
import StyleBizMenuList from './StyleBizMenuList';

class BizMenuCardList extends Component {
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

export default BizMenuCardList;
