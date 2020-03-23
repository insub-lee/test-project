import { Col, Input, Row, Button, Radio } from 'antd';
import _, { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import BizMicroDevBase from 'components/BizMicroDevBase';

const cont = {
  setDefault: 'setDefault',
  VALUE: 'VALUE',
  TEXT: 'TEXT',
  ADD: 'ADD',
  RESET: 'RESET',
  REMOVE: 'REMOVE',
  definedValue: 'definedValue',
  customValues: 'customValues',
};

function CustomValueSelectCompConfig(props) {
  const [rows, setRows] = useState([]);
  const [definedValue, setDefinedValue] = useState({});
  const [shouldRegsiter, setShouldRegister] = useState('');

  const handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  useEffect(() => {
    const { customValues, definedValue, setDefault } = props.configInfo.property;
    setRows(customValues instanceof Array ? [...customValues] : [{ value: null, text: null }]);
    setDefinedValue(definedValue instanceof Object ? { ...definedValue } : { value: null, text: null });
    setShouldRegister(typeof setDefault === 'string' ? setDefault : 'N');
  }, []);

  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 250);

  function inputHandler(idx, e, type) {
    const { value } = e.target;
    const temp = [...rows];
    switch (type) {
      case cont.VALUE: {
        temp[idx].value = value;
        break;
      }
      case cont.TEXT: {
        temp[idx].text = value;
        break;
      }
      default:
        return;
    }
    setRows([...temp]);
    debouncedHandleChangeViewCompData(cont.customValues, [...temp]);
  }

  function defaultValueInputHanlder(e, type) {
    const { value } = e.target;
    const temp = definedValue;
    switch (type) {
      case cont.VALUE: {
        temp.value = value;
        break;
      }
      case cont.TEXT: {
        temp.text = value;
        break;
      }
      default:
        return;
    }
    setDefinedValue({ ...temp });
    debouncedHandleChangeViewCompData(cont.definedValue, { ...temp });
  }

  function rowContoller(type) {
    let temp = [...rows];
    switch (type) {
      case cont.ADD: {
        temp.push({ value: null });
        break;
      }
      case cont.RESET: {
        temp = [{ value: null, text: null }];
        break;
      }
      case cont.REMOVE: {
        temp = [..._.dropRight(temp, 1)];
        break;
      }
      default:
        return;
    }
    setRows([...temp]);
    debouncedHandleChangeViewCompData(cont.customValues, [...temp]);
  }
  return (
    <div>
      <Row>
        <div>
          <Col span={6}>
            <p>FormData 등록 여부</p>
          </Col>
          <Col span={16} push={2}>
            <Radio.Group
              className="alignCenter"
              value={shouldRegsiter}
              onChange={e => {
                const { value } = e.target;
                setShouldRegister(value);
                debouncedHandleChangeViewCompData(cont.setDefault, value);
              }}
            >
              <Radio value="Y">Y</Radio>
              <Radio value="N">N</Radio>
            </Radio.Group>
          </Col>
        </div>
      </Row>
      <Row>
        <div>
          <Col span={6}>
            <p>초기 값 지정</p>
          </Col>
          <Col span={16} push={2}>
            <Input
              style={{ width: '50%' }}
              placeholder="value 미입력시 ''"
              value={definedValue.value}
              onChange={e => defaultValueInputHanlder(e, cont.VALUE)}
            />
            <Input style={{ width: '50%' }} placeholder="text 미입력시 ''" value={definedValue.text} onChange={e => defaultValueInputHanlder(e, cont.TEXT)} />
          </Col>
        </div>
      </Row>
      <Row>
        <div>
          <Col span={6}>
            <p>지정 값 관리</p>
          </Col>
          <Col span={16} push={2}>
            <Button style={{ width: '33%' }} type="primary" onClick={() => rowContoller(cont.ADD)}>
              {cont.ADD}
            </Button>
            <Button style={{ width: '33%' }} type="ghost" onClick={() => rowContoller(cont.RESET)}>
              {cont.RESET}
            </Button>
            <Button style={{ width: '33%' }} type="danger" onClick={() => rowContoller(cont.REMOVE)}>
              {cont.REMOVE}
            </Button>
          </Col>
        </div>
      </Row>
      {rows.map((row, idx) => (
        <Row key={`customInputValueRows${idx}`}>
          <div>
            <Col span={6}>
              <p>사용자 지정 값 ({idx + 1})</p>
            </Col>
            <Col span={16} push={2}>
              <Input
                style={{ width: '50%' }}
                placeholder="set Value"
                onKeyDown={e => (e.keyCode === 13 ? rowContoller(cont.ADD) : null)}
                value={row.value}
                onChange={e => inputHandler(idx, e, cont.VALUE)}
              />
              <Input
                style={{ width: '50%' }}
                placeholder="set Text"
                onKeyDown={e => (e.keyCode === 13 ? rowContoller(cont.ADD) : null)}
                value={row.text}
                onChange={e => inputHandler(idx, e, cont.TEXT)}
              />
            </Col>
          </div>
        </Row>
      ))}
    </div>
  );
}
const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="CustomValueSelectCompConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={CustomValueSelectCompConfig}
  ></BizMicroDevBase>
);

CustomValueSelectCompConfig.propTypes = {
  configInfo: PropTypes.objectOf(PropTypes.object),
};

CustomValueSelectCompConfig.defaultProps = {
  configInfo: {
    info: {},
    option: {},
    property: { customValues: [{ value: null, text: null }], definedValue: { value: null, text: null } },
  },
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
