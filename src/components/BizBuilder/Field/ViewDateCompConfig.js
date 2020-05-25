import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Button, Radio } from 'antd';
import _, { debounce } from 'lodash';
import moment from 'moment';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';

const RadioGroup = AntRadiobox(Radio.Group);

function ViewDateCompConfig(props) {
  const [timeFormat, setTimeFormat] = useState('YYYY-MM-DD');

  // componentDidMount
  useEffect(() => {
    const { TIME_FORMAT } = props.configInfo.property || {};
    setTimeFormat(TIME_FORMAT || []);
  }, []);

  useEffect(() => {
    debouncedHandleChangeViewCompData('TIME_FORMAT', timeFormat);
  }, [timeFormat]);

  const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;

  const handleChangeViewCompData = (key, value) => {
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 250);
  // key={`${Math.random()} customValueRadioComp > Radio`}
  return [
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">DATE OUTPUT</span>
      <span style={{ display: 'block', textAlign: 'center' }}>
        <RadioGroup value={timeFormat} onChange={e => setTimeFormat(e.target.value)}>
          <Radio value="YYYY-MM-DD">YYYY-MM-DD</Radio>
          <Radio value="YYYY-MM-DD h:mm:ss">YYYY-MM-DD h:mm:ss</Radio>
          <Radio value="YYYY-MM-DD h:m">YYYY-MM-DD h:mm</Radio>
        </RadioGroup>
      </span>
    </div>,
    <div className="popoverItem popoverItemInput">
      <span className="spanLabel">DATE FORMAT INPUT</span>
      <span style={{ display: 'block', textAlign: 'center' }}>
        <Input defaultValue={timeFormat} onChange={e => setTimeFormat(e.target.value)} />
      </span>
    </div>,
  ];
}

ViewDateCompConfig.propTypes = {
  CONFIG: PropTypes.objectOf(PropTypes.object),
  COMP_FIELD: PropTypes.string,
};

ViewDateCompConfig.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: { URL: undefined, columns: [] },
  },
  COMP_FIELD: '',
};

export default ViewDateCompConfig;
