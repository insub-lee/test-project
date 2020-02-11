import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';
import Styled from './Styled';

class hostCompnyUserMgt extends Component {
  render() {
    return (
      <Styled>
        <BizMicroDevBase component={List} sagaKey="EshshostCompny" />
      </Styled>
    );
  }
}

export default hostCompnyUserMgt;
