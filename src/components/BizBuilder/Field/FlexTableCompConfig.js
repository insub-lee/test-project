import React from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import { Col, Input, Row, Button, Radio } from 'antd';
import { debounce } from 'lodash';

function FlexTableCompConfig(props) {
  const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;

  const handleChangeViewCompData = (key, value) => {
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 250);

  return [
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">TEST</span>
      <Radio.Group
        className="alignCenter"
        value={(configInfo && configInfo.property && configInfo.property.usingToolTip) || 'N'}
        onChange={e => {
          const { value } = e.target;
          // debouncedHandleChangeViewCompData('', value);
        }}
      >
        <Radio value="Y">Y</Radio>
        <Radio value="N">N</Radio>
      </Radio.Group>
    </div>,
  ];
}

FlexTableCompConfig.defaultProps = {};

FlexTableCompConfig.propTypes = {};

export default FlexTableCompConfig;
// export default configer;
