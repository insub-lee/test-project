import React from 'react';
import { intlObj } from 'utils/commonUtils';
import * as constantsType from './constants';
import messages from './messages';

class EmptyViewSearch extends React.Component {
  constructor(props) {
    super(props);

    this.getType = this.getType.bind(this);
  }
  getType = () => constantsType.SEARCH;
  render() {
    const style = {
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <div style={style}>
        <span>
          <span className="noContentIcon" />
          {intlObj.get(messages.noMember)}
        </span>
      </div>
    );
  }
}

export default EmptyViewSearch;
