import React from 'react';
import { intlObj } from 'utils/commonUtils';
import * as constantsType from './constants';
import messages from './messages';

class EmptyViewTree extends React.Component {
  constructor(props) {
    super(props);

    this.getType = this.getType.bind(this);
  }
  getType = () => constantsType.TREE;
  render() {
    const style = {
      width: '100%',
      textAlign: 'center',
    };

    return (<div style={style}>{intlObj.get(messages.noSelection)}</div>);
  }
}

export default EmptyViewTree;
