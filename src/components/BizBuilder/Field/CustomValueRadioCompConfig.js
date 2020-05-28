import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Button, Radio } from 'antd';
import _, { debounce } from 'lodash';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';
const RadioGroup = AntRadiobox(Radio.Group);

const cont = {
  ADD_: 'ADD',
  RESET_: 'RESET',
  REMOVE_: 'REMOVE',
  TEXT_: 'TEXT',
  VALUES_: 'VALUES',
  IS_CHANGEABLE_: 'IS_CHANGEABLE',
  URL_: 'URL',
};

function CustomValueRadioCompConfig(props) {
  const { ADD_, RESET_, REMOVE_, VALUES_, TEXT_, IS_CHANGEABLE_, URL_ } = cont;
  const [values, setValues] = useState([]);
  const [isChangeable, setIsChangeable] = useState('N');
  const [url, setUrl] = useState('');

  // componentDidMount
  useEffect(() => {
    const { VALUES, IS_CHANGEABLE, URL_ } = props.configInfo.property || {};
    setValues(VALUES || []);
    setIsChangeable(IS_CHANGEABLE || 'N');
    setUrl(URL_ || '');
  }, []);

  useEffect(() => {
    debouncedHandleChangeViewCompData(VALUES_, values);
  }, [values]);

  useEffect(() => {
    debouncedHandleChangeViewCompData(URL_, url);
  }, [url]);

  useEffect(() => {
    debouncedHandleChangeViewCompData(IS_CHANGEABLE_, isChangeable);
  }, [isChangeable]);

  const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;

  const handleChangeViewCompData = (key, value) => {
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 250);

  const valueHandler = (type, value, idx) => {
    if (typeof value === 'string') {
      value = value.trim();
      const temp = [...(values || [])];

      switch (type) {
        case VALUES_: {
          temp[idx].value = value;
          break;
        }
        case TEXT_: {
          temp[idx].text = value;
          break;
        }
      }
      setValues(temp);
    }
  };

  const valueSizeHandler = type => {
    let temp = [...(values || [])];
    switch (type) {
      // add Group
      case ADD_: {
        const tempValues = { text: undefined, value: undefined };
        temp.push(tempValues);
        break;
      }

      // remove Group
      case REMOVE_: {
        temp = [..._.dropRight(temp, 1)];
        break;
      }
    }
    setValues(temp);
  };

  return (
    <>
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">API URL</span>
        <span style={{ display: 'block', textAlign: 'center' }}>
          <Input placeholder="API URL" value={url} onChange={e => setUrl(e.target.value)} />
        </span>
      </div>
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">Radio onChange여부</span>
        <span style={{ display: 'block', textAlign: 'center' }}>
          <RadioGroup value={isChangeable} onChange={e => setIsChangeable(e.target.value)}>
            <Radio value="Y">Y</Radio>
            <Radio value="N">N</Radio>
          </RadioGroup>
        </span>
      </div>
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">Radio 사이즈</span>
        <span style={{ display: 'block', textAlign: 'center' }}>
          <Button
            type="primary"
            style={{ width: '33.3%' }}
            onClick={() => {
              valueSizeHandler(ADD_);
            }}
          >
            {ADD_}
          </Button>
          <Button
            type="ghost"
            style={{ width: '33.3%' }}
            onClick={() => {
              setValues([]);
            }}
          >
            {RESET_}
          </Button>
          <Button
            type="danger"
            style={{ width: '33.3%' }}
            onClick={() => {
              valueSizeHandler(REMOVE_);
            }}
          >
            {REMOVE_}
          </Button>
        </span>
      </div>
      {values.length > 0 &&
        values.map(({ value, text }, idx) => (
          <div className="popoverItem popoverItemInput">
            <span className="spanLabel">Radio{idx + 1}</span>
            <span>
              <Input
                style={{ width: '38%' }}
                value={value}
                placeholder="Radio Value"
                onChange={e => valueHandler(VALUES_, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? valueSizeHandler(ADD_) : null)}
              />
              <Input
                style={{ width: '38%' }}
                value={text}
                placeholder="Radio Text"
                onChange={e => valueHandler(TEXT_, e.target.value, idx)}
                onKeyDown={e => (e.keyCode === 13 ? valueSizeHandler(ADD_) : null)}
              />
            </span>
          </div>
        ))}
    </>
  );
}

CustomValueRadioCompConfig.propTypes = {
  CONFIG: PropTypes.objectOf(PropTypes.object),
  COMP_FIELD: PropTypes.string,
};

CustomValueRadioCompConfig.defaultProps = {
  CONFIG: {
    info: {},
    option: {},
    property: { URL: undefined, columns: [] },
  },
  COMP_FIELD: '',
};

export default CustomValueRadioCompConfig;
