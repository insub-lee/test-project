import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

function JoinReadComp(props) {
  const { CONFIG, formData, colData, rowData } = props;
  const content = formData[CONFIG.property.viewDataKey] || colData;
  const { usingToolTip } = CONFIG.property;
  const bold =
    CONFIG.property.boldCondition && CONFIG.property.boldTarget && String(rowData[CONFIG.property.boldCondition]) === String(CONFIG.property.boldTarget)
      ? 'bold'
      : '';
  if (usingToolTip === 'Y') {
    return (
      <Tooltip placement="bottom" title={content} style={{ cursor: 'pointer' }}>
        <div style={{ fontWeight: `${bold}` }}>{content}</div>
      </Tooltip>
    );
  }
  return <label>{content}</label>;
}

JoinReadComp.defaultProps = {
  CONFIG: { info: {}, property: {}, option: {} },
  formData: {},
  colData: '',
};

JoinReadComp.propTypes = {
  CONFIG: PropTypes.object,
  formData: PropTypes.object,
  rowData: PropTypes.object,
  colData: PropTypes.string,
};

export default JoinReadComp;
