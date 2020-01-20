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
    const { changeCompData, groupIndex, rowIndex, colIndex } = this.props;
    if (value === 1) {
      changeCompData(groupIndex, rowIndex, colIndex, 'valueType', customSet[0].valueType);
      changeCompData(groupIndex, rowIndex, colIndex, 'valueKey', customSet[0].valueKey);
    }

    if (value === 2) {
      changeCompData(groupIndex, rowIndex, colIndex, 'valueType', customSet[1].valueType);
      changeCompData(groupIndex, rowIndex, colIndex, 'defaultValue', customSet[1].valueKey);
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={6}>커스텀 선택</Col>
          <Col span={18}>
            <Radio.Group onChange={e => this.onChangeRadio(e.target.value)}>
              <Radio value={1}>DocNumber</Radio>
              <Radio value={2}>Rev</Radio>
            </Radio.Group>
          </Col>
        </Row>
      </div>
    );
  }
}

const SetReadOnlyTextCompConfig = ({ changeCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
    component={ReadOnlyTextCompConfig}
    changeCompData={changeCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
  />
);

export default SetReadOnlyTextCompConfig;
