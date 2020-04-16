import * as PropTypes from 'prop-types';
import React from 'react';
import { Popover } from 'antd';

class JoinToolTipComp extends React.Component {
  componentDidMount() {}

  render() {
    const { CONFIG, formData, colData, rowData } = this.props;
    const text = colData && colData.replace(/(<([^>]+)>)/gi, '').replace('Powered by Froala Editor', '');
    const bold =
      CONFIG.property.boldCondition && CONFIG.property.boldTarget && String(rowData[CONFIG.property.boldCondition]) === String(CONFIG.property.boldTarget)
        ? 'bold'
        : '';
    return (
      <Popover placement="topLeft" title={formData[CONFIG.property.viewDataKey] || text} trigger="hover">
        <label>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', fontWeight: `${bold}` }}>
            {formData[CONFIG.property.viewDataKey] || text}
          </div>
        </label>
      </Popover>
    );
  }
}

JoinToolTipComp.propTypes = {
  formData: PropTypes.any,
  rowData: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
};

export default JoinToolTipComp;
