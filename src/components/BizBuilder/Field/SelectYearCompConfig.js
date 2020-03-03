import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Input, Radio } from 'antd';
import _ from 'lodash';

import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;
const { debounce } = _;

function SelectYearCompConfig(props) {
  const [rootMapValue, setRootMapValue, selectValue, setSelectValue, selectDefaultValue, setSelectDefaultValue, apiArray, setApiArray] = useState(undefined);

  const [placeHolderValue, setPlaceHolderValue, apiKey, setApiKey] = useState('');

  const [defaultFlag, setDefaultFlag] = useState(2);

  const [yearRange, setYearRange] = useState([]);

  useEffect(() => {
    const { getCallDataHandler, sagaKey: id, apiArray } = props;
    getCallDataHandler(id, apiArray);

    const years = [];
    for (let i = 2000; i <= 2030 + 1; i++) {
      years.push(String(i));
    }
    setYearRange([...years]);
  }, []);

  const handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  const debouncedHandleChangeViewCompData = debounce(handleChangeViewCompData, 500);
  const {
    result: { rootMap, categoryMapInfo },
    groupIndex,
    rowIndex,
    colIndex,
    configInfo,
  } = props;

  return (
    <div>
      <Row>
        <div>
          <Col span={6}>최소 년도 선택</Col>
          <Col span={18}>
            <Select
              key={1}
              style={{ width: '100%' }}
              placeholder="최소"
              onChange={value => {
                debouncedHandleChangeViewCompData('mapId', value);
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
              key={1}
              style={{ width: '100%' }}
              placeholder="최대"
              onChange={value => {
                debouncedHandleChangeViewCompData('mapId', value);
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
SelectYearCompConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
