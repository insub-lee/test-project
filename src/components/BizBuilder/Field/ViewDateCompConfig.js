import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Button, Radio } from 'antd';
import _, { debounce } from 'lodash';
import moment from 'moment';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';

const RadioGroup = AntRadiobox(Radio.Group);

const conts = {
  column_: 'column',
  value_: 'value',
};
const ViewDateCompConfig = props => {
  const [timeFormat, setTimeFormat] = useState('YYYY-MM-DD');
  const [targetColumn, setTargetColumn] = useState([{ column: null, value: null }]);

  // componentDidMount
  useEffect(() => {
    const { TIME_FORMAT, TARGET_COLUMN } = props.configInfo.property || {};
    setTimeFormat(TIME_FORMAT || 'YYYY-MM-DD');
    setTargetColumn(TARGET_COLUMN || [{ column: null, value: null }]);
  }, []);

  useEffect(() => {
    debouncedHandleChangeViewCompData('TIME_FORMAT', timeFormat);
  }, [timeFormat]);

  useEffect(() => {
    debouncedHandleChangeViewCompData('TARGET_COLUMN', targetColumn);
  }, [targetColumn]);

  const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;

  const handleChangeViewCompData = (key, value) => {
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  const targetColumnHandler = (type, value, idx) => {
    const temp = [...targetColumn];
    switch (type) {
      case conts.column_: {
        temp[idx].column = value;
        setTargetColumn(temp);
        break;
      }
      case conts.value_: {
        temp[idx].value = value;
        setTargetColumn(temp);
        break;
      }
      default:
        break;
    }
  };

  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 250);
  return (
    <>
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">공지</span>
        <span style={{ display: 'block', textAlign: 'center' }}>현재는 - 이외의 특수 문자는 지원하지않습니다.(띄어쓰기 가능)</span>
      </div>
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">노출 여부(rowData기반)</span>
        <span style={{ display: 'block', textAlign: 'center' }}>
          {targetColumn.map(({ column, value }, idx) => (
            <>
              <Input
                style={{ width: '50%' }}
                placeholder="RowData의 key"
                onChange={e => targetColumnHandler(conts.column_, e.target.value, idx)}
                value={column}
              />
              <Input
                style={{ width: '50%' }}
                placeholder="노출여부를 정할 value"
                onChange={e => targetColumnHandler(conts.value_, e.target.value, idx)}
                value={value}
              />
            </>
          ))}
        </span>
      </div>
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">PRESET</span>
        <span style={{ display: 'block', textAlign: 'center' }}>
          <RadioGroup value={timeFormat} onChange={e => setTimeFormat(e.target.value)}>
            <Radio value="YYYY-MM-DD">YYYY-MM-DD</Radio>
            <Radio value="YYYY-MM-DD h:mm:ss">YYYY-MM-DD h:mm:ss</Radio>
            <Radio value="YYYY-MM-DD h:mm">YYYY-MM-DD h:mm</Radio>
          </RadioGroup>
        </span>
      </div>
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">DATE FORMAT INPUT</span>
        <span style={{ display: 'block', textAlign: 'center' }}>
          <Input
            value={timeFormat}
            onChange={e => {
              const { value } = e?.target;
              setTimeFormat(value && value.trim() !== '' ? value : 'YYYY-MM-DD');
            }}
          />
        </span>
      </div>
    </>
  );
};

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
