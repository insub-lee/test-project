import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;

const cont = {
  setDefault: 'setDefault',
};
function SelectYearCompConfig(props) {
  const [rootMapValue, setRootMapValue, selectValue, setSelectValue, selectDefaultValue, setSelectDefaultValue, apiArray, setApiArray] = useState(undefined);
  const [placeHolderValue, setPlaceHolderValue, apiKey, setApiKey] = useState('');
  const [defaultFlag, setDefaultFlag] = useState(2);
  const [yearRange, setYearRange] = useState([]);
  const currentYear = new Date().getFullYear();
  const [shouldRegsiter, setShouldRegister] = useState('');

  useEffect(() => {
    const { getCallDataHandler, sagaKey: id, apiArray, configInfo } = props;
    const { minYear, maxYear, defaultYear } = configInfo.property;
    const { setDefault } = configInfo.property;
    setShouldRegister(typeof setDefault === 'string' ? setDefault : 'N');

    getCallDataHandler(id, apiArray);

    const years = [];

    // foundation Year of MagnaChip 2004
    for (let i = 2004; i <= currentYear; i++) {
      years.push(String(i));
    }
    setYearRange([...years]);
  }, []);

  const handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  function maxYearRange(count) {
    const years = [];
    for (let i = currentYear; i < currentYear + count; i++) {
      years.push(String(i));
    }
    return years;
  }

  const debouncedHandleChangeViewCompData = _.debounce(handleChangeViewCompData, 500);

  const {
    result: { rootMap, categoryMapInfo },
    groupIndex,
    rowIndex,
    colIndex,
    configInfo,
  } = props;
  const { minYear, maxYear, defaultYear } = configInfo.property;

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
          <Col span={6}>초기 년도 설정 </Col>
          <Col span={16} push={2}>
            <Select
              style={{ width: '100%' }}
              placeholder="초기 년도 입력"
              defaultValue={defaultYear || null}
              onChange={value => {
                debouncedHandleChangeViewCompData('defaultYear', value);
              }}
            >
              <Option key={null} value={null}>
                미사용
              </Option>
              {yearRange.map(year => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </Col>
        </div>
      </Row>
      <Row>
        <div>
          <Col span={6}>최소 선택가능 년도</Col>
          <Col span={16} push={2}>
            <Select
              style={{ width: '100%' }}
              placeholder="최소 년도"
              defaultValue={minYear || null}
              onChange={value => {
                debouncedHandleChangeViewCompData('minYear', value);
              }}
            >
              {yearRange.map(year => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </Col>
        </div>
      </Row>
      <Row>
        <div>
          <Col span={6}>최대 선택가능 연도 </Col>
          <Col span={16} push={2}>
            <Select
              style={{ width: '100%' }}
              placeholder="최대 년도"
              defaultValue={maxYear || null}
              onChange={value => {
                debouncedHandleChangeViewCompData('maxYear', value);
              }}
            >
              {maxYearRange(5).map(year => {
                year = String(year);
                return (
                  <Option key={year} value={year}>
                    {year}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </div>
      </Row>
    </div>
  );
}
const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="SelectYearCompConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={SelectYearCompConfig}
  ></BizMicroDevBase>
);

SelectYearCompConfig.propTypes = {
  configInfo: PropTypes.objectOf(PropTypes.object),
};

SelectYearCompConfig.defaultProps = {
  configInfo: {
    info: {},
    option: {},
    property: {
      COMP_NAME: '',
      COMP_SETTING_SRC: '',
      COMP_SRC: '',
      compKey: '',
      layerIdx: {},
      maxYear: '',
      minYear: '',
      defaultYear: String(new Date().getFullYear()),
    },
  },
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
