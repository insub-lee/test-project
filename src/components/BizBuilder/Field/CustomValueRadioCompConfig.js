import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Row, Button, Radio } from 'antd';
import _, { debounce } from 'lodash';
import AntRadiobox from '../../../containers/store/components/uielements/radiobox.style';
const RadioGroup = AntRadiobox(Radio.Group);

// 혹시 모를 오타를 대비해 상수로 선언하여 공통으로 사용한다.
const cont = {
  ADD_: 'ADD',
  RESET_: 'RESET',
  REMOVE_: 'REMOVE',
  TEXT_: 'TEXT',
  VALUES_: 'VALUES',
  IS_CHANGEABLE_: 'IS_CHANGEABLE',
  URL_: 'URL',
};
/**
 * @author LOGAN LEE
 */
function CustomValueRadioCompConfig(props) {
  const { ADD_, RESET_, REMOVE_, VALUES_, TEXT_, IS_CHANGEABLE_, URL_ } = cont;
  const [values, setValues] = useState([]);
  const [isChangeable, setIsChangeable] = useState('N');
  const [url, setUrl] = useState('');

  /*
 기존 설정되어있는 값을 바인딩하기위한 함수이며,
 componentDidMount와 같은 역할을 한다.
  */
  useEffect(() => {
    const { VALUES, IS_CHANGEABLE, URL_ } = props.configInfo.property || {};
    setValues(VALUES || []);
    setIsChangeable(IS_CHANGEABLE || 'N');
    setUrl(URL_ || '');
  }, []);

  // 사용자가 values,url,isChangeable의 값을 바꿀 때 마다,
  // changeViewCompData에 해당 변경 값을 집어넣는 역할을 한다.
  // 배열의 경우는 값의 변경의 유무 없이 바뀌는 족족 액션이 일어날 것이며,
  // Primitive 타입인 경우에는 값이 새로 쓰여졌다고해도 이전값과 같다면 액션이 일어나지않는다.
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

  // 딜레이를 줄이기위해 lodash 라이브러리를 사용.
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
      {/* API의 주소를 입력한다.
    추후에 해당 주소로 rowData에 추가된 값을 넣어 API를 호출한다.
    */}
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">API URL</span>
        <span style={{ display: 'block', textAlign: 'center' }}>
          <Input placeholder="API URL" value={url} onChange={e => setUrl(e.target.value)} />
        </span>
      </div>

      {/* onChange 가용 여부를 결정한다. */}
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">Radio onChange여부</span>
        <span style={{ display: 'block', textAlign: 'center' }}>
          <RadioGroup value={isChangeable} onChange={e => setIsChangeable(e.target.value)}>
            <Radio value="Y">Y</Radio>
            <Radio value="N">N</Radio>
          </RadioGroup>
        </span>
      </div>
      {/* Radio의 사이즈를 조정한다. */}
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
      {/* 엔터키 혹은 위의 버튼으로 추가할 수 있다.
      추후에 API에 추가적으로 담기게될 값이 된다. */}
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
