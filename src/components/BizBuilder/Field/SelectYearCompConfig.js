import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';

import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;

function SelectYearCompConfig(props) {
  const [rootMapValue, setRootMapValue, selectValue, setSelectValue, selectDefaultValue, setSelectDefaultValue, apiArray, setApiArray] = useState(undefined);
  const [placeHolderValue, setPlaceHolderValue, apiKey, setApiKey] = useState('');
  const [defaultFlag, setDefaultFlag] = useState(2);
  const [yearRange, setYearRange] = useState([]);
  const [reversedYearRange, setReversedYearRange] = useState([]);

  useEffect(() => {
    const { getCallDataHandler, sagaKey: id, apiArray } = props;
    getCallDataHandler(id, apiArray);

    const years = [];
    for (let i = 1990; i < 2031; i++) {
      years.push(String(i));
    }
    setYearRange([...years]);
    setReversedYearRange([..._.reverse(years)]);
  }, []);

  const handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

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
          <Col span={6}>defaultYear 설정 (미사용 시 입력X)</Col>
          <Col span={18}>
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
          <Col span={6}>최소 년도 선택</Col>
          <Col span={18}>
            <Select
              style={{ width: '100%' }}
              placeholder="최소"
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
          <Col span={6}>최대 년도 선택</Col>
          <Col span={18}>
            <Select
              style={{ width: '100%' }}
              placeholder="최대"
              defaultValue={maxYear || null}
              onChange={value => {
                debouncedHandleChangeViewCompData('maxYear', value);
              }}
            >
              {reversedYearRange.map(year => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
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
      maxYear: String(new Date().getFullYear()),
      minYear: String(new Date().getFullYear()),
      defaultYear: String(new Date().getFullYear()),
    },
  },
};
SelectYearCompConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
