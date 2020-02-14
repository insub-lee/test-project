import React, { Component } from 'react';
import { Popover } from 'antd';

class JoinToolTipComp extends Component {
  render() {
    const { CONFIG, formData, colData } = this.props;
    const text = colData.replace(/(<([^>]+)>)/gi, '').replace('Powered by Froala Editor', '');
    return (
      <Popover placement="topLeft" title={formData[CONFIG.property.viewDataKey] || text} trigger="hover">
        <label>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100px', whiteSpace: 'nowrap' }}>
            {formData[CONFIG.property.viewDataKey] || text}
          </div>
        </label>
      </Popover>
    );
  }
}

export default JoinToolTipComp;
