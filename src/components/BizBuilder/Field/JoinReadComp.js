import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

function JoinReadComp(props) {
  const { CONFIG, formData, colData } = props;
  const content = formData[CONFIG.property.viewDataKey] || colData;
  const { usingToolTip } = CONFIG.property;

  if (usingToolTip === 'Y') {
    return (
      <Tooltip placement="bottom" title={content} style={{ cursor: 'pointer' }}>
        {content}
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
  colData: PropTypes.string,
};

export default JoinReadComp;
