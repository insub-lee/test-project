import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

const customSet = [
  { valueType: 'props', valueKey: 'docNumber' },
  { valueType: 'default', defaultValue: '1.0' },
];

class ReadOnlyTextCompConfig extends Component {
  componentDidMount() {}

  onChangeRadio = value => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property.selectedValue = value;
    if (value === 1) {
      configInfo.property.valueType = customSet[0].valueType;
      configInfo.property.valueKey = customSet[0].valueKey;
    }
    if (value === 2) {
      configInfo.property.valueType = customSet[1].valueType;
      configInfo.property.defaultValue = customSet[1].valueKey;
    }
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;
    const selectedValue = (configInfo && configInfo.property && configInfo.property.selectedValue) || undefined;
    return (
      <div>
        <Row>
          <Col span={6}>커스텀 선택</Col>
          <Col span={18}>
            <Radio.Group onChange={e => this.onChangeRadio(e.target.value)} value={selectedValue}>
              <Radio value={1}>DocNumber</Radio>
              <Radio value={2}>Rev</Radio>
            </Radio.Group>
          </Col>
        </Row>
      </div>
    );
  }
}

const SetReadOnlyTextCompConfig = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
    component={ReadOnlyTextCompConfig}
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
  />
);

export default SetReadOnlyTextCompConfig;
