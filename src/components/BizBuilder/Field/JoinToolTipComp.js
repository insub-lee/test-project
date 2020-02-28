import React, { Component } from 'react';
import { Tooltip } from 'antd';

class JoinToolTipComp extends Component {
  componentDidMount() {}

  render() {
    const { CONFIG, formData, colData } = this.props;
    const text = colData && colData.replace(/(<([^>]+)>)/gi, '').replace('Powered by Froala Editor', '');
    return (
      <Tooltip placement="topLeft" title={formData[CONFIG.property.viewDataKey] || text} trigger="hover">
        <label>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100px', whiteSpace: 'nowrap' }}>
            {formData[CONFIG.property.viewDataKey] || text}
          </div>
        </label>
      </Tooltip>
    );
  }
}

export default JoinToolTipComp;
